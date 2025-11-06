import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api";
import io from "socket.io-client";
import "../styles.css";

const socket = io(import.meta.env.VITE_SOCKET_URL);

export default function PollPage() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    socket.emit("join-poll", id);
    axios.get(`/polls/${id}`).then((res) => setPoll(res.data));

    socket.on("poll-updated", (updatedPoll) => {
      if (updatedPoll.shortId === id) setPoll(updatedPoll);
    });

    return () => socket.off("poll-updated");
  }, [id]);

  const handleVote = async (index) => {
    await axios.post(`/polls/${id}/vote`, { optionIndex: index });
  };

  if (!poll) return <p>Loading poll...</p>;

  return (
    <div className="container">
      <h2>{poll.question}</h2>
      {poll.options.map((opt, i) => (
        <button key={i} onClick={() => handleVote(i)}>
          {opt.text} ({opt.votes})
        </button>
      ))}
    </div>
  );
}
