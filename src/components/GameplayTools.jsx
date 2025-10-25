import React, { useState } from 'react'
import './GameplayTools.css'

const GameplayTools = ({ onBack }) => {
  const [player1Life, setPlayer1Life] = useState(7)
  const [player2Life, setPlayer2Life] = useState(7)
  const [currentPhase, setCurrentPhase] = useState('stand')
  const [turnNumber, setTurnNumber] = useState(1)
  const [currentPlayer, setCurrentPlayer] = useState(1)

  const phases = [
    { id: 'stand', name: 'Stand Phase', description: 'Stand all characters' },
    { id: 'draw', name: 'Draw Phase', description: 'Draw 1 card' },
    { id: 'clock', name: 'Clock Phase', description: 'Optionally clock a card' },
    { id: 'main', name: 'Main Phase', description: 'Play cards and use abilities' },
    { id: 'climax', name: 'Climax Phase', description: 'Play climax cards' },
    { id: 'attack', name: 'Attack Phase', description: 'Attack with characters' },
    { id: 'end', name: 'End Phase', description: 'End turn cleanup' }
  ]

  const nextPhase = () => {
    const currentIndex = phases.findIndex(p => p.id === currentPhase)
    if (currentIndex < phases.length - 1) {
      setCurrentPhase(phases[currentIndex + 1].id)
    } else {
      // End of turn
      setCurrentPhase('stand')
      setTurnNumber(prev => prev + 1)
      setCurrentPlayer(prev => prev === 1 ? 2 : 1)
    }
  }

  const resetGame = () => {
    setPlayer1Life(7)
    setPlayer2Life(7)
    setCurrentPhase('stand')
    setTurnNumber(1)
    setCurrentPlayer(1)
  }

  const adjustLife = (player, amount) => {
    if (player === 1) {
      setPlayer1Life(prev => Math.max(0, Math.min(7, prev + amount)))
    } else {
      setPlayer2Life(prev => Math.max(0, Math.min(7, prev + amount)))
    }
  }

  return (
    <div className="gameplay-tools retro-tactical">
      <div className="tactical-header-bar">
        <div className="system-info">
          <div className="system-status">
            <span className="tactical-status online">TACTICAL HUD ACTIVE</span>
            <span className="system-time">{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="mission-title">
            <h1>WEISS SCHWARZ TACTICAL HUD</h1>
            <p>MISSION SUPPORT PROTOCOL - GAMEPLAY TOOLS</p>
          </div>
        </div>
      </div>

      <div className="tactical-interface">
        <div className="tactical-grid tactical-grid-2">
          {/* Life Counter */}
          <div className="tactical-panel life-counter">
            <h2 className="tactical-header">LIFE MONITOR</h2>
            <div className="life-display">
              <div className="player-life">
                <h4>OPERATOR 1</h4>
                <div className="life-controls">
                  <button onClick={() => adjustLife(1, -1)} className="tactical-btn danger">-</button>
                  <span className="life-value">{player1Life}</span>
                  <button onClick={() => adjustLife(1, 1)} className="tactical-btn primary">+</button>
                </div>
              </div>
              <div className="player-life">
                <h4>OPERATOR 2</h4>
                <div className="life-controls">
                  <button onClick={() => adjustLife(2, -1)} className="tactical-btn danger">-</button>
                  <span className="life-value">{player2Life}</span>
                  <button onClick={() => adjustLife(2, 1)} className="tactical-btn primary">+</button>
                </div>
              </div>
            </div>
            <button onClick={resetGame} className="tactical-btn danger">
              🔄 RESET MISSION
            </button>
          </div>

          {/* Phase Tracker */}
          <div className="tactical-panel phase-tracker">
            <h2 className="tactical-header">MISSION PHASES</h2>
            <div className="current-phase">
              <h4>CURRENT PHASE: {phases.find(p => p.id === currentPhase)?.name.toUpperCase()}</h4>
              <p>{phases.find(p => p.id === currentPhase)?.description}</p>
            </div>
            <div className="phase-controls">
              <button onClick={nextPhase} className="tactical-btn primary">
                NEXT PHASE →
              </button>
            </div>
            <div className="game-info">
              <div className="status-item">
                <span className="status-label">TURN:</span>
                <span className="status-value">{turnNumber}</span>
              </div>
              <div className="status-item">
                <span className="status-label">ACTIVE OPERATOR:</span>
                <span className="status-value">OPERATOR {currentPlayer}</span>
              </div>
            </div>
          </div>

          {/* Phase Reference */}
          <div className="tactical-panel phase-reference">
            <h2 className="tactical-header">PHASE PROTOCOL</h2>
            <div className="phases-list">
              {phases.map((phase, index) => (
                <div 
                  key={phase.id} 
                  className={`phase-item ${currentPhase === phase.id ? 'active' : ''}`}
                >
                  <span className="phase-number">{index + 1}</span>
                  <div className="phase-details">
                    <strong>{phase.name.toUpperCase()}</strong>
                    <p>{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Reference */}
          <div className="tactical-panel quick-reference">
            <h2 className="tactical-header">TACTICAL REFERENCE</h2>
            <div className="reference-items">
              <div className="ref-item">
                <span className="ref-label">DECK SIZE:</span>
                <span className="ref-value">50 CARDS</span>
              </div>
              <div className="ref-item">
                <span className="ref-label">STARTING HAND:</span>
                <span className="ref-value">5 CARDS</span>
              </div>
              <div className="ref-item">
                <span className="ref-label">DRAW PHASE:</span>
                <span className="ref-value">DRAW 1 CARD</span>
              </div>
              <div className="ref-item">
                <span className="ref-label">LEVEL 0:</span>
                <span className="ref-value">0-6 CARDS</span>
              </div>
              <div className="ref-item">
                <span className="ref-label">LEVEL 1:</span>
                <span className="ref-value">7-12 CARDS</span>
              </div>
              <div className="ref-item">
                <span className="ref-label">LEVEL 2:</span>
                <span className="ref-value">13-18 CARDS</span>
              </div>
              <div className="ref-item">
                <span className="ref-label">LEVEL 3:</span>
                <span className="ref-value">19+ CARDS</span>
              </div>
              <div className="ref-item">
                <span className="ref-label">CLIMAX LIMIT:</span>
                <span className="ref-value">8 CARDS MAX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Footer */}
        <div className="tactical-footer">
          <button onClick={onBack} className="tactical-btn secondary">
            ← RETURN TO COMMAND
          </button>
          <div className="footer-info">
            <span>TACTICAL HUD ACTIVE</span>
            <span>MISSION SUPPORT PROTOCOL</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameplayTools
