const con = require("../config/db")
const bcrypt = require("bcrypt")
const {vSignup,vSignin} = require("../validation/auth")

const  jwt = require('jsonwebtoken')


const signupGet = (req,res)=>{
    res.render("register")
}
const generateToken = (id)=>{
    return jwt.sign({id},'p-lyheng secret',{expiresIn: 3*24*60*60});
}


const signupPost = async (req,res) =>{
    const {error} = Vsignup(req.body)
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

const signinGet = (req,res)=>{
    res.render("login")
}
const signinPost = (req,res)=>{
    let body= req.body;
    const {error} = vSignin(req.body)
    if(error){
        res.send(error)
        return
    }
    const sql = "SELECT * FROM `tbl_user` WHERE email =?"
    con.query(sql,body.email,async (err,data)=>{
        if(err) throw err
        if(data.length>0){
            console.log(body.password, " : ",data[0].password)
            console.log(data[0])
            const comparePassword = await bcrypt.compare(body.password, data[0].password);
            console.log(comparePassword)
            if(comparePassword){
                const token = generateToken(data[0].id)
                res.cookie('jwt',token, { maxAge : 3*24*60*60*1000,httpOnly : true});
                console.log(token)
                res.redirect("./")
            }else{
                res.send('Password incorrect')
            }
        }else{
            res.send('User not found')
        }
    })
    
}
const signout = (req,res)=>{
    res.cookie('jwt',"", { maxAge : 1});
    res.redirect('/signin')  

    // res.clearCookie('jwt')
}


module.exports = {signupGet,signupPost,signinGet,signinPost, signout}