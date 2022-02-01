import "../styles/Chat.css";
import UserIcon from "./UserIcon";

export default function OnlineUsersStatus({ name, offlineToggle }) {
  return (
    <div key={name} className="messageInnerLeft" style={{ marginBottom: 5 }}>
      <UserIcon name={name} offlineToggle={offlineToggle} />
      <span
        style={{
          fontSize: 12,
        }}
      >
        &nbsp;&nbsp;
        {name}
      </span>
    </div>
  );
}
