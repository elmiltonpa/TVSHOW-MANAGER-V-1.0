import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SerieProfile from "./components/SerieProfile";
import SerieDetail from "./pages/SerieDetail";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
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
    };
    fetchUser();
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
              <Route
                path="/:username/:id"
                element={<SerieProfile user={user} token={token} />}
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
