import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PredictorPage from "./pages/PredictorPage";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/predict" element={<PredictorPage />} />
      </Routes>
    </BrowserRouter>
  );
}