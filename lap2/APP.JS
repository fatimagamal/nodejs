const express = require("express");

const app = express();

// Middleware
app.use(express.json());


// Database
const users = [
    {
        id: 0,
        name: "Ahmed",
        age: 22
    },
    {
        id: 1,
        name: "Ali",
        age: 24
    }
]

app.get("/users", (req, res) => {
    res.json(users)
})

app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id)
    res.json(user)
})

app.post("/users", (req, res) => {
    // auto generate new id
    const id = users[users.length - 1].id + 1
    const { age, name } = req.body;
    users.push({ id, name, age })
    res.json(users)
})

app.delete("/users/:id", (req, res) => {
    //delete
})

app.put("/users/:id", (req, res) => {
    // updates in req body
    //delete
})

app.listen(3000);