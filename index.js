const express = require('express');
const {connectMongoDb}=require('./connect');
const path=require("path");

const userRoute=require("./routes/user");
const blogRoute=require("./routes/blog");
const cookieParser = require('cookie-parser');
const { checkForAuthCookie } = require('./middlewares/authentication');

const Blog = require("./models/blog");

const app=express();
const PORT=8000;




app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(express.static(path.resolve('./public')));



connectMongoDb('mongodb://127.0.0.1:27017/blog-app')

app.get('/', async (req,res)=>{
    const allBlogs = await Blog.find({});
    res.render('homepage',{
        user:req.user,
        blogs: allBlogs
    });
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.listen(PORT, ()=>{
    console.log(`Server Started at PORT:${PORT}`);
})