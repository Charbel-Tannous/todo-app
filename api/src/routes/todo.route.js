const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.route('/todo')
    .get(todoController.getTodo)
    .post(todoController.createTodo)
    .delete(todoController.deleteTodo);

router.route('/todos')
    .get(todoController.getAllTodos);

module.exports = router;