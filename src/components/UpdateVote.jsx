import axios from "axios";
import { useState } from "react";

function UpdateVote({ vote, setVote, setArticle, article }) {
  const [liked, setLiked] = useState(false);
  const [unLiked, setUnLiked] = useState(false);
  const [likeDisable, likeSetDisable] = useState(false);
  const [unLikeDisable, unLikeSetDisable] = useState(false);
  function upVote(e) {
    if (liked) {
      unLikeSetDisable(false);
      setUnLiked(false);
      e.preventDefault();
    } else {
      axios
        .patch(
          `https://nc-news-pa.herokuapp.com/api/articles/${article.article_id}`,
          { inc_votes: 1 }
        )
        .then((res) => {
          setVote(res.data.votes);
        });

      setVote((current) => {
        let newVote = current + 1;
        return newVote;
      });
      setLiked(true);
      unLikeSetDisable(true);
    }
  }

  function downVote(e) {
    if (unLiked) {
      likeSetDisable(false);
      setLiked(false);
      e.preventDefault();
    } else {
      axios
        .patch(
          `https://nc-news-pa.herokuapp.com/api/articles/${article.article_id}`,
          { inc_votes: -1 }
        )
        .then((res) => {
          setVote(res.data.votes);
        });

      setVote((current) => {
        let newVote = current - 1;

        return newVote;
      });
      setUnLiked(true);
      likeSetDisable(true);
    }
  }

  return (
    <div>
      <button
        onClick={upVote}
        disabled={likeDisable}
        className="btn btn-outline-primary"
      >
        👍
      </button>
      <button
        onClick={downVote}
        disabled={unLikeDisable}
        className="btn btn-outline-danger"
      >
        👎
      </button>
    </div>
  );
}

export default UpdateVote;
