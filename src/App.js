import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import Topic from "./components/Topic";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/topics/:single_topic`} element={<Topic />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
