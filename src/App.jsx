import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DesignEstimationForm from "./components/form.jsx";
import EstimationResults from "./components/EstimationResults.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DesignEstimationForm />} />
        <Route path="/estimations" element={<EstimationResults />} />
      </Routes>
    </Router>
  );
}

export default App;