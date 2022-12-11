import { UserContext } from "./User";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Error from "./Error";

function Users() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);

  const changeUser = (selectedUser) => {
    setUser(selectedUser);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://nc-news-paulos.onrender.com/api/users")
      .then((result) => {
        setData(result.data.users);
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
    return <p className="loading">Loading users....</p>;
  } else if (error) {
    return <Error status={error.status} message={error.message} />;
  } else {
    return (
      <section>
        <h2>Users</h2>
        <ul className="articles">
          {data.map((d) => {
            return (
              <li key={d.username} className="lists">
                <button
                  onClick={() => changeUser(d)}
                  className="btn btn-primary"
                >
                  {" "}
                  Select
                </button>
                <h6 className="article-p">{d.name}</h6>
                <p className="article-p">{d.username}</p>
                <img
                  id="users"
                  src={d.avatar_url}
                  alt="avatar"
                  className="article-p"
                />{" "}
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default Users;
