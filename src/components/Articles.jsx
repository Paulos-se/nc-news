import { useState, useEffect } from "react";

import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

import Error from "./Error";

import SortBy from "./SortBy";

function Articles() {
  const [articlesList, setArticlesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState({
    sort_by: "created_at",
    order: "DESC",
  });
  const [search, setSearch] = useSearchParams();
  const sort_by = search.get("sort_by");
  const order = search.get("order");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://nc-news-pa.herokuapp.com/api/articles", {
        params: {
          sort_by: sort_by,
          order: order,
        },
      })
      .then((res) => {
        setArticlesList(res.data.articles);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setIsLoading(false);
        setError({
          status: err.response.status,
          message: err.response.data.message,
        });
      });
  }, [search]);

  if (isLoading) {
    return <p className="loading">Loading Articles....</p>;
  } else if (error) {
    return <Error status={error.status} message={error.message} />;
  } else {
    return (
      <div>
        <SortBy query={query} setQuery={setQuery} setSearch={setSearch} />
        <h3>{articlesList.length} Articles</h3>
        <ul className="articles">
          {articlesList.map((article) => {
            return (
              <li
                key={article.article_id}
                id={article.article_id}
                className="lists"
              >
                <Link to={`${article.article_id}`} className="article-p">
                  {article.title}
                </Link>

                <p className="article-p">Article ID {article.article_id}</p>
                <p className="article-p"> Author {article.author}</p>
                <p className="article-p">Article topic {article.topic}</p>
                <p className="article-p">
                  Created at {article.created_at.slice(0, 10)}
                  {"  "}
                  {article.created_at.slice(11, 19)}
                </p>
                <p className="article-p">Comments {article.comment_count}</p>
                <p className="article-p">Vote {article.votes}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Articles;
