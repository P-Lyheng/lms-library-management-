const con = require("../config/db")
const fs = require("fs")
const vCategory = require("../validation/category")

const getCategory = (req,res)=>{
    const sql = "SELECT * FROM `tbl_category`"
    con.query(sql,(err,data)=>{
        if(err) throw err ; 
        res.render("tbl_category", {data:data})
    })
}
const addCategory = (req,res)=>{
  const {error, result} = vCategory(req.body)
  if(error){
    res.send(error)
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
    const sql = "INSERT INTO `tbl_category`(name ,image) values(?,?)"
    const body = req.body
    const value= [body.categoryName, fileImageName]
    con.query(sql,value,(err,data)=>{
        if(err) throw err; 
        res.redirect("/tbl_category")
    })
}
const deleteCategory= (req,res)=>{
    console.log(req.params.id);
    const sqlSelect = "SELECT * FROM `tbl_category` WHERE category_id = ?";
    con.query(sqlSelect, req.params.id, (err, data) => {
      if (err) throw err;
      
      if (data[0].image != "default.png") {
        fs.unlinkSync("public/images/" + data[0].image);
      }
    });

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


    const sql = "UPDATE `tbl_category` SET name =?,image=? WHERE category_id =?"
    const values = [body.categoryName,file,body.category_id]  ; 
    con.query(sql,values,(err,data)=>{
        if(err) throw err; 
        res.redirect("/tbl_category")
    })
}





module.exports ={getCategory,addCategory,deleteCategory,edit_category, editCategory

}