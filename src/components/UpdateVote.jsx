import axios from "axios";

function UpdateVote({ vote, setVote, setArticle, article }) {
  function upVote() {
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
  }

  function downVote() {
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
  }

  return (
    <div>
      <button onClick={upVote}>👍</button>
      <button onClick={downVote}>👎</button>
    </div>
  );
}

export default UpdateVote;
