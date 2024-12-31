const con = require("../config/db")

const getCategory = (req,res)=>{
    const sql = "SELECT * FROM `tbl_category`"
    con.query(sql,(err,data)=>{
        if(err) throw err ; 
        res.render("tbl_category", {data:data})
    })
}
const addCategory = (req,res)=>{
    const sql = "INSERT INTO `tbl_category` SET name = ?"
    con.query(sql,req.body.categoryName,(err,data)=>{
        if(err) throw err; 
        res.redirect("/tbl_category")
    })
}
const deleteCategory= (req,res)=>{
    const sql = "DELETE FROM `tbl_category` WHERE category_id =?"
    con.query(sql,req.params.id,(err,data)=>{
        if(err) throw err ; 
        res.redirect("/tbl_category")
    })
}

const edit_category = (req,res)=>{
    const sql = "SELECT * FROM `tbl_category` WHERE category_id =?"
    con.query(sql,req.params.id,(err,data)=>{
        if(err) throw err ; 
        res.render("frmEditCategory", {data: data})
    })
}

const editCategory= (req,res)=>{
    const sql = "UPDATE `tbl_category` SET name =? WHERE category_id =?"
    const body = req.body
    const values = [body.categoryName,body.category_id]  ; 
    con.query(sql,values,(err,data)=>{
        if(err) throw err; 
        res.redirect("/tbl_category")
    })
}





module.exports ={getCategory,addCategory,deleteCategory,edit_category, editCategory

}