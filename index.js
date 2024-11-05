// const express = require('express');

// function counter(a,b){
//     return a+b
// }
// let app=express();
// app.get ("/",(req,res)=>{
//     const a=req.query.a;
//     const b=req.query.b;
//     const sum=counter(a,b);
//     res.send(sum)

// })
// app.listen(3000,()=>{
//     console.log("server started")
// })

const express = require('express');
const fs = require("fs");
const server = express();

server.get("/getdata/:filename", (req, res) => {
    const readfile = req.params.filename;  // Corrected parameter name to 'filename'

    fs.readFile(readfile, "utf-8", (err, data) => {
        if (err) {
            // Send an error response if there's an issue reading the file
            return res.status(500).json({ error: "File not found or unable to read file" });
        }
        res.json({ data: data });
    });
});

server.listen(4000, ()=>{
console.log("server started")
})
