import LoginPage from "./Pages/Login/LoginPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import PrivateRouter from "./utils/PrivateRouter";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRouter/>}>
              <Route path="/" element={<DashboardPage />} exact />
              <Route path='*' element={<NotFound/>} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </Router>

    </>
  );
}

export default App;
