import "../styles/Reviews.css";
import { getReviews } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";
import { ParticleContext } from "../contexts/ParticleContext";
import { AuthorContext } from "../contexts/AuthorContext";
import { CategoryContext } from "../contexts/CategoryContext";
import { filterReviewsByAuthor, particleOptions } from "../utils/utils";
import { CatQueriesContext } from "../contexts/CatQueriesContext";

import SideMenu from "./SideMenu";

export default function Search({ setReviewsCount, setAuthors }) {
  const { setError } = useContext(ErrorContext);
  const { setParticleOps } = useContext(ParticleContext);
  const { author } = useContext(AuthorContext);
  const { category } = useContext(CategoryContext);
  const { catQueries } = useContext(CatQueriesContext);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // setIsLoading(true);
    setParticleOps(particleOptions);
  }, [
    catQueries,
    category,
    setError,
    navigate,
    setReviewsCount,
    reviews.length,
    author,
    setAuthors,
    setParticleOps,
  ]);

  //   if (isLoading === true) {
  //     return (
  //       <h2>
  //         <i className="fa fa-cog fa-spin" style={{ fontSize: 20 }} /> Loading...
  //       </h2>
  //     );
  //   }
  return (
    <div className="above-main">
      <main className="main">
        <div className="mainView">search view container</div>
        <div className="sideMenu">
          <SideMenu className="sideMenuContainer" />
        </div>
      </main>
    </div>
  );
}
