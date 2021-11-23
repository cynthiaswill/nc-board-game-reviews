import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Reviews from "./components/Reviews";
import Review from "./components/Reviews";

function App() {
  const [catQueries, setCatQueries] = useState(["created_at", "desc", 10, 1]);

  return (
    <div className="App">
      <Header />
      <Nav setCatQueries={setCatQueries} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reviews" element={<Reviews catQueries={catQueries} />} />
        <Route path="/reviews/:review_id" element={<Review />} />
        <Route path="/reviews/:title" element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;
