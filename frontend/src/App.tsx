import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import ResumeBuilder from "./components/ResumeBuilder/ResumeBuilder";
import Home from "./pages/Home/Home";
import Templates from "./pages/Templates/Templates";

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<ResumeBuilder />} />
            <Route path="/templates" element={<Templates />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
