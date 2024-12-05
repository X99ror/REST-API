const mongoose=require('mongoose')

async function dbconnect(){
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('connected');
    } 
    catch(err){
        console.log(err);
    }
}


module.exports=dbconnect;