const express = require('express');
const jwt=require('jsonwebtoken')
let jwtpassword = '123456'; 

const app=express();
app.use(express.json())
const Alluser=[
    {
        username:"subham12",
        password:"Subham@123",
        client:"subham"
    },
    {
        username:"karan123",
        password:"karaan@89",
        client:"karan"
    }
]
function verifyuser(username,password){
    let verifyuserIdentity=false;
    
    for (let index = 0; index < Alluser.length; index++) {
        if (username === Alluser[index].username && password === Alluser[index].password) {
            verifyuserIdentity=true
        }
        
    }
 return verifyuserIdentity
}

app.post("/signin",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    console.log(username,password);
    
    if (!verifyuser(username,password)) {
      return res.status(403).json({
        msg:"user does not exist in in memory db"
      })        
    }
    const token = jwt.sign({ username }, jwtpassword); 
    return res.json({
      token,
    })

})
app.get("/login",(req,res)=>{
    const token = req.headers.authorization;

    try {
       const decoded= jwt.verify(token,jwtpassword);
       const usename=decoded.usename;
       console.log(usename);
       
       res.json({
        users:Alluser.filter((value)=>{
            if (value.username ==usename) {
                return false
            }else{
                return true
            }
        })
       })
    } catch (error) {
        return res.status(403).json({
            msg:"user does not exist in in memory db"
          })        
    }

})
app.listen(3000,()=>{
console.log("server started")
})