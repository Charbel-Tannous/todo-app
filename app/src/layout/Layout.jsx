import Navbar from "./Navbar";

export default function Layout(props) {
  return (
    <main className="container">
      <Navbar />
      {props.children}
    </main>
  );
}
