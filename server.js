
if (process.env.NODE_ENV != 'production'){
    require("dotenv").config();

}



const express=require('express')
const cors=require('cors')
const cookieParser = require("cookie-parser")
const dbconnect=require('./config/dbconnect');
const requireAuth = require('./middleware/requireAuth.js')
const booksController = require('./Controllers/booksController.js')
const userController=require('./Controllers/userController.js');
const app =express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:true,
    credentials:true
}));
dbconnect();

app.get("/",(req,res)=>{
    res.json({hello:"world"})
});



app.get("/books", booksController.listBooks)
app.post("/books",booksController.addBook);

app.get("/books/:id",booksController.getABook)

app.post("/auth/register",userController.addUser);
app.post("/auth/login",userController.login);
app.get("/auth/logout",userController.logout);
app.get("/check-Auth", requireAuth, userController.checkAuth);



app.put("/books/:id",booksController.updateBook)


app.delete("/books/:id", booksController.deleteBook );

app.listen(process.env.PORT);