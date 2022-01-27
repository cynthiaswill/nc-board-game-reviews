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
import Compose from "./components/Compose";
import ErrorPage from "./components/ErrorPage";
import Search from "./components/Search";
import InvalidRoute from "./components/InvalidRoute";

function App() {
  const [reviewsCount, setReviewsCount] = useState(0);
  const [authors, setAuthors] = useState([]);
  const [reset, setReset] = useState(false);

  return (
    <div className="App">
      <Header setReset={setReset} />
      <Nav
        reviewsCount={reviewsCount}
        reset={reset}
        setReset={setReset}
        authors={authors}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/reviews"
          element={<Reviews setReviewsCount={setReviewsCount} setAuthors={setAuthors} />}
        />
        <Route path="/reviews/:review_id" element={<Review />} />
        <Route path="/users" element={<Login />} />
        <Route path="/users/:username" element={<User />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </div>
  );
}

export default App;
