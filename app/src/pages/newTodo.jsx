import { useState } from "react";

export default function newTodo() {
  const [formData, setFormData] = useState({ todo_title: "", todo_desc: "" });

  const createTodo = async () => {
    const response = await fetch("http://localhost:3000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTodo();
    console.log(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Create new Todo!</h1>
      <label htmlFor="todo_title">
        Todo Title
        <input
          type="text"
          id="todo_title"
          name="todo_title"
          placeholder="My Todo"
          value={formData.todo_title}
          onChange={onChange}
          required
        />
      </label>
      <label htmlFor="todo_desc">
        Todo Description
        <textarea
          id="todo_desc"
          name="todo_desc"
          placeholder="I will study before exams..."
          aria-label="Todo description"
          rows={5}
          style={{ resize: "none" }}
          value={formData.todo_desc}
          onChange={onChange}
          required
        ></textarea>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
