const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/userdumy", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

// Define the user model
const User = mongoose.model("userdumy", {
    username: String,
    email: String,
    password: String
});
app.get("/dumy",(req,res)=>{
})

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        
        if (existingUser) {
            return res.status(403).json({ message: "User already exists in the database" });
        }else{
            await User.create({ username: username, email: email, password: password });

        }

        
        res.status(201).send({ status: "ok", message: "User registered successfully" });
    } catch (error) {
        res.status(500).send({ status: "error", error: error.message });
    }
});

app.put("/",(req,res)=>{

})
app.delete("/",(req,res)=>{

})
app.listen(3000,()=>{
    console.log('server started')
})