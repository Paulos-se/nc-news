// import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useState, useEffect } from "react";

import axios from "axios";

import Error from "./Error";

function Topic() {
  const [isLoading, setIsLoading] = useState(true);
  const [articleTopics, setArticleTopics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://nc-news-pa.herokuapp.com/api/topics")
      .then((res) => {
        setArticleTopics(res.data.topics);
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError({
          status: err.response.status,
          message: err.response.data.message,
        });
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <p>Loading....</p>;
  } else if (error) {
    return <Error status={error.status} message={error.message} />;
  } else {
    return (
      <Navbar expand="lg" className="color-nav">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="color-nav">
          <Nav className="me-auto color-nav">
            <Nav.Link href="/" className="color-nav">
              Home
            </Nav.Link>
            <Nav.Link href="/articles" className="color-nav">
              All articles
            </Nav.Link>

            {articleTopics.map((topic) => {
              return (
                <Nav.Link
                  href={`/topics/${topic.slug}`}
                  key={topic.slug}
                  className="color-nav"
                >
                  {`${topic.slug[0].toUpperCase()}${topic.slug.slice(1)}`}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Topic;
