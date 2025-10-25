import React from 'react'

const GameStateDebugger = ({ gameState, currentPhase }) => {
  if (!gameState) {
    return <div>No game state</div>
  }

  const currentPlayer = gameState.players.find(p => p.turn) || gameState.players[0]
  const opponentPlayer = gameState.players.find(p => !p.turn) || gameState.players[1]
  
  // Debug logging
  console.log('🔍 GameStateDebugger render:', {
    gameStatePlayers: gameState.players.map(p => ({
      name: p.name,
      turn: p.turn,
      handLength: p.hand.length
    })),
    currentPlayer: currentPlayer.name,
    currentPlayerHand: currentPlayer.hand.length,
    currentPlayerHandCards: currentPlayer.hand.map(c => c.name)
  })

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 1000,
      maxWidth: '300px'
    }}>
      <h3>Game State Debug</h3>
      <div>
        <strong>Current Phase:</strong> {currentPhase}
      </div>
      <div>
        <strong>Current Player:</strong> {currentPlayer.name}
      </div>
      <div>
        <strong>Hand Size:</strong> {currentPlayer.hand.length}
      </div>
      <div>
        <strong>Deck Size:</strong> {currentPlayer.deck.length}
      </div>
      <div>
        <strong>Hand Cards:</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          {currentPlayer.hand.map((card, index) => (
            <li key={index}>
              {card.name} (L{card.level}, {card.type})
            </li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Stage:</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          {currentPlayer.stage.map((card, index) => (
            <li key={index}>
              {card ? `${card.name} (${card.state})` : 'Empty'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default GameStateDebugger
