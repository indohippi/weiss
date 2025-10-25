import React from 'react'
import Card from './Card'
import './SimpleGameBoard.css'

const SimpleGameBoard = ({
  gameState,
  currentPhase,
  selectedCard,
  onCardSelect,
  onCardAction,
  availableActions,
  onActionClick
}) => {
  if (!gameState) {
    return <div className="simple-game-board-loading">Loading game board...</div>
  }

  const allPlayers = gameState.players || []
  const currentPlayer = allPlayers.find(p => p.turn) || allPlayers[0]
  const opponentPlayer = allPlayers.find(p => !p.turn) || allPlayers[1]

  if (!currentPlayer) {
    console.error('❌ No current player found!', { allPlayers })
    return <div className="simple-game-board-error">Error: No current player found</div>
  }

  console.log('🎮 SimpleGameBoard rendering:', {
    currentPlayer: currentPlayer.name,
    handLength: currentPlayer.hand?.length || 0,
    handCards: currentPlayer.hand?.map(c => c.name) || [],
    deckLength: currentPlayer.deck?.length || 0,
    handExists: !!currentPlayer.hand,
    handType: typeof currentPlayer.hand,
    isArray: Array.isArray(currentPlayer.hand),
    firstCard: currentPlayer.hand?.[0]?.name || 'NONE'
  })

  return (
    <div className="simple-game-board">
      {/* Opponent Area */}
      <div className="opponent-area">
        <h3>Opponent ({opponentPlayer?.name || 'Player 2'})</h3>
        <div className="opponent-stage">
          {opponentPlayer?.stage?.map((card, index) => (
            <div key={`opp-stage-${index}`} className="stage-slot">
              {card ? (
                <Card
                  card={card}
                  showDetails={false}
                  showState={false}
                  onClick={() => {}}
                />
              ) : (
                <div className="empty-slot">Empty</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Center Area - Phase Display */}
      <div className="center-area">
        <div className="phase-display">
          <h2>Current Phase: {currentPhase}</h2>
          <div className="phase-info">
            <p>Turn: {gameState.turnNumber || 1}</p>
            <p>Player: {currentPlayer.name}</p>
          </div>
        </div>
      </div>

      {/* Current Player Area */}
      <div className="current-player-area">
        <h3>Your Area ({currentPlayer.name})</h3>
        
        {/* Player Stage */}
        <div className="player-stage">
          <h4>Your Stage</h4>
          <div className="stage-slots">
            {currentPlayer.stage?.map((card, index) => (
              <div key={`stage-${index}`} className="stage-slot">
                {card ? (
                  <Card
                    card={card}
                    showDetails={true}
                    showState={true}
                    onClick={() => onCardSelect(card, 'stage', index)}
                  />
                ) : (
                  <div 
                    className="empty-slot"
                    onClick={() => {
                      if (selectedCard && selectedCard.location === 'hand') {
                        onCardAction('play', selectedCard.card, 'hand', index)
                      }
                    }}
                  >
                    Empty Slot {index + 1}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Player Hand */}
        <div className="player-hand">
          <h4>Your Hand ({currentPlayer.hand?.length || 0} cards)</h4>
          <div className="hand-cards">
            {currentPlayer.hand && currentPlayer.hand.length > 0 ? (
              currentPlayer.hand.map((card, index) => {
                console.log(`🎯 Rendering hand card ${index}:`, {
                  name: card.name,
                  id: card.id,
                  type: card.type,
                  hasImage: !!card.image
                })
                return (
                  <div key={`hand-${card.id}-${index}`} className="hand-card">
                    <div style={{
                      position: 'absolute',
                      top: '5px',
                      left: '5px',
                      background: 'rgba(0,0,0,0.8)',
                      color: 'white',
                      padding: '2px 4px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      zIndex: 100
                    }}>
                      {index + 1}
                    </div>
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
                )
              })
            ) : (
              <div className="no-cards">
                <p>No cards in hand</p>
                <p>Hand exists: {currentPlayer.hand ? 'YES' : 'NO'}</p>
                <p>Hand length: {currentPlayer.hand?.length || 0}</p>
                <p>Hand type: {typeof currentPlayer.hand}</p>
                <p>Is array: {Array.isArray(currentPlayer.hand) ? 'YES' : 'NO'}</p>
                <p>First card: {currentPlayer.hand?.[0]?.name || 'NONE'}</p>
                <button 
                  onClick={() => {
                    console.log('🔧 Adding test cards to hand...')
                    // Add some test cards to the hand
                    const testCards = [
                      { id: 'test1', name: 'Test Card 1', type: 'character', level: 0, power: 1000, soul: 1 },
                      { id: 'test2', name: 'Test Card 2', type: 'character', level: 1, power: 2000, soul: 1 },
                      { id: 'test3', name: 'Test Card 3', type: 'character', level: 2, power: 3000, soul: 2 }
                    ]
                    currentPlayer.hand = testCards
                    console.log('🔧 Test cards added:', currentPlayer.hand)
                  }}
                  style={{
                    background: 'blue',
                    color: 'white',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  Add Test Cards
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Player Resources */}
        <div className="player-resources">
          <div className="resource">
            <span>Deck: {currentPlayer.deck?.length || 0}</span>
          </div>
          <div className="resource">
            <span>Stock: {currentPlayer.stock?.length || 0}</span>
          </div>
          <div className="resource">
            <span>Clock: {currentPlayer.clock?.length || 0}</span>
          </div>
          <div className="resource">
            <span>Level: {currentPlayer.level?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimpleGameBoard