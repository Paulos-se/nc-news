import axios from "axios";
import { useState } from "react";

function UpdateVote({ vote, setVote, setArticle, article }) {
  const [liked, setLiked] = useState(false);
  const [unLiked, setUnLiked] = useState(false);
  function upVote(e) {
    if (liked) {
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
    }
  }

  function downVote(e) {
    if (unLiked) {
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
    }
  }

  return (
    <div>
      <button onClick={upVote}>👍</button>
      <button onClick={downVote}>👎</button>
    </div>
  );
}

export default UpdateVote;
