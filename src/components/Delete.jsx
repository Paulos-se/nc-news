import axios from "axios";

import { useState } from "react";

import Error from "./Error";

function Delete({ comment, setComments }) {
  const [error, setError] = useState(null);

  function deleteComment() {
    axios
      .delete(
        `https://nc-news-pa.herokuapp.com/api/comments/${comment.comment_id}`
      )
      .then(() => {
        setError(null);
      })
      .catch((err) => {
        setError({
          status: err.response.status,
          message: err.response.data.message,
        });
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
    return <Error status={error.status} message={error.message} />;
  }
  return (
    <button onClick={deleteComment} className="btn btn-danger">
      Delete
    </button>
  );
}

export default Delete;
