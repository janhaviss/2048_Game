import React from 'react';
import Sidebar from './Slidebar';
import Game from './Game';
import './App.css'; 

export default function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to 2048!</h1>
        <Game />
      </div>
    </div>
  );
}
