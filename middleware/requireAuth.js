const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next) {
  try {
    // Reading the token from cookies
    const token = req.cookies.Authorization;

    if (!token) {
      return res.sendStatus(401); 
    }

    
    const decoded = jwt.verify(token, process.env.SECRET);

    
    if (Date.now() > decoded.exp) {
      return res.sendStatus(401); 
    }

    // Find user by ID from the decoded token
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.sendStatus(401); 
    }

    
    req.user = user;
    
    
    console.log("In a middleware");
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(401); 
  }
}

module.exports = requireAuth;
