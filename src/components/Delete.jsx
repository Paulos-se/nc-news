import axios from "axios";

import { useState } from "react";

function Delete({ comment, setComments }) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function deleteComment() {
    axios
      .delete(
        `https://nc-news-pa.herokuapp.com/api/comments/${comment.comment_id}`
      )
      .then(() => {
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
      });

    setComments((current) => {
      const newComments = [...current];
      const filteredComments = newComments.filter(
        (com) => com.comment_id !== comment.comment_id
      );
      return filteredComments;
    });
  }
  if (error) {
    return <p>errorMessage</p>;
  }
  return (
    <button onClick={deleteComment} className="btn btn-danger">
      Delete
    </button>
  );
}

export default Delete;
