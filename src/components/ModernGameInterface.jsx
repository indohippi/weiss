import React, { useState, useEffect } from 'react'
import './ModernGameInterface.css'

const ModernGameInterface = ({ 
  gameState, 
  currentPhase, 
  onCardSelect, 
  onCardAction,
  selectedCard,
  availableActions,
  onActionClick,
  onNextPhase,
  onEndTurn,
  onSkipPhase
}) => {
  const [showCardPreview, setShowCardPreview] = useState(null)
  const [animations, setAnimations] = useState({})
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Sound effects (placeholder for now)
  const playSound = (soundType) => {
    if (!soundEnabled) return
    // Future: Implement actual sound effects
    console.log(`🔊 Playing sound: ${soundType}`)
  }

  // Animation effects
  const triggerAnimation = (type, target) => {
    setAnimations(prev => ({
      ...prev,
      [`${type}-${target}`]: Date.now()
    }))
  }

  if (!gameState) {
    return (
      <div className="modern-interface">
        <div className="loading-overlay">
          <div className="loading-animation">
            <div className="loading-card"></div>
            <div className="loading-text">Loading Game...</div>
          </div>
        </div>
      </div>
    )
  }

  const allPlayers = gameState.players || []
  const currentPlayer = allPlayers.find(p => p.turn) || allPlayers[0]
  const opponentPlayer = allPlayers.find(p => !p.turn) || allPlayers[1]

  const handleCardClick = (card, location, position = null) => {
    playSound('card-click')
    
    if (currentPhase === 'clock') {
      onCardAction('clock', card, location)
      triggerAnimation('clock', card.id)
    } else if (location === 'hand') {
      onCardSelect(card, location)
      triggerAnimation('select', card.id)
    } else if (location === 'stage' && position !== null) {
      if (selectedCard?.location === 'hand') {
        onCardAction('play', selectedCard.card, 'hand', position)
        triggerAnimation('play', selectedCard.card.id)
      } else {
        onCardAction('attack', card, 'stage')
        triggerAnimation('attack', card.id)
      }
    }
  }

  const getCardState = (card, location) => {
    if (selectedCard?.card?.id === card.id) return 'selected'
    if (currentPhase === 'clock' && location === 'hand') return 'clockable'
    if (currentPhase === 'attack' && location === 'stage' && card.state === 'stand') return 'attackable'
    return 'normal'
  }

  const getPhaseColor = (phase) => {
    const colors = {
      stand: '#10b981',
      draw: '#3b82f6', 
      clock: '#f59e0b',
      main: '#8b5cf6',
      climax: '#ec4899',
      attack: '#ef4444',
      end: '#6b7280'
    }
    return colors[phase] || '#6b7280'
  }

  return (
    <div className="modern-interface">
      {/* TOP BAR - Game Status */}
      <div className="top-bar">
        <div className="game-status">
          <div className="turn-indicator">
            <div className="turn-number">Turn {gameState.turnNumber || 1}</div>
            <div className="current-player">{currentPlayer.name}</div>
          </div>
          <div className="phase-indicator" style={{ backgroundColor: getPhaseColor(currentPhase) }}>
            <div className="phase-name">{currentPhase.toUpperCase()}</div>
            <div className="phase-progress">
              {Object.entries(gameState.phaseActions || {}).map(([phase, action]) => (
                <div 
                  key={phase}
                  className={`phase-dot ${action.completed ? 'completed' : ''} ${phase === currentPhase ? 'current' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="game-controls">
          <button 
            className="control-btn sound-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          <button className="control-btn settings-btn">⚙️</button>
        </div>
      </div>

      {/* OPPONENT AREA */}
      <div className="opponent-section">
        <div className="opponent-header">
          <div className="opponent-info">
            <div className="opponent-name">{opponentPlayer.name}</div>
            <div className="opponent-stats">
              <div className="stat-item">
                <span className="stat-label">Deck</span>
                <span className="stat-value">{opponentPlayer.deck?.length || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Hand</span>
                <span className="stat-value">{opponentPlayer.hand?.length || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Level</span>
                <span className="stat-value">{opponentPlayer.level?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Opponent Stage */}
        <div className="opponent-stage">
          <div className="stage-row back-row">
            {opponentPlayer.stage?.slice(0, 2).map((card, index) => (
              <div
                key={`opp-back-${index}`}
                className={`stage-slot back-slot ${card ? 'occupied' : 'empty'}`}
              >
                {card ? (
                  <div 
                    className={`card-container ${getCardState(card, 'stage')}`}
                    onClick={() => handleCardClick(card, 'stage', index)}
                    onMouseEnter={() => setShowCardPreview(card)}
                    onMouseLeave={() => setShowCardPreview(null)}
                  >
                    <div className="card modern-card">
                      <div className="card-header">
                        <span className="level">L{card.level}</span>
                        <span className="cost">C{card.cost}</span>
                      </div>
                      <div className="card-name">{card.name}</div>
                      <div className="card-stats">
                        <span className="power">{card.power}</span>
                        <span className="soul">{card.soul}</span>
                      </div>
                      <div className="card-type">{card.type}</div>
                    </div>
                  </div>
                ) : (
                  <div className="empty-slot">B{index + 1}</div>
                )}
              </div>
            ))}
          </div>
          <div className="stage-row front-row">
            {opponentPlayer.stage?.slice(2, 5).map((card, index) => (
              <div
                key={`opp-front-${index}`}
                className={`stage-slot front-slot ${card ? 'occupied' : 'empty'}`}
              >
                {card ? (
                  <div 
                    className={`card-container ${getCardState(card, 'stage')}`}
                    onClick={() => handleCardClick(card, 'stage', index + 2)}
                    onMouseEnter={() => setShowCardPreview(card)}
                    onMouseLeave={() => setShowCardPreview(null)}
                  >
                    <div className="card modern-card">
                      <div className="card-header">
                        <span className="level">L{card.level}</span>
                        <span className="cost">C{card.cost}</span>
                      </div>
                      <div className="card-name">{card.name}</div>
                      <div className="card-stats">
                        <span className="power">{card.power}</span>
                        <span className="soul">{card.soul}</span>
                      </div>
                      <div className="card-type">{card.type}</div>
                    </div>
                  </div>
                ) : (
                  <div className="empty-slot">F{index + 1}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Opponent Zones */}
        <div className="opponent-zones">
          <div className="zone clock-zone">
            <div className="zone-icon">⏰</div>
            <div className="zone-label">Clock</div>
            <div className="zone-value">{opponentPlayer.clock?.length || 0}</div>
          </div>
          <div className="zone level-zone">
            <div className="zone-icon">⭐</div>
            <div className="zone-label">Level</div>
            <div className="zone-value">{opponentPlayer.level?.length || 0}</div>
          </div>
          <div className="zone climax-zone">
            <div className="zone-icon">💫</div>
            <div className="zone-label">Climax</div>
            <div className="zone-value">{opponentPlayer.climaxArea ? '1' : '0'}</div>
          </div>
        </div>
      </div>

      {/* CENTER AREA - Battle Zone */}
      <div className="center-section">
        <div className="battle-zone">
          <div className="phase-display">
            <div className="phase-title" style={{ color: getPhaseColor(currentPhase) }}>
              {currentPhase.toUpperCase()} PHASE
            </div>
            <div className="phase-description">
              {currentPhase === 'stand' && 'All characters stand up and prepare for battle'}
              {currentPhase === 'draw' && 'Draw 1 card from your deck'}
              {currentPhase === 'clock' && 'Clock a card from your hand to gain stock'}
              {currentPhase === 'main' && 'Play cards and use abilities'}
              {currentPhase === 'climax' && 'Play climax cards for powerful effects'}
              {currentPhase === 'attack' && 'Attack with your characters'}
              {currentPhase === 'end' && 'End your turn and prepare for opponent'}
            </div>
          </div>
          
          {gameState.attackPhase?.isActive && (
            <div className="battle-display">
              <div className="battle-info">
                <div className="attacker">
                  <div className="battle-label">Attacker</div>
                  <div className="battle-card">{gameState.attackPhase.attackingCharacter?.name}</div>
                </div>
                <div className="vs">VS</div>
                <div className="defender">
                  <div className="battle-label">Defender</div>
                  <div className="battle-card">{gameState.attackPhase.defendingCharacter?.name || 'Direct Attack'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CURRENT PLAYER AREA */}
      <div className="current-player-section">
        {/* Current Player Zones */}
        <div className="current-zones">
          <div className="zone deck-zone">
            <div className="zone-icon">📚</div>
            <div className="zone-label">Deck</div>
            <div className="zone-value">{currentPlayer.deck?.length || 0}</div>
          </div>
          <div className="zone stock-zone">
            <div className="zone-icon">💰</div>
            <div className="zone-label">Stock</div>
            <div className="zone-value">{currentPlayer.stock?.length || 0}</div>
          </div>
          <div className="zone waiting-zone">
            <div className="zone-icon">⏳</div>
            <div className="zone-label">Waiting</div>
            <div className="zone-value">{currentPlayer.waitingRoom?.length || 0}</div>
          </div>
        </div>

        {/* Current Player Stage */}
        <div className="current-stage">
          <div className="stage-row back-row">
            {currentPlayer.stage?.slice(0, 2).map((card, index) => (
              <div
                key={`current-back-${index}`}
                className={`stage-slot back-slot ${card ? 'occupied' : 'empty'} ${!card && selectedCard?.location === 'hand' ? 'can-place' : ''}`}
                onClick={() => !card && selectedCard?.location === 'hand' && handleCardClick(null, 'stage', index)}
              >
                {card ? (
                  <div 
                    className={`card-container ${getCardState(card, 'stage')}`}
                    onClick={() => handleCardClick(card, 'stage', index)}
                    onMouseEnter={() => setShowCardPreview(card)}
                    onMouseLeave={() => setShowCardPreview(null)}
                  >
                    <div className="card modern-card">
                      <div className="card-header">
                        <span className="level">L{card.level}</span>
                        <span className="cost">C{card.cost}</span>
                      </div>
                      <div className="card-name">{card.name}</div>
                      <div className="card-stats">
                        <span className="power">{card.power}</span>
                        <span className="soul">{card.soul}</span>
                      </div>
                      <div className="card-type">{card.type}</div>
                    </div>
                  </div>
                ) : (
                  <div className="empty-slot can-place">B{index + 1}</div>
                )}
              </div>
            ))}
          </div>
          <div className="stage-row front-row">
            {currentPlayer.stage?.slice(2, 5).map((card, index) => (
              <div
                key={`current-front-${index}`}
                className={`stage-slot front-slot ${card ? 'occupied' : 'empty'} ${!card && selectedCard?.location === 'hand' ? 'can-place' : ''}`}
                onClick={() => !card && selectedCard?.location === 'hand' && handleCardClick(null, 'stage', index + 2)}
              >
                {card ? (
                  <div 
                    className={`card-container ${getCardState(card, 'stage')}`}
                    onClick={() => handleCardClick(card, 'stage', index + 2)}
                    onMouseEnter={() => setShowCardPreview(card)}
                    onMouseLeave={() => setShowCardPreview(null)}
                  >
                    <div className="card modern-card">
                      <div className="card-header">
                        <span className="level">L{card.level}</span>
                        <span className="cost">C{card.cost}</span>
                      </div>
                      <div className="card-name">{card.name}</div>
                      <div className="card-stats">
                        <span className="power">{card.power}</span>
                        <span className="soul">{card.soul}</span>
                      </div>
                      <div className="card-type">{card.type}</div>
                    </div>
                  </div>
                ) : (
                  <div className="empty-slot can-place">F{index + 1}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Player Hand */}
        <div className="hand-section">
          <div className="hand-header">
            <div className="hand-title">Your Hand</div>
            <div className="hand-count">({currentPlayer.hand?.length || 0}/7)</div>
          </div>
          <div className="hand-cards">
            {currentPlayer.hand?.map((card, index) => (
              <div
                key={`hand-${card.id}-${index}`}
                className={`hand-card ${getCardState(card, 'hand')}`}
                onClick={() => handleCardClick(card, 'hand')}
                onMouseEnter={() => setShowCardPreview(card)}
                onMouseLeave={() => setShowCardPreview(null)}
              >
                <div className="card modern-card">
                  <div className="card-header">
                    <span className="level">L{card.level}</span>
                    <span className="cost">C{card.cost}</span>
                  </div>
                  <div className="card-name">{card.name}</div>
                  <div className="card-stats">
                    <span className="power">{card.power}</span>
                    <span className="soul">{card.soul}</span>
                  </div>
                  <div className="card-type">{card.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM BAR - Actions */}
      <div className="bottom-bar">
        <div className="action-buttons">
          {availableActions.map((action, index) => (
            <button
              key={index}
              className={`action-btn ${action.type}`}
              onClick={() => onActionClick(action.type)}
              disabled={!action.available}
            >
              <span className="action-icon">{action.icon}</span>
              <span className="action-text">{action.text}</span>
            </button>
          ))}
        </div>
        
        <div className="phase-controls">
          <button 
            className="phase-btn next-phase"
            onClick={onNextPhase}
          >
            Next Phase
          </button>
          <button 
            className="phase-btn end-turn"
            onClick={onEndTurn}
          >
            End Turn
          </button>
          <button 
            className="phase-btn skip-phase"
            onClick={onSkipPhase}
          >
            Skip Phase
          </button>
        </div>
      </div>

      {/* Card Preview Modal */}
      {showCardPreview && (
        <div className="card-preview-modal">
          <div className="preview-card">
            <div className="preview-header">
              <span className="preview-level">L{showCardPreview.level}</span>
              <span className="preview-cost">C{showCardPreview.cost}</span>
            </div>
            <div className="preview-name">{showCardPreview.name}</div>
            <div className="preview-stats">
              <span className="preview-power">{showCardPreview.power}</span>
              <span className="preview-soul">{showCardPreview.soul}</span>
            </div>
            <div className="preview-type">{showCardPreview.type}</div>
            {showCardPreview.ability && (
              <div className="preview-ability">{showCardPreview.ability}</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ModernGameInterface
