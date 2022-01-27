import "../styles/Search.css";
import { useNavigate } from "react-router-dom";

export default function Card({ review_img_url, title, owner, review_id, designer }) {
  const navigate = useNavigate();

  return (
    <div className="CardWrapper">
      <div className="ColImg">
        <img className="Img" src={review_img_url} alt={title} />
      </div>
      <div className="ColDetail">
        <div className="SearchedHeader">
          <div className="SearchedTitle">{title}</div>
        </div>
        <div className="SearchedDescription">Designer: {designer}</div>
        <div className="SearchedDescription">Author: {owner}</div>
        <button
          className="SearchedLink"
          onClick={() => {
            navigate(`/reviews/${review_id}`);
          }}
        >
          Learn more
        </button>
      </div>
    </div>
  );
}
