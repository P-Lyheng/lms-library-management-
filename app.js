const  express = require('express')
const fileUpload = require('express-fileupload');

const app = express()
const port = 3000
const bookRouter = require("./router/book")
const AuthorRouter = require("./router/author")
const CategoryRouter = require("./router/category")
const auth = require("./router/auth")
const cookieParser = require("cookie-parser");
const {checkUser,requireAuth}=require("./middleware/auth")

app.set( "view engine","ejs")

app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))
app.use(cookieParser());
app.use(fileUpload())

app.use(bookRouter.router)
app.use(AuthorRouter.router)
app.use(CategoryRouter.router)
app.use(auth.router)

app.get("*",checkUser)



app.get("/",requireAuth,(req,res)=>{
    res.render("index")
})

app.get("/forgot-passoword",(req,res)=>{
    res.render("forgot-passoword")
})
app.get("/blank",(req,res)=>{
    res.render("blank")
})
app.get("/frmCreateCategory",(req,res)=>{
    res.render('frmCreateCategory')
})
app.get("/frmCreateBook",(req,res)=>{
    res.render('frmCreateBook')
})
app.get("/frmCreateAuthor",(req,res)=>{
    res.render('frmCreateAuthor')
})
app.use((req,res)=>{
    res.render('404')
})
app.listen(port, () => console.log(`server's listening on port ${port}!`))

