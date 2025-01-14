const con  = require("../config/db");
const fs =require("fs")
const vBook = require( "../validation/book")

const getBook = (req, res) => {
  const sql =
    "SELECT `book_id`, `name`, `author_id`, `category_id`,`image` FROM `tbl_book`";
  con.query(sql, (err, data) => {
    if (err) throw err;
    res.render("tbl_book", { data: data });
  });
};

const addBook = (req, res) => {
  console.log(req.body)
  const{error, result} = vBook(req.body)
  if (error) {
    res.send(error.message);
    return;
  }
  let fileImageName;
  if (req.files) {
    fileImageName = Date.now() + "_" + req.files.image.name;
    let fileImage = req.files.image;
    let imagePath = "public/images/" + fileImageName;
    fileImage.mv(imagePath, (err) => {
      if (err) throw err;
    });
  } else {
    fileImageName = "default.png";
  }
  const sql =
    "INSERT INTO `tbl_book`(`name`, `author_id`, `category_id`,`image`) VALUES (?,?,?,?)";
  const body = req.body;
  const values = [body.bookName, 0, 0,fileImageName];
  con.query(sql, values, (err, data) => {
    if (err) throw err;
  });
  res.redirect("/tbl_book");
};

const deleteBook = (req, res) => {
  console.log(req.params.id);
  const sqlSelect = "SELECT * FROM `tbl_book` WHERE book_id = ?";
  con.query(sqlSelect, req.params.id, (err, data) => {
    if (err) throw err;
    if (data[0].image != "default.png") {
      fs.unlinkSync("public/images/" + data[0].image);
    }
  });



  const sql = "DELETE FROM `tbl_book` WHERE book_id = ?";

  con.query(sql, req.params.id, (err, data) => {
    if (err) throw err;
  });

  res.redirect("/tbl_book");
};
const edit_book = (req, res) => {
  const sql =
    "SELECT `book_id`, `name`, `author_id`, `category_id` ,`image`FROM `tbl_book` where book_id = ?";
  con.query(sql, req.params.id, (err, data) => {
    res.render("frmEditBook", { data: data });
   
  });
};
const editBook = (req, res) => {
  const body = req.body;
  let file;
  if (!req.files) {
    file = req.body.old_img;
  } else {
    let fileImageName = Date.now() + "_" + req.files.image.name;
    let fileImage = req.files.image;
    let imagePath = "public/images/" + fileImageName;
    fileImage.mv(imagePath, (err) => {
      if (err) throw err;
      if (body.old_img != "default.png") {
        fs.unlinkSync("public/images/" + body.old_img);
    }
    });
    file= fileImageName;
  }
  console.log(file)
  console.log(req.body.bookName); 
  const sql =
    "UPDATE `tbl_book` SET `name`=?, `author_id`=?,category_id=?,`image`=?  WHERE book_id =?";
  const values =[body.bookName, 0,0, file,req.body.book_id] ;
  con.query(sql,values, (err, data) => {
    if (err) throw err;
  });
  res.redirect("/tbl_book");
};
module.exports = {
  addBook,
  getBook,
  deleteBook,
  edit_book,
  editBook,
};
