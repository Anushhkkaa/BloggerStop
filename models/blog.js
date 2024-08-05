const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    body: {
        type: String,
    },
    coverPictureUrl: {
        type: String,
    },
    author:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    }
    
}, {
    timestamps: true
})


const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;