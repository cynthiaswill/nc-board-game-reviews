import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import Login from "./components/Login";
import User from "./components/User";
import SignUp from "./components/SignUp";
import Compose from "./components/Compose";

function App() {
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
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
    <BrowserRouter>
      <div className="App">
        <Header />
        <Nav
          setCatQueries={setCatQueries}
          setCategory={setCategory}
          user={user}
          setUser={setUser}
          isLogged={isLogged}
          categories={categories}
          setCategories={setCategories}
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
          <Route
            path="/users/:username"
            element={<User user={user} setUser={setUser} />}
          />
          <Route path="/sign-up" element={<SignUp setUser={setUser} />} />
          <Route
            path="/compose"
            element={
              <Compose
                categories={categories}
                setCategories={setCategories}
                user={user}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
