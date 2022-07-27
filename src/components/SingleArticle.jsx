import { useParams } from "react-router-dom";

import axios from "axios";

import { useState, useEffect } from "react";
import UpdateVote from "./UpdateVote";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [articleVote, setArticleVote] = useState(0);

  useEffect(() => {
    axios
      .get(`https://nc-news-pa.herokuapp.com/api/articles/${article_id}`)
      .then((res) => {
        setArticle(res.data.article);
        setArticleVote(res.data.article.votes);
        isLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
        setError(false);
      });
  }, [article_id]);
  if (isLoading) {
    return <p>Loading Articles....</p>;
  } else if (error) {
    return <p>{errorMessage}</p>;
  } else {
    return (
      <main className="single-article">
        <h2>{article.title}</h2>
        <p>Article ID {article.article_id}</p>
        <p> Author {article.author}</p>
        <p>Vote {articleVote}</p>
        <p>Article topic{article.topic}</p>
        <p>Created at {article.created_at}</p>
        <p>Comments {article.comment_count}</p>
        <UpdateVote
          vote={articleVote}
          setVote={setArticleVote}
          article={article}
          setArticle={setArticle}
        />
      </main>
    );
  }
}
export default SingleArticle;
