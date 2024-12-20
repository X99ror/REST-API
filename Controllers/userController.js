const User = require('../models/user.js')
const bcrypt =  require("bcryptjs")
const jwt = require("jsonwebtoken")

const addUser = async (req,res)=>{
  
    try {
        const {id , name, email, password, membership_type, registered_date }=req.body;

     const hashedPassword = bcrypt.hashSync(password,8);
    
        const user=await User.create({
            id,
            name,
            email,
            password:hashedPassword,
            membership_type,
            registered_date

        });

        res.json({user:user})
        
    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }


}

async function login(req, res) {
  try {
     
    const { email, password }= req.body;

  
  const user = await User.findOne({ email });
  if (!user) return res.sendStatus(401);

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) return res.sendStatus(401);

  
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
  const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

  res.cookie("Authorization", token, {
    expires: new Date(exp),
    httpOnly:true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === "production"
  })
  res.sendStatus(200);
} catch (err) {
  console.log(err);
  res.sendStatus(400);
}
}




function logout(req, res) {
  try {
    
    res.clearCookie("Authorization", {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === "production" // Set this as per your environment
    });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}



function checkAuth(req, res) {
  try {
    res.sendStatus(200); 
  } catch (err) {
    console.log(err);
    return res.sendStatus(400); 
  }
}


module.exports={
    addUser,
    login,
    logout,
    checkAuth
}