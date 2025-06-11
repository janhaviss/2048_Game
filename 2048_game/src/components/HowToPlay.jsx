import React from 'react';
import '../css/HowToPlay.css';
import demoVideo from '../assets/2048-demo.mp4';


const HowToPlay = () => {
  return (
    <div className="howto-container fade-in">
      <h1 className="slide-down">How to Play 2048</h1>
      <p className="intro">The goal is to reach the 2048 tile by merging numbers!</p>

      <div className="demo-wrapper">
      <video
        className="demo-video fade-in"
        src={demoVideo}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
<hr></hr>

      <div className="instructions slide-left">
        <h2>Instructions</h2>
        <ul>
          <li>Use your arrow keys (<b>↑ ↓ ← →</b>) to move the tiles.</li>
          <li>When two tiles with the same number touch, they merge into one.</li>
          <li>Each merge gives you a higher numbered tile and increases your score.</li>
          <li>Keep going until you reach the <b>2048</b> tile… or even beyond!</li>
        </ul>
      </div>

      <div className="tips slide-right">
        <h2>Tips & Tricks</h2>
        <ul>
          <li>Try to keep your highest tile in a corner.</li>
          <li>Plan ahead – don’t swipe randomly.</li>
          <li>Build from one side (left or right).</li>
          <li>Combine small tiles early to avoid gridlock.</li>
        </ul>
      </div>
    </div>
  );
};

export default HowToPlay;
