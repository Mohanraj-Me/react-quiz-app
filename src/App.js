import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "./Pages/Settings";
import Questions from "./Pages/Questions";
import "./Style.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Settings />} />
        <Route path="/question" element={<Questions />} />
      </Routes>
    </Router>
  );
}

export default App;
