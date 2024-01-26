import Todo from "./Todo";

export default function TodoList(props) {
  return (
    <>
      {props.todos.map((todo) => (
        <Todo
          key={todo.todo_id}
          todo={todo}
        />
      ))}
    </>
  );
}
