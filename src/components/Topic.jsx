import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import axios from "axios";

function Topic() {
  const { single_topic } = useParams();
  const [topicList, setTopicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get("https://nc-news-pa.herokuapp.com/api/articles")
      .then((res) => {
        const filteredTopic = res.data.articles.filter(
          (article) => article.topic === single_topic
        );
        setTopicList(filteredTopic);
        setIsLoading(false);
        setError(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
        setError(false);
      });
  }, [single_topic]);

  if (isLoading) {
    return <p>Loading Topic....</p>;
  } else if (error) {
    return <p>{errorMessage}</p>;
  } else {
    return (
      <div>
        <h3>{topicList.length} Topics</h3>
        <ul className="articles">
          {topicList.map((article) => {
            return (
              <div key={`${article.article_id}div`} className="lists">
                <li key={article.article_id} id={article.article_id}>
                  <p>{article.title}</p>
                  <p>{article.author}</p>
                  <p>{article.votes}</p>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Topic;
