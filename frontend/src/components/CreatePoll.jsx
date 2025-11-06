import React, { useState } from "react";
import axios from "../api";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import api from "../api"; 

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const handleOptionChange = (i, value) => {
    const newOptions = [...options];
    newOptions[i] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/polls", { question, options });      navigate(`/poll/${res.data.pollId}`);
    } catch (err) {
      alert("Error creating poll");
    }
  };

  return (
    <div className="container">
      <h2>Create a New Poll</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(i, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={addOption}>
          + Add Option
        </button>
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
}
