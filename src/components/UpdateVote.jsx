import axios from "axios";
import { useState } from "react";

function UpdateVote({ vote, setVote, setArticle, article }) {
  const [liked, setLiked] = useState(false);
  const [unLiked, setUnLiked] = useState(false);
  const [likeDisable, likeSetDisable] = useState(false);
  const [unLikeDisable, unLikeSetDisable] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const singleVote = 1;

  function voteArticle(vote) {
    setVote((current) => {
      let newVote = current + vote;

      return newVote;
    });
  }

  function patch(singleVote) {
    axios
      .patch(
        `https://nc-news-pa.herokuapp.com/api/articles/${article.article_id}`,
        { inc_votes: singleVote }
      )
      .then((res) => {
        setVote(res.data.votes);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
      });
  }
  function likeArticle() {
    if (liked) {
      patch(-singleVote);
      voteArticle(-singleVote);
      setLiked(false);
      unLikeSetDisable(false);
    } else {
      patch(singleVote);
      voteArticle(singleVote);
      setLiked(true);
      unLikeSetDisable(true);
    }
  }

  function unlikeArticle() {
    if (unLiked) {
      patch(singleVote);
      voteArticle(singleVote);
      setUnLiked(false);
      likeSetDisable(false);
    } else {
      patch(-singleVote);
      voteArticle(-singleVote);
      setUnLiked(true);
      likeSetDisable(true);
    }
  }
  if (error) {
    <p>{errorMessage}</p>;
  } else {
    return (
      <div>
        <button
          onClick={likeArticle}
          disabled={likeDisable}
          className="btn btn-primary"
        >
          👍
        </button>
        <button
          onClick={unlikeArticle}
          disabled={unLikeDisable}
          className="btn btn-danger"
        >
          👎
        </button>
      </div>
    );
  }
}

export default UpdateVote;
