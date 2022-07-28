import { useEffect, useState } from "react";
import axios from "axios";
import NewComment from "./NewComment";

function Comments({ article }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  }, [article.article_id]);
  if (isLoading) {
    return <p>Loading ....</p>;
  } else if (error) {
    return <p>errorMessage</p>;
  }
  return (
    <section>
      <NewComment
        article={article}
        comments={comments}
        setComments={setComments}
      />
      {comments.length === 0 ? (
        <p>No comments</p>
      ) : (
        <ul className="articles">
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id} className="lists">
                <p className="article-p">{comment.body}</p>
                <p className="article-p">{comment.created_at}</p>
                <p className="article-p">Author {comment.author}</p>
                <p className="article-p">Vote {comment.votes}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default Comments;