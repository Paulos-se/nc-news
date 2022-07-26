import { useParams } from "react-router-dom";

import axios from "axios";

import { useState, useEffect } from "react";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`https://nc-news-pa.herokuapp.com/api/articles/${article_id}`)
      .then((res) => {
        setArticle(res.data.article);
        isLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
        setError(false);
      });
  }, [article_id, isLoading]);
  if (isLoading) {
    return <p>Loading Articles....</p>;
  } else if (error) {
    return <p>{errorMessage}</p>;
  } else {
    return (
      <main>
        <h2>{article.title}</h2>
        <p>Article ID{article.article_id}</p>
        <p> Author {article.author}</p>
        <p>Votes {article.votes}</p>
        <p>Article topic{article.topic}</p>
        <p>Created at{article.created_at}</p>
        <p>Comments{article.comment_count}</p>
      </main>
    );
  }
}
export default SingleArticle;
