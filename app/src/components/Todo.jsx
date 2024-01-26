import "./Todo.css";
import Modal from "./Modal";
import { useState } from "react";

export default function Todo(props) {
  const [open, setOpen] = useState(false);
  const openModal = () =>{
    setOpen(true);
  }
  const closeModal = () =>{
    setOpen(false);
  }

  const deleteTodo = async () => {
    const response = await fetch(`http://localhost:3000/api/todo?todoId=${props.todo.todo_id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();
    console.log(data);
    if(data.success){
      alert('deleted successfully.');
    }else{
      alert(data.message);
    }
  }

  const confirmDelete = () => {
    deleteTodo();
    closeModal();
  }

  return (
    <>
      <article>
        <header>{props.todo.todo_title}</header>
        <p>{props.todo.todo_desc}</p>
        <div className="options">
          <button className="outline" onClick={openModal} data-tooltip="Delete Todo" data-placement="bottom">Delete</button>
        </div>
      </article>

      {open && <Modal cancel={closeModal} confirm={confirmDelete} />}
    </>
  );
}
