import { Link } from "react-router-dom";

function Header() {
  return (
    <h1 className="header">
      <Link to="/" className="header-link">
        NC NEWS
      </Link>
    </h1>
  );
}

export default Header;
