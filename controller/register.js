const con = require("../config/db")
const bcrypt = require("bcrypt")
const vRegister = require("../validation/auth")
const registerPost = async (req,res) =>{
    const {error} = vRegister(req.body)
    if(error){
        res.send(error)
        return
    }
    const body = req.body;
    let salt =  await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(body.password, salt);
    console.log(hashedPassword);
    const values = [body.f_name , body.l_name, body.email,hashedPassword];
    const sql = "INSERT INTO tbl_user (f_name ,l_name , email, password) VALUES (?,?,?,?)"
    con.query(sql,values,(err,result)=>{
        if(err) throw err
        res.redirect("/login")
    })
    console.log(req.body)
}

module.exports = {registerPost}