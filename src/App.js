import "./App.css";
import { Routes, Route, BrowserRouter, useNavigate,  } from "react-router-dom";
import { Indicators } from './components/dashboard/components/home/Indicators/Indicators'
import { Modules } from './pages/Modules'
import { Users } from './components/dashboard/components/home/Users/Users'
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute, PublicRoute } from "./components/RequireAuth";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { useEffect } from 'react';
import eventBus from "./utils/EventBus";
import { logout } from "./services/authService";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>} >
            <Route index element={<Home />} />
            <Route path='*' element={<>Not found</>} />
            <Route path='/usuarios' element={<Users />} />
            <Route path='/modulos' element={<Modules />} />
            <Route path='/indicadores' element={<Indicators />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
