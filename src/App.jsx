import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SerieProfile from "./components/SerieProfile";
import SerieDetail from "./pages/SerieDetail";
import Register from "./pages/Register";
import SearchSerie from "./pages/SearchSerie";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
                element={<SearchSerie user={user} token={token} />}
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
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
