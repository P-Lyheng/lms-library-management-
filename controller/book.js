const con  = require("../config/db");

const addBook = (req, res) => {
  const sql =
    "INSERT INTO `tbl_book`(`name`, `author_id`, `category_id`) VALUES (?,?,?)";
  const body = req.body;
  const values = [body.bookName, 0, 0];
  con.query(sql, values, (err, data) => {
    if (err) throw err;
  });
  res.redirect("/tbl_book");
};

const getBook = (req, res) => {
  const sql =
    "SELECT `book_id`, `name`, `author_id`, `category_id` FROM `tbl_book`";
  con.query(sql, (err, data) => {
    if (err) throw err;
    res.render("tbl_book", { data: data });
  });
};

const deleteBook = (req, res) => {
  const sql = "DELETE FROM `tbl_book` WHERE book_id = ?";
  const body = req.body;
  con.query(sql, req.params.id, (err, data) => {
    if (err) throw err;
  });

  res.redirect("/tbl_book");
};
const edit_book = (req, res) => {
  const sql =
    "SELECT `book_id`, `name`, `author_id`, `category_id` FROM `tbl_book` where book_id = ?";
  con.query(sql, req.params.id, (err, data) => {
    res.render("frmEditBook", { data: data });
   
  });
};
const editBook = (req, res) => {
  console.log(req.body.bookName); 
  const body = req.body;
  const sql =
    "UPDATE `tbl_book` SET `name`=?, `author_id`=?, `category_id`=? WHERE book_id =?";
  const values =[body.bookName, 0, 0, req.body.book_id] ;
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
