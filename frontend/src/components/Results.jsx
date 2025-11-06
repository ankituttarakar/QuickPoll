import React from "react";

export default function Results({ poll }) {
  return (
    <div>
      <h3>Results</h3>
      {poll.options.map((opt, i) => (
        <p key={i}>
          {opt.text}: {opt.votes} votes
        </p>
      ))}
    </div>
  );
}
