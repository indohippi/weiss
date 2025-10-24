import React from 'react'
import { gamePhases } from '../gameLogic/constants'
import './CenterArea.css'

const CenterArea = ({
  currentPhase,
  gameState,
  currentPlayer,
  opponentPlayer,
  availableActions,
  onActionClick
}) => {
  const getPhaseDescription = (phase) => {
    const descriptions = {
      'stand': 'Stand all characters to prepare for the turn',
      'draw': 'Draw 1 card from your deck',
      'clock': 'Choose to clock a card (draw 2) or skip',
      'main': 'Play characters, events, and use abilities',
      'climax': 'Play climax cards for powerful effects',
      'attack': 'Attack with your characters to deal damage',
      'end': 'Clean up and end your turn'
    }
    return descriptions[phase] || 'Unknown phase'
  }

  const getPhaseInstructions = (phase) => {
    const instructions = {
      'stand': 'All characters automatically stand up',
      'draw': 'Automatically draw 1 card',
      'clock': 'Click a card in your hand to clock it, or click "Skip"',
      'main': 'Click cards in your hand to play them to the stage',
      'climax': 'Click climax cards to play them for powerful effects',
      'attack': 'Click standing characters to attack with them',
      'end': 'Turn automatically ends after cleanup'
    }
    return instructions[phase] || ''
  }

  const handlePhaseClick = (phase) => {
    onActionClick({ type: 'phase', phase })
  }

  return (
    <div className="center-area">
      {/* Turn Indicator */}
      <div className="turn-indicator">
        <div className="turn-number">Turn {gameState?.turnNumber || 1}</div>
        <div className="current-player">
          {currentPlayer?.name || 'Unknown'}'s Turn
        </div>
      </div>

      {/* Phase Information */}
      <div className="phase-info">
        <div className="phase-name">{currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)} Phase</div>
        <div className="phase-description">{getPhaseDescription(currentPhase)}</div>
        <div className="phase-instructions">{getPhaseInstructions(currentPhase)}</div>
      </div>

      {/* Available Actions */}
      {availableActions.length > 0 && (
        <div className="center-actions">
          <div className="actions-header">Available Actions</div>
          <div className="action-grid">
            {availableActions.map((action, index) => (
              <button
                key={index}
                className="center-action-button"
                onClick={() => onActionClick(action)}
                title={action.description}
              >
                {action.description}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Battle Area */}
      {gameState?.attackPhase?.isActive && (
        <div className="battle-area active">
          <div className="battle-label">⚔️ BATTLE IN PROGRESS</div>
          <div className="battle-info">
            <div className="battle-attacker">
              <div className="battle-role">ATTACKER</div>
              <div className="battle-card-name">{gameState.attackPhase.attackingCharacter?.name}</div>
              <div className="battle-stats">
                Power: {gameState.attackPhase.attackingCharacter?.power || 0} | 
                Soul: {gameState.attackPhase.currentSoul || 0}
              </div>
            </div>
            
            <div className="battle-vs">VS</div>
            
            {gameState.attackPhase.defendingCharacter ? (
              <div className="battle-defender">
                <div className="battle-role">DEFENDER</div>
                <div className="battle-card-name">{gameState.attackPhase.defendingCharacter.name}</div>
                <div className="battle-stats">
                  Power: {gameState.attackPhase.defendingCharacter.power || 0}
                </div>
              </div>
            ) : (
              <div className="battle-defender">
                <div className="battle-role">NO DEFENDER</div>
                <div className="battle-card-name">Direct Attack!</div>
                <div className="battle-stats">+1 Soul</div>
              </div>
            )}
          </div>
          
          {gameState.attackPhase.triggerCard && (
            <div className="trigger-reveal">
              <div className="trigger-label">Trigger Revealed:</div>
              <div className="trigger-card-info">
                {gameState.attackPhase.triggerCard.name}
                {gameState.attackPhase.triggerCard.trigger && (
                  <span className="trigger-icon"> ✨ {gameState.attackPhase.triggerCard.trigger.toUpperCase()}</span>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Game Status */}
      <div className="game-status">
        <div className="status-item">
          <span className="status-label">Player 1 Level:</span>
          <span className="status-value">{gameState?.players[0]?.level?.length || 0}</span>
        </div>
        <div className="status-item">
          <span className="status-label">Player 2 Level:</span>
          <span className="status-value">{gameState?.players[1]?.level?.length || 0}</span>
        </div>
        <div className="status-item">
          <span className="status-label">Player 1 Hand:</span>
          <span className="status-value">{gameState?.players[0]?.hand?.length || 0}</span>
        </div>
        <div className="status-item">
          <span className="status-label">Player 2 Hand:</span>
          <span className="status-value">{gameState?.players[1]?.hand?.length || 0}</span>
        </div>
      </div>

      {/* Quick Phase Navigation */}
      <div className="quick-phases">
        <div className="quick-phases-label">Quick Phase Navigation</div>
        <div className="quick-phase-buttons">
          {gamePhases.map((phase) => (
            <button
              key={phase}
              className={`quick-phase-button ${currentPhase === phase ? 'active' : ''}`}
              onClick={() => handlePhaseClick(phase)}
              title={getPhaseDescription(phase)}
            >
              {phase.charAt(0).toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CenterArea
