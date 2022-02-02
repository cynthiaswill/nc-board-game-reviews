import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Tilt from "react-parallax-tilt";
import Particles from "react-tsparticles";
import { ParticleContext } from "../contexts/ParticleContext";
import { getOnlineUsers } from "../utils/api";
import { OnlineUsersContext } from "../contexts/OnlineUsersContext";

export default function Header({ setReset }) {
  const navigate = useNavigate();
  const { particleOps } = useContext(ParticleContext);
  const { setOnlineUsers } = useContext(OnlineUsersContext);

  useEffect(() => {
    getOnlineUsers().then(({ data }) => {
      data.list.onlineUsers && setOnlineUsers([...data.list.onlineUsers]);
    });
  }, [setOnlineUsers]);

  return (
    <header>
      <Particles id="tsparticles" options={particleOps} />
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
                <FaHome className="title-house" />
              </div>
              <div id="header-text">Board Game Reviews</div>
            </div>
          </Tilt>
        </Link>
      </h1>
    </header>
  );
}
