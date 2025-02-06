import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ValentinePage from "./components/ValentinePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/valentine/:id" element={<ValentinePage />} />

        {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;
