const  express = require('express')
const app = express()
const port = 3000
const bookRouter = require("./router/book")
const AuthorRouter = require("./router/author")
const CategoryRouter = require("./router/category")

app.set( "view engine","ejs")
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))

app.use(bookRouter.router)
app.use(AuthorRouter.router)
app.use(CategoryRouter.router)


app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/register",(req,res)=>{
    res.render("register")
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