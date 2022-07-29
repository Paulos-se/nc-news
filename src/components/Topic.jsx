import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { useContext } from "react";

import { UserContext } from "../components/User";

import axios from "axios";
import SortBy from "./SortBy";

function Topic() {
  const { single_topic } = useParams();
  const [topicArticlesList, setTopicArticlesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserContext);

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
    return <p className="loading">Loading....</p>;
  } else if (error) {
    return <p>{errorMessage}</p>;
  } else {
    return (
      <div>
        <p id="avatar-p">
          <img id="avatar" src={user.avatar_url} alt="avatar" />
          Signed in as {user.username}
        </p>

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
