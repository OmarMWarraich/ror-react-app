import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import AppRoutes from "./components/AppRoutes";
import User from "./components/User";

function App() {
  const [currUser, setCurrUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrUser(user);
    }
  }, []);
  return (
    <>
      <Router>
        <div className="app">
          <h1>React on Rails Blog</h1>
          <User currUser={currUser} setCurrUser={setCurrUser} />
          {/* if there is a user add the navbar and approutes components */}
          {currUser && (
            <>
              <NavBar />
              <AppRoutes />
            </>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
