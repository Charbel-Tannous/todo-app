const db = require("../db/db");

const getAllTodos = async (req,res) => {
    try{
        await db.connect();
        const request = db.request();
        const data = await request.query('SELECT * FROM Todos');
        if(data.recordset.length == 0){
            return res.json({'message':'no todos', 'success':true , 'data': []});
        }
        return res.json({'success':true, 'data': data.recordset, 'message': 'todos retrieved'});
    }catch(e){ 
        console.log(e);
    }finally{
        db.close();
    }
}
const getTodo = async (req,res) => {
    const todoId = req.query.todoId;
    if(!todoId){
        return res.json({'message':'missing parameter!', 'success':false, 'data': null });
    }
    try{
        await db.connect();
        const request = db.request();
        const data = await request.query(`SELECT * FROM Todos WHERE todo_id=${todoId}`)
        if(data.recordset.length == 0){
            return res.status(404).json({'message':'no todo for the related id', 'success':true , 'data': null});
        }
        return res.json({'success':true, 'data': data.recordset[0], 'message': 'todo retrieved'});
    }catch(e){ 
        console.log(e);
    }finally{
        db.close();
    }
}
const createTodo = async (req,res)=>{
    console.log(req.body);
    const todo_title = req.body.todo_title;
    const todo_desc = req.body.todo_desc;
    if(!todo_desc || !todo_title){
        return res.json({'message': 'missing parameter' , 'success': false, 'data': null});
    }
    try{    
        await db.connect();
        await db.request().query(`INSERT INTO Todos VALUES ('${todo_title}', '${todo_desc}')`);
        res.json({'message': 'todo created successfully', 'success':true, 'data': null});
    }catch(e){
        console.log(e);
    }finally{
        db.close();
    }
}
const deleteTodo = async (req,res) => {
    const todoId = req.query.todoId;
    if(!todoId){
        return res.json({'success':false, 'message': 'missing parameter', 'data': null});
    }
    try{
        await db.connect();
        await db.request().query(`DELETE FROM Todos WHERE todo_id = ${todoId}`);
        return res.json({'success':true, 'message': 'Todo deleted successfully', 'data': null});
    }catch(e){
        console.log(e);
    }finally{
        db.close();
    }
}
module.exports = {
    getTodo,
    createTodo,
    deleteTodo,
    getAllTodos
}