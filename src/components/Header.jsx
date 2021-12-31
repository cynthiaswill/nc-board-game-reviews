import { Link, useNavigate } from "react-router-dom";

export default function Header({ setReset }) {
  const navigate = useNavigate();

  return (
    <header>
      <h1 className="header">
        <Link
          id="header"
          to="/"
          onClick={() => {
            navigate("*");
            setReset(true);
          }}
        >
          Board Game Reviews
        </Link>
      </h1>
    </header>
  );
}
