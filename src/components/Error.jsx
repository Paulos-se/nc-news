import { Link } from "react-router-dom";

function Error({ status, message }) {
  status = status || "404";
  return (
    <div>
      <h2>
        Code {status} : {message || "Sorry page not found"}
      </h2>
      <Link to="/">Click here to go back to Home page</Link>
    </div>
  );
}

export default Error;
