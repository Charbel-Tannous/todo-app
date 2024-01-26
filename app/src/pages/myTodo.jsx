import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodoList from "../components/TodoList";

export default function myTodo() {
  const [todos, setTodos] = useState([]);
  const [noTodos, setNoTodos] = useState(true);

  const getTodos = async () => {
    const res = await fetch("http://localhost:3000/api/todos", {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      if(data.data.length != 0){
        setTodos(data.data);
        setNoTodos(false);
      }else{
        setNoTodos(true);
      }
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <section>
        <h1>My Todos</h1>
        {noTodos ? (
          <div>
            <h2>No Todos Available</h2>
            <Link to={"/newtodo"}>
              <button>Create Todo</button>
            </Link>
          </div>
        ): <TodoList todos={todos}/>}
      </section>
    </>
  );
}
