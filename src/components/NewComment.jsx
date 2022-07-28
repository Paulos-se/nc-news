import { useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../components/User";
import { useContext } from "react";

function NewComment({ article, comments, setComments }) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [commentToPost, setCommentToPost] = useState({
    author: user.username,
    body: "",
  });

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
        setError(false);
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error.message);
      });

    setComments((current) => {
      const newCommentToPost = { ...commentToPost };
      const newComments = [newCommentToPost, ...current];
      return newComments;
    });
  }
  if (error) {
    return <p>errorMessage</p>;
  } else {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <p>Signed in as {user.username}</p>
          <label>
            Username:
            <input
              onChange={handleInput}
              value={commentToPost.author}
              type="text"
              name="author"
            />
          </label>
          <label>
            Comment
            <input
              className="input-comment"
              onChange={handleInput}
              value={commentToPost.body}
              type="text"
              name="body"
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default NewComment;
