import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SerieDetail from "./pages/SerieDetail";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MySeries from "./pages/MySeries";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import { SeriesProvider } from "./utils/useSeries";
import Layout from "./components/common/Layout";

const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <BrowserRouter>
        <SeriesProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/home"></Navigate>} />
              <Route path="/home" element={<Home />} />
              <Route path="/home/:id" element={<SerieDetail />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/myseries" element={<MySeries />} />
                <Route path="/:username" element={<Profile />} />
              </Route>
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </SeriesProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
