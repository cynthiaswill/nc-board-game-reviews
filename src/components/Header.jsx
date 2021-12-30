import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h1 className="header">
        <Link
          id="header"
          to="/"
          onClick={() => {
            window.location.reload(false);
          }}
        >
          Board Game Reviews
        </Link>
      </h1>
    </header>
  );
}
