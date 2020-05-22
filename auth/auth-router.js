const router = require('express').Router();
const bcrypt = require('bcryptjs');//hashes password
//JSON web token
const jwt = require("jsonwebtoken");
const db = require('../database/dbConfig.js');//database with "users" table i will "post" to
const {isValid} = require('./isValid.js');

router.get('/helloWorld', (req,res) => {
  console.log('GET / log')
  res.json("hello world");
})

router.post('/register', (req, res) => {
  // implement registration
  const user = req.body;
  if(isValid(user)){
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;
    db('users').insert(user)
    .then(user => {
      console.log("----->", user)
      res.status(201).send(user)
    })
    .catch(error => {
      res.status(500).json(error)
    })
  }else{
    res.status(400).json({ message: "couldnt register user; add username and password" });
  }
  
  
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body;
  console.log("username: ", username)
  if(isValid(req.body)){
    db('users').where({username})
      .then(([user])=>{
        // console.log("user: ",user)
        if(user && bcrypt.compareSync(password, user.password)){
          const token = generateToken(user);
          res.status(200).json({ username: user.username, token });
        }else{
          res.status(401).json({errorMessage: "Invalid Credentials"});
        }
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: "there was an error",error:err.message });
      });
  }else{
    res.status(400).json({ errorMessage: "Please provide username, password" });
  }
});



function generateToken(user) {
  const payload = {
    user: user.username,
  };
  const options = {
    expiresIn: "1h",
  };
  const secret = 'very secret secret';
  return jwt.sign(payload, secret,options);
}

module.exports = router;
// function findBy(filter){
//   return db('users')
//       .where(filter)
// }