import React from 'react'

const GameStateTest = ({ gameState, currentPhase }) => {
  if (!gameState) {
    return <div style={{ color: 'red', background: 'yellow', padding: '10px' }}>NO GAME STATE</div>
  }

  const allPlayers = gameState.players || []
  const currentPlayer = allPlayers.find(p => p.turn) || allPlayers[0]
  
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      zIndex: 10000,
      maxWidth: '500px',
      fontSize: '14px'
    }}>
      <h2 style={{ color: 'yellow', marginBottom: '10px' }}>🔍 GAME STATE TEST</h2>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Game State Exists:</strong> {gameState ? 'YES' : 'NO'}
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Players Count:</strong> {allPlayers.length}
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Current Phase:</strong> {currentPhase}
      </div>
      
      {allPlayers.map((player, index) => (
        <div key={index} style={{ marginBottom: '15px', padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px' }}>
          <div><strong>Player {index + 1}:</strong> {player.name}</div>
          <div><strong>Turn:</strong> {player.turn ? 'YES' : 'NO'}</div>
          <div><strong>Hand Length:</strong> {player.hand?.length || 0}</div>
          <div><strong>Hand Type:</strong> {typeof player.hand}</div>
          <div><strong>Is Array:</strong> {Array.isArray(player.hand) ? 'YES' : 'NO'}</div>
          {player.hand && player.hand.length > 0 && (
            <div>
              <strong>First Card:</strong> {player.hand[0]?.name || 'NO NAME'}
            </div>
          )}
        </div>
      ))}
      
      <div style={{ marginTop: '15px', padding: '10px', background: 'rgba(255,0,0,0.2)', borderRadius: '5px' }}>
        <strong>Current Player Selected:</strong> {currentPlayer?.name || 'NONE'}
        <br/>
        <strong>Current Player Hand:</strong> {currentPlayer?.hand?.length || 0}
        <br/>
        <strong>Current Player Turn:</strong> {currentPlayer?.turn ? 'YES' : 'NO'}
      </div>
    </div>
  )
}

export default GameStateTest
