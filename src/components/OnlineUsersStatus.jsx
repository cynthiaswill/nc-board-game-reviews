import "../styles/Chat.css";
import UserIcon from "./UserIcon";
import { Link } from "react-router-dom";

export default function OnlineUsersStatus({ name, onlineToggle, offlineToggle }) {
  return (
    <div className="messageInnerLeft" style={{ marginBottom: 5 }}>
      <UserIcon name={name} offlineToggle={offlineToggle} />
      &nbsp;&nbsp;
      <Link to={`/users/${name}`} className="name-link-in-chat">
        <span
          style={{
            fontSize: 12,
            color: onlineToggle ? "blue" : "rgb(70, 70, 70)",
          }}
        >
          {name}
        </span>
      </Link>
    </div>
  );
}
