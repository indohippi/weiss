import React from 'react'
import { gamePhases } from '../gameLogic/constants'
import './GameInfo.css'

const GameInfo = ({
  currentPhase,
  onPhaseChange,
  gameLog,
  gameState,
  onNextPhase,
  onEndTurn,
  availableActions,
  onActionClick,
  onSkipPhase
}) => {
  const phases = gamePhases
  
  const canSkipCurrentPhase = () => {
    return currentPhase === 'clock' || currentPhase === 'main' || currentPhase === 'climax' || currentPhase === 'attack'
  }
  
  const getSkipButtonText = () => {
    switch(currentPhase) {
      case 'clock': return 'Skip Clock (Don\'t Clock)'
      case 'main': return 'Skip Main (No Cards)'
      case 'climax': return 'Skip Climax (No Climax)'
      case 'attack': return 'End Attacks'
      default: return 'Skip Phase'
    }
  }

  const handlePhaseClick = (phase) => {
    if (onPhaseChange) {
      onPhaseChange(phase)
    }
  }

  const getPhaseDescription = (phase) => {
    const descriptions = {
      'stand': 'Stand all characters',
      'draw': 'Draw 1 card',
      'clock': 'Optionally clock a card, draw 2 if done',
      'main': 'Play characters, events, use abilities',
      'climax': 'Play climax cards',
      'attack': 'Attack with characters',
      'end': 'Hand limit check, climax removal'
    }
    return descriptions[phase] || phase
  }

  const getPhaseStatus = (phase) => {
    if (!gameState) return 'inactive'

    const currentPlayer = gameState.players.find(p => p.turn)
    if (!currentPlayer) return 'inactive'

    if (phase === currentPhase) return 'current'
    if (gameState.phaseActions[phase]?.completed) return 'completed'
    return 'pending'
  }

  return (
    <div className="game-info">
      {/* Turn Indicator */}
      <div className="turn-indicator">
        <div className="turn-number">Turn {gameState?.turnNumber || 1}</div>
        <div className="current-player">
          {gameState?.players.find(p => p.turn)?.name || 'Player'}'s Turn
        </div>
      </div>

      {/* Phase Buttons */}
      <div className="phase-buttons">
        <div className="phase-label">Phases</div>
        {phases.map((phase) => (
          <button
            key={phase}
            className={`phase-button ${getPhaseStatus(phase)}`}
            onClick={() => handlePhaseClick(phase)}
            title={getPhaseDescription(phase)}
            disabled={getPhaseStatus(phase) === 'pending'}
          >
            {phase.charAt(0).toUpperCase() + phase.slice(1)}
          </button>
        ))}
      </div>

      {/* Available Actions */}
      {availableActions.length > 0 && (
        <div className="available-actions">
          <div className="actions-header">Available Actions</div>
          <div className="action-buttons">
            {availableActions.map((action, index) => (
              <button
                key={index}
                className="action-button"
                onClick={() => onActionClick(action)}
                title={action.description}
              >
                {action.description}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Game Controls */}
      <div className="game-controls">
        <div className="control-label">
          Phase: <strong>{currentPhase.toUpperCase()}</strong>
        </div>
        <div className="control-description">
          {getPhaseDescription(currentPhase)}
        </div>
        
        {canSkipCurrentPhase() && onSkipPhase && (
          <button
            className="control-button skip-phase"
            onClick={onSkipPhase}
            title="Keyboard: S"
          >
            {getSkipButtonText()} <kbd>S</kbd>
          </button>
        )}
        
        <button
          className="control-button next-phase anime-neon-blue"
          onClick={onNextPhase}
          title="Keyboard: N"
        >
          ▶ Next Phase <kbd>N</kbd>
        </button>
        
        <button
          className="control-button end-turn anime-neon-pink"
          onClick={onEndTurn}
          title="Keyboard: E"
        >
          🔚 End Turn <kbd>E</kbd>
        </button>
      </div>

      {/* Game Log */}
      <div className="game-log">
        <div className="log-header">Game Log</div>
        <div className="log-content">
          {gameLog.length > 0 ? (
            gameLog.slice(-10).map((log, index) => (
              <div key={index} className="log-entry">
                {log}
              </div>
            ))
          ) : (
            <div className="log-entry">No game events yet.</div>
          )}
        </div>
      </div>

      {/* Player Stats */}
      <div className="player-stats">
        <div className="stats-header">Player Statistics</div>
        {gameState?.players.map(player => (
          <div key={player.id} className="player-stat">
            <div className="player-name">{player.name}</div>
            <div className="stat-details">
              <span>Level: {player.level.length}</span>
              <span>Hand: {player.hand.length}</span>
              <span>Stock: {player.stock.length}</span>
              <span>Clock: {player.clock.length}</span>
              <span>Waiting Room: {player.waitingRoom.length}</span>
              <span>Deck: {player.deck.length}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Rules Reference */}
      <div className="rules-reference">
        <div className="rules-header">Rules Reference</div>
        <div className="rules-content">
          <div className="rule-item">
            <strong>Winning Condition:</strong>
            <ul>
              <li>Opponent reaches Level 4.</li>
              <li>Opponent runs out of cards in deck and waiting room.</li>
            </ul>
          </div>
          <div className="rule-item">
            <strong>Hand Limit:</strong> 7 cards at End Phase.
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameInfo
