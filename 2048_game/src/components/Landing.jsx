import React from 'react';
import '../css/Landing.css'; // optional, or you can reuse App.css

export default function Landing({ onStart }) {
  return (
    <div className="landing-screen">
      <h1 className="landing-title">Welcome to 2048!</h1>
      <p className="landing-intro">
        Combine the numbered tiles by swiping or using your arrow keys.
        Reach 2048 to win — but how far can you really go?
      </p>
      <button className="play-button" onClick={onStart}>
        Play
      </button>
    </div>
  );
}
