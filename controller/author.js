const { render } = require("ejs");
const con = require("../config/db");
const fs = require("fs");
const authorName = require("../validation/author");

const getAuthor = (req, res) => {
  const sql = "SELECT * FROM `tbl_author`";
  con.query(sql, (err, data) => {
    if (err) throw err;
    res.render("tbl_author", { data: data });
  });
};
const createAuthor = (req, res) => {
  const { error, result } = authorName(req.body);
  if (error){
    res.send(error);
    return
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
  const sql = "INSERT INTO `tbl_author`( `name`, `image` ) values(?,?) ";
  const values = [req.body.authorName, fileImageName];
  con.query(sql, values, (err, data) => {
    if (err) throw err;
    res.redirect("/tbl_author");
  });
};
const edit_author = (req, res) => {
  const sql =
    "Select `author_id`, `name`,`image` from `tbl_author` where author_id = ?";
  con.query(sql, req.params.id, (err, data) => {
    if (err) throw err;
    res.render("frmEditAuthor", { data: data });
  });
};

const editAuthor = (req, res) => {
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
  
 const sql = "UPDATE `tbl_author` SET name =? ,image=? WHERE author_id =?";
  const values = [body.name,file, body.author_id];
  con.query(sql, values, (err, data) => {
    if (err) throw err;
    res.redirect("./tbl_author");
  });
};

const deleteAuthor = (req, res) => {
  console.log(req.params.id);
  const sqlSelect = "SELECT * FROM `tbl_author` WHERE author_id = ?";
  con.query(sqlSelect, req.params.id, (err, data) => {
    if (err) throw err;
    if (data[0].image != "default.png") {
      fs.unlinkSync("public/images/" + data[0].image);
    }
  });
  
  const sql = "DELETE FROM `tbl_author` WHERE author_id = ?";
  con.query(sql, req.params.id, (err, data) => {
    if (err) throw err;
    res.redirect("/tbl_author");
  });
};

module.exports = {
  getAuthor,
  createAuthor,
  deleteAuthor,
  edit_author,
  editAuthor,
};
