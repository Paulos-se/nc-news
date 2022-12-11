import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Error from "./Error";

import axios from "axios";

function Topic() {
  const { single_topic } = useParams();
  const [topicArticlesList, setTopicArticlesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://nc-news-paulos.onrender.com/api/articles?topic=${single_topic}`
      )
      .then((res) => {
        setTopicArticlesList(res.data.articles);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError({
          status: err.response.status,
          message: err.response.data.message,
        });
        setIsLoading(false);
      });
  }, [single_topic]);

  if (isLoading) {
    return <p className="loading">Loading....</p>;
  } else if (error) {
    return <Error status={error.status} message={error.message} />;
  } else {
    return (
      <div>
        <h3>{topicArticlesList.length} Articles</h3>
        <ul className="articles">
          {topicArticlesList.map((article) => {
            return (
              <li
                key={article.article_id}
                id={article.article_id}
                className="lists"
              >
                <Link
                  to={`/articles/${article.article_id}`}
                  className="article-p"
                >
                  {article.title}
                </Link>
                <p className="article-p">{article.author}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Topic;
