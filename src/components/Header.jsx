import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import Particles from "react-tsparticles";

export default function Header({ setReset }) {
  const navigate = useNavigate();
  const particleOptions = {
    fpsLimit: 60,
    particles: {
      links: {
        enable: true,
        distance: 120,
      },
      move: {
        enable: true,
        speed: 0.5,
        outModes: {
          default: "bounce",
        },
      },
      number: {
        density: {
          enable: true,
          area: 500,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      size: {
        random: true,
        value: 2,
      },
    },
  };

  return (
    <header>
      <Particles id="tsparticles" options={particleOptions} />
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
