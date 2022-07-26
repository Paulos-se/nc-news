import { useState, useContext } from "react";

import axios from "axios";

import { UserContext } from "../components/User";
import Error from "./Error";

function NewComment({ article, comments, setComments }) {
  const [error, setError] = useState(null);

  const [formDisable, setFormDisable] = useState(false);
  const { user } = useContext(UserContext);
  const intialPost = {
    author: user.username,
    body: "",
  };
  const [commentToPost, setCommentToPost] = useState(intialPost);

  function handleInput(e) {
    const { name, value } = e.target;

    setCommentToPost({
      ...commentToPost,
      [name]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(
        `https://nc-news-paulos.onrender.com/api/articles/${article.article_id}/comments`,
        commentToPost
      )
      .then(() => {
        setError(null);
        setFormDisable(false);
      })
      .catch((err) => {
        setError({
          status: err.response.status,
          message: err.response.data.message,
        });
      });

    setComments((current) => {
      const newCommentToPost = { ...commentToPost };
      newCommentToPost["comment_id"] = new Date().getMilliseconds();
      newCommentToPost["votes"] = 0;
      newCommentToPost["created_at"] = new Date().toISOString();
      const newComments = [...current, newCommentToPost];
      return newComments;
    });
    setFormDisable(true);
    setCommentToPost(intialPost);
  }
  if (error) {
    return <Error status={error.status} message={error.message} />;
  } else {
    return (
      <div>
        {formDisable ? (
          <h2 className="comment-posted">Comment post successful</h2>
        ) : (
          user.username.length > 0 && (
            <div>
              <p>Signed in as {user.username}</p>
              <form onSubmit={handleSubmit} className="comment-form">
                <textarea
                  placeholder="Comment here ..."
                  className="input-comment"
                  onChange={handleInput}
                  value={commentToPost.body}
                  type="text"
                  name="body"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary comment-button"
                  disabled={formDisable}
                >
                  Post Comment!
                </button>
              </form>
            </div>
          )
        )}
      </div>
    );
  }
}

export default NewComment;
