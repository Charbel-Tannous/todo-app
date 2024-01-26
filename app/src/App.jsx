import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import MyTodo from "./pages/myTodo";
import NewTodo from "./pages/newTodo";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/todos" element={<MyTodo />} />
          <Route path="/newtodo" element={<NewTodo />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
