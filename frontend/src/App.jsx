import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CampaignList from "./pages/CampaignList";
import CampaignDetails from "./pages/CampaignDetails";
import EmergencyRequest from "./pages/EmergencyRequest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CampaignList />} />
        <Route path="/request-emergency" element={<EmergencyRequest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;