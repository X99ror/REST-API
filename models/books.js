const mongoose =require("mongoose")

const bookSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true,
        index:true
    }, 
    title:String, 
    author:String, 
    published_year:Date, 
    genre:String, 
    available_copies:{
        type:Number,
        required:true,
    }


})

const Book = mongoose.model("Book", bookSchema);

module.exports=Book;