import { useState, useEffect, useContext } from "react";
import { FaRegCalendarAlt, FaRegClock, FaUsers } from "react-icons/fa";
import { OnlineUsersContext } from "../contexts/OnlineUsersContext";
import { getOnlineUsers } from "../utils/api";

export default function DateTime() {
  var [date, setDate] = useState(new Date());
  const { onlineUsers, setOnlineUsers } = useContext(OnlineUsersContext);

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    getOnlineUsers().then(({ data }) => {
      data.list.onlineUsers && setOnlineUsers([...data.list.onlineUsers]);
    });
  }, [setOnlineUsers]);

  return (
    <div style={{ color: "lightgrey", fontSize: "small" }}>
      <FaRegCalendarAlt /> {date.toLocaleDateString()}&nbsp;&nbsp;
      <FaRegClock /> {date.toLocaleTimeString()}&nbsp;&nbsp;
      <FaUsers /> Currently&nbsp;
      <span style={{ color: "lime" }}>{onlineUsers.length || 1}</span>&nbsp;user(s) online
    </div>
  );
}
