const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required : true
    },
    author:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref:"User"
    },
    blogId:{
        type: mongoose.Types.ObjectId,
        ref:"Blog"
    }
    
}, {
    timestamps: true
})


const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;