import React from 'react'

const SimpleCardTest = ({ gameState }) => {
  if (!gameState) return null

  const allPlayers = gameState.players || []
  const currentPlayer = allPlayers.find(p => p.turn) || allPlayers[0]
  
  if (!currentPlayer || !currentPlayer.hand) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      background: 'rgba(0,255,0,0.9)',
      color: 'black',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 10000,
      maxWidth: '300px'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>🃏 SIMPLE CARD TEST</h3>
      <div><strong>Hand Length:</strong> {currentPlayer.hand.length}</div>
      <div><strong>Player:</strong> {currentPlayer.name}</div>
      
      {currentPlayer.hand.length > 0 && (
        <div style={{ marginTop: '10px' }}>
          <strong>Cards:</strong>
          {currentPlayer.hand.slice(0, 3).map((card, index) => (
            <div key={index} style={{
              background: 'white',
              color: 'black',
              padding: '5px',
              margin: '2px 0',
              borderRadius: '3px',
              fontSize: '12px'
            }}>
              {index + 1}. {card.name} (L{card.level})
            </div>
          ))}
          {currentPlayer.hand.length > 3 && (
            <div style={{ fontSize: '12px', color: '#666' }}>
              ... and {currentPlayer.hand.length - 3} more
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SimpleCardTest
