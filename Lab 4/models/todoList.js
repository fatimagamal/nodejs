const mongoose = require("mongoose");
const Joi = require("joi");

const TodoListSchema = new mongoose.Schema({
    value: {
        type: String,
        min: 3,
        max: 50,
        required: true,
    }
});

const TodoList = mongoose.model("TodoList", TodoListSchema);

const validationSchema = Joi.object({
    value: Joi.string().min(3).max(50).required(),
});

const validateTodoList = (todoList) => {
    return validationSchema.validate(todoList)
}


module.exports = { TodoList , validateTodoList };