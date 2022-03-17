import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Indicators } from './components/dashboard/components/home/Indicators/Indicators'
import { Modules } from './pages/Modules'
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute, PublicRoute } from "./components/RequireAuth";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { ForgotPassword } from "./pages/ForgotPassword";
import { AlertProvider } from "./contexts/AlertContext";

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/recuperacion-de-cuenta/*' element={<ForgotPassword />} />
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
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
