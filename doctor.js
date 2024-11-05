const express = require('express');
let vishakpattnamKidney =[
    {
        patientName:"johan",
        kidneyDonar:[
            {
                kidneyHealth:false
            }
        ]
    }
]
const app=express();


/* get application w */
app.get("/",(req,res)=>{
    const kidneydonar = vishakpattnamKidney[0].kidneyDonar;
    const kidneyHealthlength = kidneydonar.length;

   let kidneyHealth=0;
for (let index = 0; index < kidneyHealthlength; index++) {
    if (kidneydonar[index].kidneyHealth) {
        kidneyHealth=kidneyHealth+1;
    }
}    
const kidneyUnhealth=kidneyHealthlength-kidneyHealth;
console.log(kidneyUnhealth);

res.send({"kidneyhealth":kidneyHealth,"kidneyunhealth":kidneyUnhealth,"totalKidney":kidneyHealthlength})
})
app.use(express.json());

app.post("/",(req,res)=>{
    const {kidneyHealth}=req.body;
    vishakpattnamKidney[0].kidneyDonar.push({kidneyHealth:kidneyHealth});
    res.send({"status":"submitted sucess"})
})

/* put  condition is if unhelathy is change true  */
app.put("/",(req,res)=>{
 for(let i =0;i<vishakpattnamKidney[0].kidneyDonar.length;i++){
    vishakpattnamKidney[0].kidneyDonar[i].kidneyHealth=true;
 }
 res.send({})
})
app.delete("/", (req, res) => {
    const newKidneys = [];
    
    for (let index = 0; index < vishakpattnamKidney[0].kidneyDonar.length; index++) {
        if (vishakpattnamKidney[0].kidneyDonar[index].kidneyHealth) {
            newKidneys.push({ kidneyHealth: true });
        }
    }

    vishakpattnamKidney[0].kidneyDonar = newKidneys;
    res.send({ msg: "ok" });
});


app.listen(3000,()=>{
    console.log("welcome")
})