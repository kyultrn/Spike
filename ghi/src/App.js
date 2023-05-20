import { Route, Routes, BrowserRouter as Router } from  "react-router-dom";
import Home from "./pages/Home";
import AnimesPage from "./pages/AnimesPage";
import DetailsPage from "./pages/DetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animes" element={<AnimesPage />} />
        <Route path="/animes/:animeId" element={<DetailsPage anime={false}/>} />
      </Routes>
    </Router>
  );
}

export default App;
