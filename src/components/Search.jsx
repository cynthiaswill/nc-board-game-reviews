import "../styles/Search.css";
import { getReviews } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";
import { ParticleContext } from "../contexts/ParticleContext";
import { SearchContext } from "../contexts/SearchContext";
import { particleOptions } from "../utils/utils";
import SearchCard from "./SearchCard";
import Fuse from "fuse.js";

import SideMenu from "./SideMenu";

export default function Search() {
  const { setError } = useContext(ErrorContext);
  const { setParticleOps } = useContext(ParticleContext);
  const { pattern } = useContext(SearchContext);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setParticleOps(particleOptions);
    getReviews({
      sort: "created_at",
      order: "desc",
      limit: 10,
      p: 1,
      category: "",
    })
      .then(({ data }) => {
        setReviews(data.reviews);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
  }, [setError, navigate, setParticleOps]);

  const [data, setData] = useState(reviews);

  useEffect(() => {
    if (!pattern) {
      setData(reviews);
      return;
    }

    const fuse = new Fuse(data, {
      keys: ["title", "owner", "designer", "review_body"],
    });

    const result = fuse.search(pattern);
    const matches = [];
    if (!result.length) {
      setData([]);
    } else {
      result.forEach(({ item }) => {
        matches.push(item);
      });
      setData(matches);
    }
  }, [data, pattern, reviews]);

  if (isLoading === true) {
    return (
      <h2>
        <i className="fa fa-cog fa-spin" style={{ fontSize: 20 }} /> Loading...
      </h2>
    );
  }
  return (
    <div className="above-main">
      {!data.length ? (
        <h3 style={{ color: "white", textAlign: "center" }}>
          <i class="fas fa-search" aria-hidden="true"></i> No match found!
        </h3>
      ) : pattern ? (
        <h3 style={{ color: "white", textAlign: "center" }}>
          <i class="fas fa-search" aria-hidden="true"></i> Your search results of "
          {pattern}" are:
        </h3>
      ) : (
        <h3 style={{ color: "white", textAlign: "center" }}>
          <i class="fas fa-search" aria-hidden="true"></i> Your search results are:
        </h3>
      )}
      <main className="main">
        <div className="mainView">
          <div className="Container">
            {data.map((item) => (
              <SearchCard {...item} key={item.title} />
            ))}
          </div>
        </div>
        <div className="sideMenu">
          <SideMenu className="sideMenuContainer" />
        </div>
      </main>
    </div>
  );
}
