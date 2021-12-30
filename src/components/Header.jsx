import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <h1 className="header">
        <Link
          id="header"
          to="/"
          onClick={() => {
            navigate("*");
          }}
        >
          Board Game Reviews
        </Link>
      </h1>
    </header>
  );
}
