import { useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../components/User";
import { useContext } from "react";

function NewComment(article) {
  const { user, setUser } = useContext(UserContext);
  const [commentToPost, setCommentToPost] = useState({
    author: "hankish",
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
    console.log(commentToPost, "<<< im comment to post");
    console.log(e.target, "<<< im e.target");

    axios
      .post(
        `https://nc-news-pa.herokuapp.com/api/articles/${article.article}/comments`,
        commentToPost
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <p>Signed in as {user.username}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            onChange={handleInput}
            value={commentToPost.author}
            type="text"
            name="author"
          />
        </label>
        <label>
          Body
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
