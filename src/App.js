import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Indicator } from './components/dashboard/components/home/Indicators/Indicator'
import { Modules } from './pages/Modules'
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute, PublicRoute } from "./components/RequireAuth";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { ForgotPassword } from "./pages/ForgotPassword";
import { AlertProvider } from "./contexts/AlertContext";
import { Indicators } from "./pages/Indicators";
import { Relationship } from "./pages/Relationship";
import { MyComponents } from "./pages/MyComponents";
import { Profile } from "./pages/Profile";

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
              <Route path='/indicadores/:id' element={<Indicator />} />
              <Route path='/autorizacion' element={<Relationship />} />
              <Route path='/myComponents' element={<MyComponents />} />
            </Route>
            <Route
              path='/profile'
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            >
            </Route>
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
