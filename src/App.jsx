import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SeasonProfile from "./pages/SeasonsProfile";
import SerieDetail from "./pages/SerieDetail";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Header from "./components/common/Header";
import { useEffect, useState } from "react";
import Footer from "./components/common/Footer";
import MySeries from "./pages/MySeries";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const session = JSON.parse(window.localStorage.getItem("session"));
    if (session && session.expirationDate > Date.now()) {
      const token = session.token;
      setToken(token);
      setUser({ username: session.username });
    } else {
      setUser(null);
      setToken(null);
      window.localStorage.removeItem("session");
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <div className="">
          <header className="w-full">
            <Header user={user} setUser={setUser} setToken={setToken} />
          </header>
          <div className="">
            <Routes>
              <Route path="/" element={<Navigate to="/home"></Navigate>} />
              <Route
                path="/home"
                element={<Home user={user} token={token} />}
              />
              <Route
                path="/home/:id"
                element={<SerieDetail token={token} user={user} />}
              />
              <Route path="/:username" element={<Profile user={user} />} />
              <Route path="/myseries" element={<MySeries to="/login" />} />
              <Route
                path="/:username/:id"
                element={<SeasonProfile user={user} token={token} />}
              />
              <Route
                path="/login"
                element={<Login setUser={setUser} setToken={setToken} />}
              />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
