import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <h1>
        <Link to="/"> Board Game Reviews </Link>
      </h1>
    </header>
  );
}
