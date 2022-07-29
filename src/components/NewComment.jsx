import { useState, useContext } from "react";

import axios from "axios";

import { UserContext } from "../components/User";
import Error from "./Error";

function NewComment({ article, comments, setComments }) {
  const [error, setError] = useState(null);

  const [formDisable, setFormDisable] = useState(false);
  const { user, setUser } = useContext(UserContext);
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
        `https://nc-news-pa.herokuapp.com/api/articles/${article.article_id}/comments`,
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
          <form onSubmit={handleSubmit} className="comment-form">
            <p>Signed in as {user.username}</p>
            <label>
              Comment
              <input
                className="input-comment"
                onChange={handleInput}
                value={commentToPost.body}
                type="text"
                name="body"
                required
              />
            </label>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={formDisable}
            >
              Submit
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default NewComment;
