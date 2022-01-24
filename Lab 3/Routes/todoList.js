const express = require("express");
const TodoList = require("../models/todoList");
const { auth } = require("../middleware")

const router = express.Router();

router.get("/", async (req, res) => {
    const todos = await TodoList.find();
    res.json(todos);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await TodoList.findById(id)
    res.json(todo);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await TodoList.findByIdAndDelete(id)
    res.json(todo);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    const todo = await TodoList.findById(id)
    todo.value = value;
    await todo.save();
    res.json(todo);
});


router.post("/", async (req, res) => {
    const { value } = req.body;
    const newTodo = new TodoList({ value });
    await newTodo.save();
    res.json(newTodo);
});

module.exports = router