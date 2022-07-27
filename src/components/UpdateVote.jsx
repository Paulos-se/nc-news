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
  function upVote(e) {
    if (liked) {
      axios
        .patch(
          `https://nc-news-pa.herokuapp.com/api/articles/${article.article_id}`,
          { inc_votes: -1 }
        )
        .then((res) => {
          setVote(res.data.votes);
        });

      voteArticle(-singleVote);
      setLiked(false);
      unLikeSetDisable(false);
    } else {
      axios
        .patch(
          `https://nc-news-pa.herokuapp.com/api/articles/${article.article_id}`,
          { inc_votes: 1 }
        )
        .then((res) => {
          setVote(res.data.votes);
        });

      voteArticle(singleVote);
      setLiked(true);
      unLikeSetDisable(true);
    }
  }

  function downVote(e) {
    if (unLiked) {
      axios
        .patch(
          `https://nc-news-pa.herokuapp.com/api/articles/${article.article_id}`,
          { inc_votes: 1 }
        )
        .then((res) => {
          setVote(res.data.votes);
        });
      voteArticle(singleVote);
      setUnLiked(false);
      likeSetDisable(false);
    } else {
      axios
        .patch(
          `https://nc-news-pa.herokuapp.com/api/articles/${article.article_id}`,
          { inc_votes: -1 }
        )
        .then((res) => {
          setVote(res.data.votes);
        });
      voteArticle(-singleVote);
      setUnLiked(true);
      likeSetDisable(true);
    }
  }

  return (
    <div>
      <button
        onClick={upVote}
        disabled={likeDisable}
        className="btn btn-primary"
      >
        👍
      </button>
      <button
        onClick={downVote}
        disabled={unLikeDisable}
        className="btn btn-danger"
      >
        👎
      </button>
    </div>
  );
}

export default UpdateVote;
