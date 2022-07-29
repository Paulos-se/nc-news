import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Topic() {
  const [isLoading, setIsLoading] = useState(true);
  const [articleTopics, setArticleTopics] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios.get("https://nc-news-pa.herokuapp.com/api/topics").then((res) => {
      setArticleTopics(res.data.topics);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <p>Loading Topic....</p>;
  } else {
    return (
      <nav>
        <Link to="/" className="nav-links home-link">
          Home
        </Link>
        <Link to="/articles" className="nav-links">
          All articles
        </Link>
        {articleTopics.map((topic) => {
          return (
            <Link
              to={`topics/${topic.slug}`}
              key={topic.slug}
              className="nav-links"
            >
              {`${topic.slug[0].toUpperCase()}${topic.slug.slice(1)}`}
            </Link>
          );
        })}
      </nav>
    );
  }
}

export default Topic;
