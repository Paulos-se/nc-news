import { useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../components/User";
import { useContext } from "react";

function NewComment({ article, comments, SetComments }) {
  const [isLoading, setIsLoading] = useState(true);
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
      .then((response) => {
        setError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error.message);
        setIsLoading(false);
      });

    SetComments((current) => {
      const newComments = [commentToPost, ...current];
      return newComments;
    });
  }

  return (
    <div>
      <p>Signed in as {user.username}</p>
      <form onSubmit={handleSubmit}>
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
            onChange={handleInput}
            value={commentToPost.body}
            type="text"
            name="body"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewComment;
