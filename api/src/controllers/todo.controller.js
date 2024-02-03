const { getConnection } = require("../db/db");

const getAllTodos = async (req, res) => {
  try {
    const db = await getConnection();
    const request = db.request();
    const data = await request.query("SELECT * FROM Todos");
    if (data.recordset.length == 0) {
      return res.json({ message: "no todos", success: true, data: [] });
    }
    return res.json({
      success: true,
      message: "todos retrieved",
      data: data.recordset,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: "An error occurred",
      data: null,
    });
  }
};
const getTodo = async (req, res) => {
  const todoId = req.query.todoId;
  if (!todoId) {
    return res.json({
      success: false,
      message: "missing parameter!",
      data: null,
    });
  }
  try {
    const db = await getConnection();
    const request = db.request();
    const data = await request.query(
      `SELECT * FROM Todos WHERE todo_id=${todoId}`
    );
    if (data.recordset.length == 0) {
      return res.status(404).json({
        success: true,
        message: "no todo for the related id",
        data: null,
      });
    }
    return res.json({
      success: true,
      message: "todo retrieved",
      data: data.recordset[0],
    });
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: "An error occurred",
      data: null,
    });
  }
};
const createTodo = async (req, res) => {
  console.log(req.body);
  const todo_title = req.body.todo_title;
  const todo_desc = req.body.todo_desc;
  if (!todo_desc || !todo_title) {
    return res.json({
      success: false,
      message: "missing parameter",
      data: null,
    });
  }
  try {
    const db = await getConnection();
    await db
      .request()
      .query(`INSERT INTO Todos VALUES ('${todo_title}', '${todo_desc}')`);
    res.json({
      success: true,
      message: "todo created successfully",
      data: null,
    });
  } catch (e) {
    console.log(e);
  }
};
const deleteTodo = async (req, res) => {
  const todoId = req.query.todoId;
  if (!todoId) {
    return res.json({
      success: false,
      message: "missing parameter",
      data: null,
    });
  }
  try {
    const db = await getConnection();
    await db.request().query(`DELETE FROM Todos WHERE todo_id = ${todoId}`);
    return res.json({
      success: true,
      message: "Todo deleted successfully",
      data: null,
    });
  } catch (e) {
    console.log(e);
  }
};
const updateTodo = async (req, res) => {
  const { todo_id, todo_title, todo_desc } = req.body;
  if (!todo_id || !todo_title || !todo_desc) {
    return res.json({
      success: false,
      message: "missing parameter",
      data: null,
    });
  }
  try {
    const db = await getConnection();
    const request = db.request();
    await request
      .input("id", todo_id)
      .input("title", todo_title)
      .input("desc", todo_desc)
      .query(
        `UPDATE Todos SET todo_title = @title, todo_desc = @desc WHERE todo_id=@id`
      );
    return res.json({
      success: true,
      message: "Todo updated successfully",
      data: null,
    });
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: "An error occurred",
      data: null,
    });
  }
};
module.exports = {
  getTodo,
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
};
