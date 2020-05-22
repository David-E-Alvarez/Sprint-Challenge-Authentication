const jwt = require("jsonwebtoken");
/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if(token){
    const secret = process.env.JWT_SECRET || "very secret secret";
    jwt.verify(token, 'very secret secret', (err,decodedToken)=>{
      if(err){
        res.status(401).json({message: "invalid token"})
      }else{
        req.subject = decodedToken.subject;
        req.username = decodedToken.username;
        next();
      }
    })
  }else{
    res.status(401).json({ you: 'shall not pass!' });
  }
  
};
