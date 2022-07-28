import { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./User";
import SortBy from "./SortBy";

function Home() {
  const [articlesList, setArticlesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [category, setCategory] = useState("created_at");
  const [order, setOrder] = useState("DESC");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://nc-news-pa.herokuapp.com/api/articles", {
        params: {
          sort_by: category,
          order: order,
        },
      })
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
  }, [category, order]);

  if (isLoading) {
    return <p className="loading">Loading Articles....</p>;
  } else if (error) {
    return <p>{errorMessage}</p>;
  } else {
    return (
      <div>
        <SortBy setCategory={setCategory} setOrder={setOrder} />
        <p id="avatar-p">
          <img id="avatar" src={user.avatar_url} alt="avatar" />
          Signed in as {user.username}
        </p>
        <h3>{articlesList.length} Articles</h3>
        <ul className="articles">
          {articlesList.map((article) => {
            return (
              <li
                key={article.article_id}
                id={article.article_id}
                className="lists"
              >
                <Link
                  to={`articles/${article.article_id}`}
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

export default Home;
