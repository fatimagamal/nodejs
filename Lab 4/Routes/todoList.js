const express = require("express");
const {TodoList, validateTodoList} = require("../models/todoList");
// const { auth } = require("../middleware")
const { catchAsyncErrors } = require("../middleware")


const router = express.Router();

router.get("/",  catchAsyncErrors (async (req, res) => {
    const todos = await TodoList.find();
    res.json(todos);
}));

router.get("/:id", catchAsyncErrors(async (req, res) => {
    const { id } = req.params;
    const todo = await TodoList.findById(id);
    if (!todo) return res.status(404).json({ message: "List not found" })
    res.json(todo);
}));

router.delete("/:id", catchAsyncErrors (async (req, res) => {
    const { id } = req.params;
    const todo = await TodoList.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ message: "List not exist to delete" })
    res.json(todo);
}));

router.put("/:id", async (req, res) => {
    const { error } = validateTodoList(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })
    const { id } = req.params;
    const { value } = req.body;
    const todo = await TodoList.findById(id)
    if (!todo) return res.status(404).json({ message: "List not found" })
    todo.value = value;
    await todo.save();
    res.json(todo);
});


router.post("/", async (req, res) => {
    const { error } = validateTodoList(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })
    const newTodo = new TodoList(req.body);
    await newTodo.save();
    res.json(newTodo);
});

module.exports = router