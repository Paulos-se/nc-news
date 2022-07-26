import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

function Topic() {
  const { single_topic } = useParams();
  const [topicArticlesList, setTopicArticlesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://nc-news-pa.herokuapp.com/api/articles?topic=${single_topic}`
      )
      .then((res) => {
        setTopicArticlesList(res.data.articles);
        setIsLoading(false);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
        setIsLoading(false);
      });
  }, [single_topic]);

  if (isLoading) {
    return <p>Loading Topic....</p>;
  } else if (error) {
    return <p>{errorMessage}</p>;
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
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
                <p>{article.author}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Topic;
