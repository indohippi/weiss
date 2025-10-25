import React from 'react'
import './SimpleGameInfo.css'

const SimpleGameInfo = ({
  currentPhase,
  gameLog = [],
  onBack
}) => {
  return (
    <div className="simple-game-info">
      <div className="info-header">
        <h3>Game Info</h3>
        <button onClick={onBack} className="back-button">
          ← Back to Menu
        </button>
      </div>
      
      <div className="phase-info">
        <h4>Current Phase: {currentPhase}</h4>
      </div>
      
      <div className="game-log">
        <h4>Game Log</h4>
        <div className="log-entries">
          {gameLog.map((entry, index) => (
            <div key={index} className="log-entry">
              {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SimpleGameInfo
