import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Reviews from "./components/Reviews";
import Review from "./components/Reviews";

function App() {
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
      <Nav setCatQueries={setCatQueries} setCategory={setCategory} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/reviews"
          element={<Reviews catQueries={catQueries} category={category} />}
        />
        <Route path="/reviews/:review_id" element={<Review />} />
        <Route path="/reviews/:title" element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;
