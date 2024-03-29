import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Indicator } from './components/dashboard/components/home/Indicators/Indicator'
import { Modules } from './pages/Modules'
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute, PublicRoute, AdminRoute } from "./components/RequireAuth";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { ForgotPassword } from "./pages/ForgotPassword";
import { AlertProvider } from "./contexts/AlertContext";
import { Indicators } from "./pages/Indicators";
import { Relationship } from "./pages/Relationship";
import { MathJaxContext } from 'better-react-mathjax';
import { GeneralView } from "./components/dashboard/components/home/Indicators/GeneralView";
import Relation from "./components/dashboard/components/home/Responsables/Relation";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <BrowserRouter>
          <MathJaxContext>
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
                <Route path='/temas' element={<Modules />} />
                <Route path='/unauthorized' element={<Unauthorized />} />
                <Route path='/indicadores' element={<Indicators />} />
                <Route path='/indicadores/:id' element={<Indicator />} />
                <Route path='/indicadores/:id/general' element={<GeneralView />} />
                <Route path='/indicadores/:id/formula' element={<Indicator />} />
                <Route path='/indicadores/:id/historicos' element={<Indicator />} />
                <Route element={<AdminRoute />}>
                  <Route path='/usuarios' element={<Users />} />
                  <Route path='/autorizacion' element={<Relationship />} />
                  <Route path='/autorizacion/indicador/:id' element={<Relation />} />
                </Route>
              </Route>
            </Routes>
          </MathJaxContext>
        </BrowserRouter>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
