import { useEffect, useState } from "react";
import axios from "axios";

import NewComment from "./NewComment";
import { UserContext } from "./User";
import Delete from "./Delete";
import Error from "./Error";

import { useContext } from "react";

function Comments({ article }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://nc-news-pa.herokuapp.com/api/articles/${article.article_id}/comments`
      )
      .then((res) => {
        setComments(res.data.comments);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({
          status: err.response.status,
          message: err.response.data.message,
        });

        setIsLoading(false);
      });
  }, [article.article_id, comments.length]);
  if (isLoading) {
    return <p>Loading ....</p>;
  } else if (error) {
    return <Error status={error.status} message={error.message} />;
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
                <p className="article-p">
                  Created at {comment.created_at.slice(0, 10)}
                  {"  "}
                  {comment.created_at.slice(11, 19)}
                </p>
                <p className="article-p">Author {comment.author}</p>
                <p className="article-p">Vote {comment.votes}</p>
                {comment.author === user.username ? (
                  <Delete comment={comment} setComments={setComments} />
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default Comments;
