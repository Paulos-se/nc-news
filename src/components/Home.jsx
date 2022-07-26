import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [articlesList, setArticlesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://nc-news-pa.herokuapp.com/api/articles")
      .then((res) => {
        setArticlesList(res.data.articles);
        setIsLoading(false);
        setError(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
        setError(false);
      });
  }, [setIsLoading]);

  if (isLoading) {
    return <p>Loading Articles....</p>;
  } else if (error) {
    return <p>{errorMessage}</p>;
  } else {
    return (
      <div>
        <h3>{articlesList.length} Articles</h3>
        <ul className="articles">
          {articlesList.map((article) => {
            return (
              <li
                key={article.article_id}
                id={article.article_id}
                className="lists"
              >
                <Link to={`articles/${article.article_id}`}>
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

export default Home;
