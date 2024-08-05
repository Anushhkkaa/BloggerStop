const express = require('express');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const multer = require('multer');
const path = require("path");


const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName)
    }
  })
  
  const upload = multer({ storage: storage })

router.get('/add-new', (req, res) => {
    return res.render('addBlog',{
        user:req.user
    })
});


router.get('/:id', async(req, res) => {
    const blog = await Blog.findById(req.params.id).populate("author");
    // console.log(author.profilePictureURL);
    const comments = await Comment.find({blogId : req.params.id}).populate("author"); 
    console.log(comments);
    return res.render('blog',{
        user:req.user,
        blog,
        comments
    })
});

router.post('/', upload.single('coverImage'), async (req, res) => {
    // console.log(req.body);
    // console.log(req.file);

    const {
        title,
        date,
        body
    } = req.body;

    const blog = await Blog.create({
        title, 
        date, 
        body, 
        coverPictureUrl: `/uploads/${req.file?.filename}`,
        author: req.user._id
    })

    return res.redirect(`/blog/${blog._id}`);
});


router.post("/comment/:id", async (req,res)=>{
    const {
        content
    }= req.body;
    const blogId = req.params.id; 
    const author= req.user._id;
    const comment = await Comment.create({
        content,
        author,
        blogId
    })
    console.log(comment);
    return res.redirect(`/blog/${req.params.id}`);
})




module.exports = router;
