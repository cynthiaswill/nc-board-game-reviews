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
import ErrorPage from "./components/ErrorPage";

function App() {
  const [categories, setCategories] = useState([]);
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
          categories={categories}
          setCategories={setCategories}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/reviews"
            element={<Reviews catQueries={catQueries} category={category} />}
          />
          <Route path="/reviews/:review_id" element={<Review />} />
          <Route path="/users" element={<Login />} />
          <Route path="/users/:username" element={<User />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/compose"
            element={<Compose categories={categories} setCategories={setCategories} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
