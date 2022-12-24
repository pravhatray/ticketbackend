const express = require("express");
const User=require("../Models/User.model")
const app = express.Router();

const Authmiddleware = async (req, res, next) => {
  let token = req.headers.token;
  if (token) {
    let [id, email, password] = token.split(":");
    let user = await User.findById(id);

    if (user.email === email && user.password === password) {
      next();
    } 
    else {
      res.status(401).send("User is not authenticated check Credintials");
    }

  } else {
    res.status(401).send("User is not authenticated check Credintials");
  }
};

app.get('/',async(req,res)=>{
    const user=await User.find()
    return res.send(user);
})
app.post('/signup',async(req,res)=>{
    let {email}=req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(404).send('Cannot create account with an existing email addrress');
        }
        let newUser=await User.create(req.body);
        res.send({token: `${newUser.id}:${newUser.email}:${newUser.password}`})

    }catch(e){
        res.status(500).send(e.message);
    }
})
app.post('/login',async(req,res)=>{
    let { email, password } = req.body;
    try {
      let user = await User.findOne({ email, password });
      if (!user) {
        return res.status(401).send('Authentication failed');
      } 
      res.send({
        token: `${user.id}:${user.email}:${user.password}`,
      });
    } catch (e) {
      res.status(500).send(e.message);
    }
})
module.exports = app;