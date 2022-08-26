import { Link } from "react-router-dom";

function Home() {
  return (
    <section>
      <div className="home-div">
        <Link to="/articles">
          <h1 className="first-heading">
            <span id="nc">NC</span> <span id="news">NEWS</span>
          </h1>
        </Link>
      </div>

      <div className="ticker-wrapper-h">
        <div className="heading">NC NEWS</div>

        <ul className="news-ticker-h">
          <li>
            “Debugging” is like being the detective in a crime drama where you
            are also the murderer.
          </li>

          <li>
            An SQL query goes into a bar, walks up to two tables and asks: “Can
            I join you?”
          </li>

          <li>!false (It's funny because it's true.)</li>

          <li>
            How many programmers does it take to change a light bulb? None,
            that's a hardware problem
          </li>
          <li>
            When I wrote this code, only God and I understood what I did. Now
            only God knows
          </li>
          <li>
            There are two ways to write error-free programs; only the third
            works.
          </li>
          <li>
            Credits to CODE HAS BUG for the ticker css and dcsl GuideSmiths for
            the jokes
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Home;
