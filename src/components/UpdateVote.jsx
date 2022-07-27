import axios from "axios";
import { useState } from "react";

function UpdateVote({ vote, setVote, setArticle, article }) {
  const [liked, setLiked] = useState(false);
  const [unLiked, setUnLiked] = useState(false);
  const [likeDisable, likeSetDisable] = useState(false);
  const [unLikeDisable, unLikeSetDisable] = useState(false);
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

export default UpdateVote;
