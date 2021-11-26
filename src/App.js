import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import Login from "./components/Login";
import User from "./components/User";
import SignUp from "./components/SignUp";
import PostReview from "./components/PostReview";

function App() {
  const [user, setUser] = useState({});
  const isLogged = !!user.username;
  const [catQueries, setCatQueries] = useState({
    sort: "created_at",
    order: "desc",
    limit: 10,
    p: 1,
    category: "",
  });
  const [category, setCategory] = useState({ slug: "All categories", description: "" });

  return (
    <div className="App">
      <Header />
      <Nav
        setCatQueries={setCatQueries}
        setCategory={setCategory}
        user={user}
        setUser={setUser}
        isLogged={isLogged}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/reviews"
          element={<Reviews catQueries={catQueries} category={category} />}
        />
        <Route
          path="/reviews/:review_id"
          element={<Review user={user} isLogged={isLogged} />}
        />
        <Route path="/users" element={<Login setUser={setUser} />} />
        <Route path="/users/:username" element={<User user={user} setUser={setUser} />} />
        <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
        <Route path="/compose" element={<PostReview />} />
      </Routes>
    </div>
  );
}

export default App;
