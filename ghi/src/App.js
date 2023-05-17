import { Route, Routes, BrowserRouter as Router } from  "react-router-dom";
import Home from "./pages/Home";
import AnimesPage from "./pages/AnimesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animes" element={<AnimesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
