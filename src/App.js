import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import Articles from "./components/Articles";
import Navigation from "./components/Navigation";
import Topic from "./components/Topic";
import Error from "./components/Error";
import SingleArticle from "./components/SingleArticle";
import Users from "./components/Users";
import { UserContext } from "./components/User";

import "./App.css";

import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  // const [user, setUser] = useState({
  //   username: "tickle122",
  //   name: "Tom Tickle",
  //   avatar_url:
  //     "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  // });

  let initialUser = {
    username: "",
    name: "",
    avatar_url: "",
  };
  const userData = window.localStorage.getItem("user");
  if (userData) {
    initialUser = JSON.parse(userData);
  }

  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    // storing input name
    window.localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header />
          <Navigation />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/articles" element={<Articles />} />
            <Route path={`/topics/:single_topic`} element={<Topic />} />
            <Route path={"/articles/:article_id"} element={<SingleArticle />} />
            <Route path={"*"} element={<Error />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
