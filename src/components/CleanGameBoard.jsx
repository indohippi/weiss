import React from 'react'
import Card from './Card'
import './CleanGameBoard.css'

const CleanGameBoard = ({
  gameState,
  currentPhase,
  selectedCard,
  onCardSelect,
  onCardAction,
  availableActions,
  onActionClick
}) => {
  if (!gameState) {
    return <div className="game-board-loading">Loading game board...</div>
  }

  const allPlayers = gameState.players || []
  const currentPlayer = allPlayers.find(p => p.turn) || allPlayers[0]
  const opponentPlayer = allPlayers.find(p => !p.turn) || allPlayers[1]

  if (!currentPlayer) {
    return <div className="game-board-error">Error: No current player found</div>
  }

  return (
    <div className="game-board">
      {/* Opponent Area */}
      <div className="opponent-area">
        <div className="player-header">
          <h3>{opponentPlayer.name}</h3>
          <div className="player-stats">
            <span>Deck: {opponentPlayer.deck?.length || 0}</span>
            <span>Hand: {opponentPlayer.hand?.length || 0}</span>
            <span>Level: {opponentPlayer.level?.length || 0}</span>
          </div>
        </div>

        {/* Opponent Stage */}
        <div className="stage-area">
          <div className="stage-row">
            {opponentPlayer.stage?.slice(0, 2).map((card, index) => (
              <div key={`opp-back-${index}`} className="stage-slot">
                {card ? (
                  <Card
                    card={card}
                    showDetails={true}
                    showState={true}
                    onClick={() => onCardAction('attack', card, 'stage')}
                  />
                ) : (
                  <div className="empty-slot">Back {index + 1}</div>
                )}
              </div>
            ))}
          </div>
          <div className="stage-row">
            {opponentPlayer.stage?.slice(2, 5).map((card, index) => (
              <div key={`opp-front-${index}`} className="stage-slot">
                {card ? (
                  <Card
                    card={card}
                    showDetails={true}
                    showState={true}
                    onClick={() => onCardAction('attack', card, 'stage')}
                  />
                ) : (
                  <div className="empty-slot">Front {index + 1}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Opponent Zones */}
        <div className="zones-area">
          <div className="zone">
            <div className="zone-label">Clock</div>
            <div className="zone-value">{opponentPlayer.clock?.length || 0}</div>
          </div>
          <div className="zone">
            <div className="zone-label">Level</div>
            <div className="zone-value">{opponentPlayer.level?.length || 0}</div>
          </div>
          <div className="zone">
            <div className="zone-label">Climax</div>
            <div className="zone-value">{opponentPlayer.climaxArea ? '1' : '0'}</div>
          </div>
        </div>
      </div>

      {/* Center Area */}
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

      {/* Current Player Area */}
      <div className="current-player-area">
        {/* Current Player Zones */}
        <div className="zones-area">
          <div className="zone">
            <div className="zone-label">Deck</div>
            <div className="zone-value">{currentPlayer.deck?.length || 0}</div>
          </div>
          <div className="zone">
            <div className="zone-label">Stock</div>
            <div className="zone-value">{currentPlayer.stock?.length || 0}</div>
          </div>
          <div className="zone">
            <div className="zone-label">Waiting</div>
            <div className="zone-value">{currentPlayer.waitingRoom?.length || 0}</div>
          </div>
        </div>

        {/* Current Player Stage */}
        <div className="stage-area">
          <div className="stage-row">
            {currentPlayer.stage?.slice(0, 2).map((card, index) => (
              <div key={`current-back-${index}`} className="stage-slot">
                {card ? (
                  <Card
                    card={card}
                    showDetails={true}
                    showState={true}
                    onClick={() => onCardAction('attack', card, 'stage')}
                  />
                ) : (
                  <div 
                    className="empty-slot can-place"
                    onClick={() => selectedCard && onCardAction('play', selectedCard.card, 'hand', index)}
                  >
                    Back {index + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="stage-row">
            {currentPlayer.stage?.slice(2, 5).map((card, index) => (
              <div key={`current-front-${index}`} className="stage-slot">
                {card ? (
                  <Card
                    card={card}
                    showDetails={true}
                    showState={true}
                    onClick={() => onCardAction('attack', card, 'stage')}
                  />
                ) : (
                  <div 
                    className="empty-slot can-place"
                    onClick={() => selectedCard && onCardAction('play', selectedCard.card, 'hand', index + 2)}
                  >
                    Front {index + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Player Hand */}
        <div className="hand-area" style={{ 
          border: '3px solid red', 
          background: 'rgba(255,0,0,0.1)',
          minHeight: '300px'
        }}>
          <div className="hand-header">
            <h3>Your Hand ({currentPlayer.hand?.length || 0})</h3>
            <div style={{ color: 'yellow', fontSize: '12px' }}>
              DEBUG: Hand exists: {currentPlayer.hand ? 'YES' : 'NO'}, 
              Length: {currentPlayer.hand?.length || 0}, 
              Type: {typeof currentPlayer.hand}
            </div>
          </div>
          <div className="hand-cards">
            {currentPlayer.hand && currentPlayer.hand.length > 0 ? (
              currentPlayer.hand.map((card, index) => (
                <div key={`hand-${card.id}-${index}`} className="hand-card">
                  <Card
                    card={card}
                    showDetails={true}
                    showState={true}
                    className={currentPhase === 'clock' ? 'can-clock' : ''}
                    onClick={() => {
                      if (currentPhase === 'clock') {
                        onCardAction('clock', card, 'hand')
                      } else {
                        onCardSelect(card, 'hand')
                      }
                    }}
                  />
                </div>
              ))
            ) : (
              <div style={{ 
                color: 'red', 
                padding: '20px', 
                textAlign: 'center',
                background: 'rgba(255,0,0,0.2)',
                borderRadius: '8px',
                margin: '10px'
              }}>
                NO CARDS IN HAND - DEBUG INFO:
                <br/>Hand exists: {currentPlayer.hand ? 'YES' : 'NO'}
                <br/>Hand length: {currentPlayer.hand?.length || 0}
                <br/>Hand type: {typeof currentPlayer.hand}
                <br/>Is array: {Array.isArray(currentPlayer.hand) ? 'YES' : 'NO'}
                <br/>First card: {currentPlayer.hand?.[0]?.name || 'NONE'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CleanGameBoard
