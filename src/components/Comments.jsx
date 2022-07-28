import { useEffect, useState } from "react";
import axios from "axios";

function Comments({ article }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://nc-news-pa.herokuapp.com/api/articles/${article.article_id}/comments`
      )
      .then((res) => {
        setComments(res.data.comments);
        setError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
      });
  }, [article.article_id]);
  if (isLoading) {
    return <p>Loading ....</p>;
  } else if (error) {
    return <p>errorMessage</p>;
  }
  return (
    <section>
      <ul className="articles">
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="lists">
              <p>
                {comment.comment_id}-{comment.body}
              </p>
              <p>{comment.created_at}</p>
              <p>{comment.author}</p>
              <p>{comment.vote}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Comments;
