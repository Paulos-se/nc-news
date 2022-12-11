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
      .get("https://nc-news-paulos.onrender.com/api/topics")
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
            <Nav.Link href="/" className="color-nav" style={{ color: "white" }}>
              Home
            </Nav.Link>
            <Nav.Link
              href="/users"
              className="color-nav"
              style={{ color: "white" }}
            >
              Users
            </Nav.Link>
            <Nav.Link
              href="/articles"
              className="color-nav"
              style={{ color: "white" }}
            >
              All articles
            </Nav.Link>

            {articleTopics.map((topic) => {
              return (
                <Nav.Link
                  href={`/topics/${topic.slug}`}
                  key={topic.slug}
                  className="color-nav"
                  style={{ color: "white" }}
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
