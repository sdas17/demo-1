const express = require('express');
const cors = require('cors');
const app = express();

const todolist = [
    {
        "title": "Gym",
        "description": "Go to gym from 5-7 PM",
        "id": 1
    },
    {
        "title": "Study",
        "description": "Complete JavaScript tutorial",
        "id": 2
    },
    {
        "title": "Grocery Shopping",
        "description": "Buy fruits and vegetables",
        "id": 3
    },
    {
        "title": "Workout",
        "description": "30 minutes cardio",
        "id": 4
    }
];


// Enable CORS
app.use(cors());

// Endpoint to calculate simple interest
app.get("/search", (req, res) => {
    const principal = parseFloat(req.query.principal);
    const rate = parseFloat(req.query.rate);
    const time = parseFloat(req.query.time);

    if (!isNaN(principal) && !isNaN(rate) && !isNaN(time)) {
        const simpleInterest = (principal * rate * time) / 100;
        res.status(200).send({ msg: simpleInterest });
    } else {
        res.status(400).send({ error: "Invalid query parameters" });
    }
});

// Endpoint to get todo list
app.get('/search-todo', (req, res) => {
    res.json(todolist);
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
