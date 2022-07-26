import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Topic() {
  const [articleTopics, setArticleTopics] = useState([]);
  useEffect(() => {
    axios.get("https://nc-news-pa.herokuapp.com/api/topics").then((res) => {
      setArticleTopics(res.data.topics);
    });
  }, []);
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

export default Topic;
