const express = require('express');
const zod = require('zod');
const app = express();
app.use(express.json())

const schema= zod.array(zod.number());

/*  ******
** { 
email:string=>email
password:atleast 8 letters
country:'in','us
}
*
*
**
*
*
*/
const schemaa =zod.object({
    email:zod.string().email({ message: "Invalid email format" }),
    password:zod.string().min(8, { message: "Password must be at least 8 characters long" }),
    country:zod.literal('IN').or(zod.literal('us')),
    kidneys:zod.array(zod.number())
})
// Route to validate user data
app.post('/validateUser', (req, res) => {
    // Use schema to validate request body

    const result = schemaa.safeParse(req.body);
    console.log(result)
    if (!result.success) {
        // If validation fails, send a 400 response with error details
        return res.status(400).json({
            msg: "Invalid user data",
            errors: result.error.errors // Provides detailed error information
        });
    }
    
    // If validation is successful, send a 200 response with validated data
    res.status(200).json({
        msg: "User data is valid",
        data: result.data // The parsed and validated data
    });
});
let numberRequest =0;
function calculatRequest(req,res,next){
    numberRequest++;
    console.log(numberRequest);
    next();
}
function kidneyhealth(req,res,next){
 const kidneyId = parseInt(req.query.kidneyId);
 if (kidneyId !== 1 && kidneyId !== 2) {
    return res.status(403).send({
        msg: "invalid kidneyId"
    });
}else{
    next();
}
}
function userMiddleware(req,res,next){
    const username = req.headers.username;
    const password = req.headers.password;
      if (username !== 'subham' || password !== 'Subham') {
        return res.status(403).send({
            msg: "invalid username and password"
        });
    }else{
        next();
    }
}
app.use((req,res,next,err)=>{
    res.status(500).send('an error is couucr')
})
app.get("/kidneychekup", userMiddleware,kidneyhealth, (req, res) => {

    res.send({ msg: "your kidney is fine" }); 
});
app.get("/kidneyhealth",kidneyhealth,calculatRequest,(req,res)=>{
    console.log('kidney health')
})
app.get("/healtg0cgeckuo",(req,res)=>{
    const kudneys=req.body.kidneys;
   const response= schema.safeParse(kudneys)
   if (!response.success) {
    res.status(411).json({
        msg:"invalid is  invalid"
    })
   }else{
    res.status(200).send({msg:response})

   }
    
})

app.listen(3000, () => {
    console.log('server started on port 3000');
});
