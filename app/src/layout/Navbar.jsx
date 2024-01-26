import { Link } from "react-router-dom";
import classes from "./navbar.module.css";

export default function Navbar() {
  return (
    <>
      <nav className={classes.navbar}>
        <ul>
          <li>
            <h3 className={classes.navbar_header}>
              <Link to={"/"}>Todo App</Link>
            </h3>
          </li>
        </ul>
        <ul>
          <li>
            <Link to={"/todos"}>go to todo</Link>
          </li>

          <li>
            <Link to={"/newtodo"}>go to newTodo</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
