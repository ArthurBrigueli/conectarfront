import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AuthLayout from "../layouts/AuthLayout";
import CreateAccount from "../pages/CreatedAccount";
import ProtectedRoute from "./ProtectedRoute";
import OauthSuccess from "../pages/OauthSuccess";
import Usuarios from "../pages/Usuarios";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import AccessDenied from "../pages/AccessDenied";

export default function AppRoutes() {
  return (
    <Routes>


      <Route path="/403" element={<AccessDenied />} />
      
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Home />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/usuarios"
        element={
          <PrivateRoute requiredRole="admin">
            <ProtectedRoute>
              <MainLayout>
                <Usuarios />
              </MainLayout>
            </ProtectedRoute>
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><CreateAccount /></AuthLayout>} />
      <Route path="/oauth-success" element={<OauthSuccess />} />
    </Routes>
  );
}
