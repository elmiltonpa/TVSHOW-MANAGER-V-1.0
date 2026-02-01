import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SeasonProfile from "./pages/ProfileSerieDetail";
import SerieDetail from "./pages/SerieDetail";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import MySeries from "./pages/MySeries";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import { Toaster } from "react-hot-toast";

const App = () => {
  // ¡Adiós estado, adiós useEffect! Todo eso vive en AuthContext ahora.

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff"
          }
        }}
      />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="">
          <header className="w-full">
            <Header />
          </header>
          <div className="">
            <Routes>
              <Route path="/" element={<Navigate to="/home"></Navigate>} />
              <Route path="/home" element={<Home />} />
              <Route path="/home/:id" element={<SerieDetail />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/myseries" element={<MySeries />} />
                <Route path="/:username" element={<Profile />} />
              </Route>

              <Route path="/:username/:id" element={<SeasonProfile />} />

              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
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
