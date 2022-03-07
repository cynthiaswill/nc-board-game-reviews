import "../styles/Reviews.css";
import { getReviews } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorContext } from "../contexts/ErrorContext";
import { ParticleContext } from "../contexts/ParticleContext";
import { AuthorContext } from "../contexts/AuthorContext";
import { CategoryContext } from "../contexts/CategoryContext";
import { filterReviewsByAuthor, particleOptions } from "../utils/utils";
import { FaRegCommentAlt, FaRegCalendarAlt } from "react-icons/fa";
import { CatQueriesContext } from "../contexts/CatQueriesContext";
import { SearchContext } from "../contexts/SearchContext";
import useWindowDimensions from "../hooks/WindowDimentions";
import Highlighter from "react-highlight-words";
import SearchBar from "./SearchBar";
import WatchSwitch from "./WatchSwitch";
import Kudos from "./Kudos";
import WatchToggle from "./WatchToggle";
import SideMenu from "./SideMenu";
import ProgressBar from "./ProgressBar";
import Fuse from "fuse.js";

export default function Reviews({ setReviewsCount, setAuthors }) {
  const { setError } = useContext(ErrorContext);
  const { setParticleOps } = useContext(ParticleContext);
  const { author } = useContext(AuthorContext);
  const { category } = useContext(CategoryContext);
  const { catQueries } = useContext(CatQueriesContext);
  const { pattern, isSearching, setIsSearching } = useContext(SearchContext);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([...reviews]);
  const [isWatchedOnly, setIsWatchedOnly] = useState(false);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setIsSearching(false);
    setParticleOps(particleOptions);
    getReviews(catQueries)
      .then(({ data }) => {
        const authorsArr = data.reviews.map((review) => {
          return review.owner;
        });
        setAuthors([...new Set(authorsArr)]);

        if (author !== "") {
          setReviews(filterReviewsByAuthor(data.reviews, author));
        } else {
          setReviews(data.reviews);
        }
        setReviewsCount(reviews.length);
        setIsLoading(false);
        setIsSearching(true);
      })
      .catch((err) => {
        if (err) {
          setError(err.response.status);
          navigate("/error");
        }
      });
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
    setIsSearching,
  ]);

  useEffect(() => {
    if (!pattern) {
      setData([...reviews]);
      return;
    }
    const fuse = new Fuse(reviews, {
      keys: ["title", "owner", "designer", "review_body"],
      threshold: 0.4,
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
    setIsSearching(false);
  }, [pattern, reviews, isSearching, setIsSearching]);

  if (isLoading === true) {
    return (
      <div
        style={{ display: "flex", justifyContent: "flex-start", flexDirection: "column" }}
      >
        <h2>
          <i className="fa fa-cog fa-spin" style={{ fontSize: 20 }} /> Loading...
        </h2>
        <div style={{ alignSelf: "center" }}>
          <ProgressBar />
        </div>
      </div>
    );
  }

  return (
    <div className="above-main">
      <h3 className="category-title">
        <span>{category.slug}:</span>
        {width > 600 && width < 812 && <SearchBar />}
        {width < 812 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <WatchSwitch
              isWatchedOnly={isWatchedOnly}
              setIsWatchedOnly={setIsWatchedOnly}
            />
          </div>
        )}
        <span className="page-number-in-reviews">Page {catQueries.p}</span>
      </h3>
      <p className="category-description">{category.description}</p>
      <>
        {!data.length ? (
          <h3
            style={{ color: "white", textAlign: "center", marginTop: 5, marginBottom: 0 }}
          >
            <i className="fas fa-search" aria-hidden="true"></i> No matched review found!
          </h3>
        ) : pattern ? (
          <h3
            style={{ color: "white", textAlign: "center", marginTop: 5, marginBottom: 0 }}
          >
            <i className="fas fa-search" aria-hidden="true"></i> Your search results of "
            {pattern}" are:
          </h3>
        ) : null}
      </>
      <main className="main">
        <div className="mainView">
          {data.map((review) => {
            return (
              <div key={review.review_id} className="review-item-container">
                <div className="review-item">
                  <section className="review-card">
                    <div className="review-title-row">
                      <h3 className="review-title">
                        <Link
                          to={`/reviews/${review.review_id}`}
                          className="review-title-link"
                        >
                          {" "}
                          <Highlighter
                            highlightClassName="highlight"
                            searchWords={[pattern]}
                            autoEscape={true}
                            textToHighlight={review.title}
                          />{" "}
                        </Link>
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <WatchToggle review={review} className="watch-toggle" />
                      </div>
                    </div>
                    <span className="slug-name-in-reviews">
                      Category: {review.category}
                    </span>{" "}
                    <span className="designer-name-in-reviews">
                      Designer:{" "}
                      <Highlighter
                        highlightClassName="highlight"
                        searchWords={[pattern]}
                        autoEscape={true}
                        textToHighlight={review.designer}
                      />
                    </span>
                    <br />
                    <div className="image-container-in-reviews">
                      <img
                        className="review-img"
                        src={review.review_img_url}
                        alt={review.title}
                      />
                    </div>
                    <div>
                      <p className="body-text-in-reviews">
                        <Highlighter
                          highlightClassName="highlight"
                          searchWords={[pattern]}
                          autoEscape={true}
                          textToHighlight={review.review_body}
                        />
                      </p>
                      <span className="author-in-reviews">
                        Author:{" "}
                        <Link to={`/users/${review.owner}`} className="author-link">
                          <Highlighter
                            highlightClassName="highlight"
                            searchWords={[pattern]}
                            autoEscape={true}
                            textToHighlight={review.owner}
                          />
                        </Link>
                      </span>
                      <span className="date-posted-in-reviews">
                        <FaRegCalendarAlt />{" "}
                        {review.created_at.slice(0, 19).replaceAll("T", " at ")}
                      </span>
                      <br />
                    </div>
                  </section>
                  <Link to={`/reviews/${review.review_id}`} className="read-more">
                    Read More
                  </Link>
                  <section>
                    <button
                      className="view-comments-button"
                      onClick={() => {
                        navigate(`/reviews/${review.review_id}`);
                      }}
                    >
                      <FaRegCommentAlt className="commentIcon" /> {review.comment_count}
                      <span className="commentsTooltipText">view comments</span>
                    </button>
                    <Kudos review={review} />
                  </section>
                </div>
              </div>
            );
          })}
        </div>
        <div className="sideMenu">
          <SideMenu
            className="sideMenuContainer"
            isWatchedOnly={isWatchedOnly}
            setIsWatchedOnly={setIsWatchedOnly}
          />
        </div>
      </main>
    </div>
  );
}
