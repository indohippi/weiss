import React from 'react'

const FinalTest = ({ gameState, currentPhase, gameStarted }) => {
  if (!gameState || !gameStarted) {
    return (
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(255,0,0,0.9)',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        zIndex: 10002,
        fontSize: '16px',
        fontWeight: 'bold'
      }}>
        ❌ GAME NOT STARTED OR NO GAME STATE
      </div>
    )
  }

  const allPlayers = gameState.players || []
  const currentPlayer = allPlayers.find(p => p.turn) || allPlayers[0]
  
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0,255,0,0.95)',
      color: 'black',
      padding: '20px',
      borderRadius: '10px',
      zIndex: 10002,
      maxWidth: '600px',
      maxHeight: '500px',
      overflow: 'auto',
      fontSize: '14px'
    }}>
      <h2 style={{ margin: '0 0 15px 0', color: '#000' }}>✅ FINAL TEST - GAME STATUS</h2>
      
      <div style={{ marginBottom: '15px', padding: '10px', background: 'rgba(255,255,255,0.8)', borderRadius: '5px' }}>
        <strong>🎮 GAME STATUS:</strong>
        <div>✅ Game Started: {gameStarted ? 'YES' : 'NO'}</div>
        <div>✅ Game State: {gameState ? 'EXISTS' : 'MISSING'}</div>
        <div>✅ Current Phase: {currentPhase}</div>
        <div>✅ Players: {allPlayers.length}</div>
      </div>
      
      {allPlayers.map((player, index) => (
        <div key={index} style={{
          marginBottom: '15px',
          padding: '10px',
          background: player.turn ? 'rgba(255,255,0,0.8)' : 'rgba(255,255,255,0.8)',
          borderRadius: '5px',
          border: player.turn ? '2px solid #000' : '1px solid #666'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            {player.turn ? '👑' : ''} Player {index + 1}: {player.name}
          </div>
          <div>Hand: {player.hand?.length || 0} cards</div>
          <div>Deck: {player.deck?.length || 0} cards</div>
          <div>Stage: {player.stage?.filter(c => c).length || 0} cards</div>
          <div>Clock: {player.clock?.length || 0} cards</div>
          <div>Level: {player.level?.length || 0} cards</div>
          
          {player.hand && player.hand.length > 0 && (
            <div style={{ marginTop: '5px' }}>
              <strong>Hand Cards:</strong>
              {player.hand.slice(0, 3).map((card, cardIndex) => (
                <div key={cardIndex} style={{ fontSize: '12px', marginLeft: '10px' }}>
                  {cardIndex + 1}. {card.name} (L{card.level})
                </div>
              ))}
              {player.hand.length > 3 && (
                <div style={{ fontSize: '12px', color: '#666' }}>
                  ... and {player.hand.length - 3} more
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      
      <div style={{
        marginTop: '15px',
        padding: '10px',
        background: 'rgba(0,0,255,0.8)',
        color: 'white',
        borderRadius: '5px',
        textAlign: 'center'
      }}>
        <strong>🎯 CURRENT PLAYER: {currentPlayer?.name || 'NONE'}</strong>
        <br/>
        <strong>Hand Size: {currentPlayer?.hand?.length || 0}</strong>
        <br/>
        <strong>Should Render Cards: {currentPlayer?.hand?.length > 0 ? 'YES' : 'NO'}</strong>
      </div>
    </div>
  )
}

export default FinalTest
