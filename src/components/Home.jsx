import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [articlesList, setArticlesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
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
  }, [articlesList]);

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
              <div key={`${article.article_id}div`} className="lists">
                <li key={article.article_id} id={article.article_id}>
                  {article.title}
                  {article.author}
                  {article.votes}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Home;