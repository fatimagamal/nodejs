require("express-async-errors");
const mongoose = require("mongoose");
const express = require("express");
const todoListRouter = require("./Routes/todoList");
const userRouter = require("./Routes/user");
const { logger } = require("./middleware");

const app = express();

//Middleware
app.use(express.json()); // parse text from http request body => assign on req.body
app.use(logger);
// app.use(auth);
app.use("/todoList", todoListRouter);
app.use("/users", userRouter);

app.use((err, req, res, next) => {

    // server logs
    res.status(500).json({ message: err.message })
})

mongoose
    .connect("mongodb://localhost:27017/mydblab4")
    .then(() => {
        app.listen(3000, () => {
            console.log("server running on port 3000");
        });
        console.log("successfully connected with the database")
    })
    .catch(() => {
        console.log("error connecting to mongodb");
    });
