const mongoose = require("mongoose");

const TodoListSchema = new mongoose.Schema({
    value: String
});

const TodoList = mongoose.model("TodoList", TodoListSchema);

module.exports = TodoList