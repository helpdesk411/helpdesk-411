import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageA from "@/pages/PageA";
import PageB from "@/pages/PageB";
import PageC from "@/pages/PageC";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageA />} />
        <Route path="/b" element={<PageB />} />
        <Route path="/c" element={<PageC />} />
      </Routes>
    </Router>
  );
}

export default App;