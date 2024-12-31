const { render } = require('ejs')
const con  = require('../config/db')

const getAuthor = (req,res)=>{
    const sql = "SELECT * FROM `tbl_author`"
    con.query(sql,(err,data)=>{
        if(err) throw err ; 
        res.render("tbl_author", {data:data})
    })
}
const createAuthor = (req,res)=>{
    const sql = "INSERT INTO `tbl_author` SET name = ?"
    con.query(sql,req.body.authorName,(err,data)=>{
        if(err) throw err; 
        res.redirect("/tbl_author")
    })
}
const edit_author=(req,res)=>{
    const sql = "Select `author_id`, `name` from `tbl_author` where author_id = ?"
    con.query(sql,req.params.id,(err,data)=>{
        if(err) throw err; 
        res.render("frmEditAuthor", {data:data})
    })
}

const editAuthor = (req,res)=>{
    console.log(req.body.name)
    const sql = "UPDATE `tbl_author` SET name =? WHERE author_id =?"  ;
    const body = req.body 
    const values = [body.name,body.author_id]
    con.query( sql,values,(err,data)=>{
        if(err) throw err ; 
        res.redirect("./tbl_author")
    })
}

const deleteAuthor= (req,res)=>{
    console.log(req.params.id)
    const sql = "DELETE FROM `tbl_author` WHERE author_id = ?" 
    con.query(sql,req.params.id,(err,data)=>{
        if(err) throw err; 
        res.redirect("/tbl_author")
    })
}

module.exports = {getAuthor , createAuthor, deleteAuthor , edit_author , editAuthor }