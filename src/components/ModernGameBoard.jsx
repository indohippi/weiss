import React, { useState, useEffect } from 'react'
import './ModernGameBoard.css'

const ModernGameBoard = ({ 
  gameState, 
  currentPhase, 
  onCardSelect, 
  onCardAction,
  selectedCard,
  availableActions 
}) => {
  const [animations, setAnimations] = useState({})
  const [hoveredCard, setHoveredCard] = useState(null)

  if (!gameState) {
    return (
      <div className="modern-game-board">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading Game...</div>
        </div>
      </div>
    )
  }

  const allPlayers = gameState.players || []
  const currentPlayer = allPlayers.find(p => p.turn) || allPlayers[0]
  const opponentPlayer = allPlayers.find(p => !p.turn) || allPlayers[1]

  const handleCardClick = (card, location, position = null) => {
    if (currentPhase === 'clock') {
      onCardAction('clock', card, location)
    } else if (location === 'hand') {
      onCardSelect(card, location)
    } else if (location === 'stage' && position !== null) {
      if (selectedCard?.location === 'hand') {
        onCardAction('play', selectedCard.card, 'hand', position)
      } else {
        onCardAction('attack', card, 'stage')
      }
    }
  }

  const getCardGlow = (card, location) => {
    if (hoveredCard?.id === card.id) return 'glow-hover'
    if (selectedCard?.card?.id === card.id) return 'glow-selected'
    if (currentPhase === 'clock' && location === 'hand') return 'glow-clock'
    if (currentPhase === 'attack' && location === 'stage' && card.state === 'stand') return 'glow-attack'
    return ''
  }

  return (
    <div className="modern-game-board">
      {/* OPPONENT AREA */}
      <div className="opponent-area">
        <div className="player-header opponent-header">
          <div className="player-info">
            <div className="player-name">{opponentPlayer.name}</div>
            <div className="player-stats">
              <span className="stat">Deck: {opponentPlayer.deck?.length || 0}</span>
              <span className="stat">Hand: {opponentPlayer.hand?.length || 0}</span>
              <span className="stat">Level: {opponentPlayer.level?.length || 0}</span>
            </div>
          </div>
        </div>

        {/* Opponent Stage */}
        <div className="stage-area opponent-stage">
          <div className="stage-row back-row">
            {opponentPlayer.stage?.slice(0, 2).map((card, index) => (
              <div
                key={`opp-back-${index}`}
                className={`stage-slot back-slot ${card ? 'occupied' : 'empty'}`}
              >
                {card ? (
                  <div 
                    className={`card-wrapper ${getCardGlow(card, 'stage')}`}
                    onClick={() => handleCardClick(card, 'stage', index)}
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
                    className={`card-wrapper ${getCardGlow(card, 'stage')}`}
                    onClick={() => handleCardClick(card, 'stage', index + 2)}
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
        <div className="zones-area opponent-zones">
          <div className="zone">
            <div className="zone-label">Clock</div>
            <div className="zone-content">{opponentPlayer.clock?.length || 0}</div>
          </div>
          <div className="zone">
            <div className="zone-label">Level</div>
            <div className="zone-content">{opponentPlayer.level?.length || 0}</div>
          </div>
          <div className="zone">
            <div className="zone-label">Climax</div>
            <div className="zone-content">
              {opponentPlayer.climaxArea ? '1' : '0'}
            </div>
          </div>
        </div>
      </div>

      {/* CENTER AREA - PHASE INFO */}
      <div className="center-area">
        <div className="phase-display">
          <div className="phase-name">{currentPhase.toUpperCase()}</div>
          <div className="phase-description">
            {currentPhase === 'stand' && 'All characters stand up'}
            {currentPhase === 'draw' && 'Draw 1 card from deck'}
            {currentPhase === 'clock' && 'Clock a card from hand'}
            {currentPhase === 'main' && 'Play cards and use abilities'}
            {currentPhase === 'climax' && 'Play climax cards'}
            {currentPhase === 'attack' && 'Attack with characters'}
            {currentPhase === 'end' && 'End turn cleanup'}
          </div>
        </div>
      </div>

      {/* CURRENT PLAYER AREA */}
      <div className="current-player-area">
        {/* Current Player Zones */}
        <div className="zones-area current-zones">
          <div className="zone">
            <div className="zone-label">Deck</div>
            <div className="zone-content">{currentPlayer.deck?.length || 0}</div>
          </div>
          <div className="zone">
            <div className="zone-label">Stock</div>
            <div className="zone-content">{currentPlayer.stock?.length || 0}</div>
          </div>
          <div className="zone">
            <div className="zone-label">Waiting</div>
            <div className="zone-content">{currentPlayer.waitingRoom?.length || 0}</div>
          </div>
        </div>

        {/* Current Player Stage */}
        <div className="stage-area current-stage">
          <div className="stage-row back-row">
            {currentPlayer.stage?.slice(0, 2).map((card, index) => (
              <div
                key={`current-back-${index}`}
                className={`stage-slot back-slot ${card ? 'occupied' : 'empty'} ${!card && selectedCard?.location === 'hand' ? 'can-place' : ''}`}
                onClick={() => !card && selectedCard?.location === 'hand' && handleCardClick(null, 'stage', index)}
              >
                {card ? (
                  <div 
                    className={`card-wrapper ${getCardGlow(card, 'stage')}`}
                    onClick={() => handleCardClick(card, 'stage', index)}
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
                    className={`card-wrapper ${getCardGlow(card, 'stage')}`}
                    onClick={() => handleCardClick(card, 'stage', index + 2)}
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
        <div className="hand-area">
          <div className="hand-header">
            <div className="hand-title">Your Hand ({currentPlayer.hand?.length || 0}/7)</div>
          </div>
          <div className="hand-cards">
            {currentPlayer.hand?.map((card, index) => (
              <div
                key={`hand-${card.id}-${index}`}
                className={`hand-card ${getCardGlow(card, 'hand')}`}
                onClick={() => handleCardClick(card, 'hand')}
                onMouseEnter={() => setHoveredCard(card)}
                onMouseLeave={() => setHoveredCard(null)}
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
    </div>
  )
}

export default ModernGameBoard
