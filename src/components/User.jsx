import { getUser } from "../utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function User({ user }) {
  const { username } = useParams();

  useEffect(() => {
    getUser(username)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>single user</div>;
}
