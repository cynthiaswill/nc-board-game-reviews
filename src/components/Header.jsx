import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function Header({ setReset }) {
  const navigate = useNavigate();

  return (
    <header>
      <h1 className="header">
        <Link
          id="header"
          to="/"
          onClick={() => {
            navigate("/");
            setReset(true);
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <FaHome style={{ paddingBottom: "5px", alignSelf: "center" }} />
            </div>
            Board Game Reviews
          </div>
        </Link>
      </h1>
    </header>
  );
}
