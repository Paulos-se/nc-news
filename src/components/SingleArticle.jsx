import { useParams } from "react-router-dom";

import axios from "axios";

import { useState, useEffect, useContext } from "react";
import UpdateVote from "./UpdateVote";
import Comments from "./Comments";

import { UserContext } from "./User";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [articleVote, setArticleVote] = useState(0);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`https://nc-news-pa.herokuapp.com/api/articles/${article_id}`)
      .then((res) => {
        setArticle(res.data.article);
        setArticleVote(res.data.article.votes);
        setIsLoading(false);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
        setIsLoading(false);
      });
  }, [article_id]);
  if (isLoading) {
    return <p>Loading Articles....</p>;
  } else if (error) {
    return <p>{errorMessage}</p>;
  } else {
    return (
      <main className="single-article">
        <p id="avatar-p">
          <img id="avatar" src={user.avatar_url} alt="avatar" />
          Signed in as {user.username}
        </p>
        <h2>{article.title}</h2>
        <p className="body">{article.body}</p>
        <p>Article ID {article.article_id}</p>
        <p> Author {article.author}</p>
        <p>Article topic {article.topic}</p>
        <p>
          Created at {article.created_at.slice(0, 10)}
          {"  "}
          {article.created_at.slice(11, 19)}
        </p>
        <p>Comments {article.comment_count}</p>
        <p>Vote {articleVote}</p>
        <UpdateVote
          vote={articleVote}
          setVote={setArticleVote}
          article={article}
          setArticle={setArticle}
        />
        <Comments article={article} />
      </main>
    );
  }
}
export default SingleArticle;
