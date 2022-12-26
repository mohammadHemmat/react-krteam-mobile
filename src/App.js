import "./App.css";
import Login from "./pages/login";
import Validation from "./pages/validation";
import Enter from "./pages/enter";
import Traffic from "./pages/traffic";
import Requests from "./pages/requests";
import Profile from "./pages/profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'mapbox-gl/dist/mapbox-gl.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="validation" element={<Validation />} />
        <Route path="Enter" element={<Enter />} />
        <Route path="Traffic" element={<Traffic />} />
        <Route path="Requests" element={<Requests />} />
        <Route path="Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
