import Room from "./pages/Room";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { AuthProvider } from "./utils/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import { useContext } from "react";

function App() {
  return (
    <Router>

      <AuthProvider>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Room />} />
          </Route>
        </Routes>

      </AuthProvider>

    </Router>
  );
}


export const useAuth = ()=> { return useContext(AuthProvider)}
export default App;
