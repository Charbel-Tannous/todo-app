import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function newTodo() {
  const [formData, setFormData] = useState({
    todo_id: null,
    todo_title: "",
    todo_desc: "",
  });
  const [type, setType] = useState(null);
  const [noTodo, setNoTodo] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const createTodo = async () => {
    const method = type == null ? "POST" : "PUT";
    console.log(method);
    const response = await fetch("http://localhost:3000/api/todo", {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  };

  const getTodo = async (id) => {
    const response = await fetch(
      `http://localhost:3000/api/todo?todoId=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 404) {
      setNoTodo(true);
      return;
    }
    const data = await response.json();
    console.log(data);
    setFormData(data.data);
    setNoTodo(false);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const typevalue = queryParams.get("type");
    const id = queryParams.get("id");
    if (typevalue && id) {
      setType(typevalue);
      setFormData((prevFormData) => ({
        ...prevFormData,
        todo_id: id,
      }));
      getTodo(id);
    } else {
      setFormData({
        todo_id: null,
        todo_title: "",
        todo_desc: "",
      });
      setNoTodo(false);
      setType(null);
    }
  }, [location]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTodo();
    navigate('/todos')
  };

  return noTodo ? (
    <h1>No Todo With this ID</h1>
  ) : (
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
