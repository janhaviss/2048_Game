import React from 'react';
import '../css/Settings.css';

export default function Settings({ tileTheme, setTileTheme, resetHighScore, hardMode, setHardMode }) {
  return (
    <div className="settings-container">
      <div className="settings-card">
        <h3>Change Game Color Theme:</h3>
        <div className="theme-circles">
          <button className="theme-btn green" onClick={() => setTileTheme('green')} />
          <button className="theme-btn pink" onClick={() => setTileTheme('pink')} />
          <button className="theme-btn blue" onClick={() => setTileTheme('blue')} />
        </div>
      </div>

      <div className="settings-card">
        <h3>Reset High Score:</h3>
        <button className="resetbtn" onClick={resetHighScore}>Reset High Score</button>
      </div>

      <div className="settings-card">
      <h3>Change Game Mode:</h3>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={hardMode}
          onChange={() => setHardMode(prev => !prev)}
        />
        <span className="slider"></span>
      </label>
      <p className="mode-label">{hardMode ? 'Hard Mode ON' : 'Normal Mode'}</p>
    </div>


    <div className="settings-card">
      Sound
    </div>



    </div>
  );
}
