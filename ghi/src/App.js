import { Route, Routes, BrowserRouter as Router } from  "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AnimesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
