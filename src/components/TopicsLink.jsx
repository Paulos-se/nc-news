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
      <div>
        {articleTopics.map((topic) => {
          return (
            <Link to={`topics/${topic.slug}`} key={topic.slug}>
              {topic.slug}
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Topic;
