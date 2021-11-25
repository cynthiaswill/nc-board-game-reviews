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

function App() {
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);
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
        isLogged={isLogged}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/reviews"
          element={<Reviews catQueries={catQueries} category={category} />}
        />
        <Route path="/reviews/:review_id" element={<Review />} />
        <Route
          path="/users"
          element={<Login setUser={setUser} setIsLogged={setIsLogged} />}
        />
        <Route path="/users/:username" element={<User user={user} setUser={setUser} />} />
        <Route
          path="/sign-up"
          element={<SignUp setUser={setUser} setIsLogged={setIsLogged} />}
        />
      </Routes>
    </div>
  );
}

export default App;
