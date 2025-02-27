import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
import Dialogs from "./components/Dialogs";
import Navigation from "./components/Navigation";
import "./App.css";
import DialogDetail from "./components/DialogDetail";

const App = () => {
  return (
      <Router>
        <div className="app-container">
          <Navigation />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/dialogs" element={<Dialogs />} />
              <Route path="/dialogs/:id" element={<DialogDetail />} />

            </Routes>
          </div>
        </div>
      </Router>
  );
};

export default App;