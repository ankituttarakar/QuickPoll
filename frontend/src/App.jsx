import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePoll from "./components/CreatePoll";
import PollPage from "./components/PollPage";
import { BarChart3 } from "lucide-react"; // small chart icon

function App() {
  return (
    <div>
      <header>
        <h1>
          <BarChart3 size={26} color="#2563eb" />
          QuickPoll
        </h1>
        <p>Create polls and see results update in real-time</p>
      </header>

      {/* Router section wrapped correctly */}
      <Router>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
          }}
        >
          <Routes>
            <Route path="/" element={<CreatePoll />} />
            <Route path="/poll/:id" element={<PollPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
