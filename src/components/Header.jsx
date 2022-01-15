import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

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
          <Tilt perspective={500} scale={1.1}>
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
              <div id="header-text">Board Game Reviews</div>
            </div>
          </Tilt>
        </Link>
      </h1>
    </header>
  );
}
