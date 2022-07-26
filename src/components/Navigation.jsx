import { Link } from "react-router-dom";
import TopicsLink from "./TopicsLink";

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <TopicsLink />
    </nav>
  );
}

export default Navigation;
