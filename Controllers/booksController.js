
const Book=require('../models/books.js');




const addBook = async (req,res)=>{
  
    try {
        const {id, title, author, published_year, genre, available_copies }=req.body;

        const book=await Book.create({
            id, 
            title, 
            author, 
            published_year, 
            genre, 
            available_copies

        });

        res.json({book})
        
    } catch (error) {

        console.log(error)
        res.sendStatus(400)
        
    }


};

const listBooks = async(req,res)=>{

    try{
        const books=await Book.find();

        res.json({books: books});
    }
    catch{
        console.log(error)
        res.sendStatus(400)
    }


};

const getABook = async(req,res) => {

    const bookId= req.params.id;
    const book =await Book.findById(bookId)

    res.json({books:book})
};

const updateBook = async(req,res) => {

    const bookId= req.params.id;
    const {id, title, author, published_year, genre, available_copies }=req.body;

    const book=await Book.findByIdAndUpdate(bookId,{
        id, 
        title, 
        author, 
        published_year, 
        genre, 
        available_copies
    });


    res.json({books:book})
};

const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const result = await Book.deleteOne({ id: bookId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Record not found" });
        }
        res.json({ success: "Record Deleted" });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while deleting the record" });
    }
};

module.exports ={
    addBook,
    listBooks,
    getABook,
    updateBook,
    deleteBook

}