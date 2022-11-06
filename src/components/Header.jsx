import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./User";

function Header() {
  const { user, setUser } = useContext(UserContext);
  function logOut() {
    setUser((current) => {
      const newUser = {
        ...current,
        username: "",
        name: "",
        avatar_url: "",
      };

      return newUser;
    });
  }

  return (
    <h1 className="header">
      <Link to="/" className="header-link">
        NC NEWS
      </Link>
      {user ? (
        user.username.length > 0 ? (
          <img src={user.avatar_url} className="login-image" alt={user.name} />
        ) : (
          <img src={user.avatar_url} className="hide" alt={user.name} />
        )
      ) : null}
      {user && user.username.length > 0 && (
        <button onClick={logOut} className="logout-button">
          Logout
        </button>
      )}
    </h1>
  );
}

export default Header;
