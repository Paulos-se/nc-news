import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Header from "./components/Header";
import Articles from "./components/Articles";
import Navigation from "./components/Navigation";
import Topic from "./components/Topic";
import Error from "./components/Error";

import { UserContext } from "./components/User";

import "./App.css";
import SingleArticle from "./components/SingleArticle";

import { useState } from "react";

function App() {
  const [user, setUser] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
  });

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header />
          <Navigation />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"*"} element={<Error />} />
            <Route path="/articles" element={<Articles />} />
            <Route path={`/topics/:single_topic`} element={<Topic />} />
            <Route path={"/articles/:article_id"} element={<SingleArticle />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
