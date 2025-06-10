import React from 'react';
import Sidebar from './components/Slidebar';
import Game from './components/Game';
import './App.css'; 

export default function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to 2048!</h1>
        <h4 className="intro-text">
  Combine the numbered tiles by swiping or using your arrow keys. Reach 2048 to win — but how far can you really go?
</h4>
        <Game />
      </div>
    </div>
  );
}
