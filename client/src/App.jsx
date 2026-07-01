import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar.jsx";
import CompanyListPage from "./pages/CompanyListPage.jsx";
import CompanyDetailPage from "./pages/CompanyDetailPage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-page">
      <Navbar />
      <Routes>
        <Route path="/" element={<CompanyListPage />} />
        <Route path="/company/:id" element={<CompanyDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
