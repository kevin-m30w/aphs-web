import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login.page";
import ProtectedRoute from "./components/protected-route";
import AddDevicePage from "./pages/add-device.page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/add-device" element={<AddDevicePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
