const router = require('express').Router();
const bcrypt = require('bcryptjs');//hashes password
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
    db('users')
      .then(user=>{
        console.log("user: ",user.length)
        res.status(201).json(user)
      })
      .catch((err) => {
        res.status(500).json({ errorMessage: "there was an error",error:err.message });
      });
  }else{
    res.status(400).json({ errorMessage: "Please provide username, password" });
  }
});

module.exports = router;
// function findBy(filter){
//   return db('users')
//       .where(filter)
// }