import React, { useState, useEffect } from 'react'

const ComprehensiveTest = ({ gameState, currentPhase }) => {
  const [testResults, setTestResults] = useState({})
  
  useEffect(() => {
    if (!gameState) {
      setTestResults({ error: 'No game state' })
      return
    }

    const results = {
      gameStateExists: !!gameState,
      playersCount: gameState.players?.length || 0,
      currentPhase: currentPhase,
      players: []
    }

    if (gameState.players) {
      gameState.players.forEach((player, index) => {
        results.players.push({
          index,
          name: player.name,
          turn: player.turn,
          handExists: !!player.hand,
          handLength: player.hand?.length || 0,
          handType: typeof player.hand,
          isArray: Array.isArray(player.hand),
          firstCard: player.hand?.[0]?.name || 'No first card',
          deckLength: player.deck?.length || 0
        })
      })
    }

    setTestResults(results)
  }, [gameState, currentPhase])

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.95)',
      color: 'white',
      padding: '15px',
      borderRadius: '10px',
      zIndex: 10001,
      maxWidth: '400px',
      fontSize: '12px',
      border: '2px solid #00ff00'
    }}>
      <h3 style={{ color: '#00ff00', margin: '0 0 10px 0' }}>🧪 COMPREHENSIVE TEST</h3>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Game State:</strong> {testResults.gameStateExists ? '✅ EXISTS' : '❌ MISSING'}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Players:</strong> {testResults.playersCount}
      </div>
      
      <div style={{ marginBottom: '8px' }}>
        <strong>Phase:</strong> {testResults.currentPhase}
      </div>
      
      {testResults.players?.map((player, index) => (
        <div key={index} style={{
          marginBottom: '10px',
          padding: '8px',
          background: player.turn ? 'rgba(0,255,0,0.2)' : 'rgba(255,255,255,0.1)',
          borderRadius: '5px',
          border: player.turn ? '1px solid #00ff00' : '1px solid #666'
        }}>
          <div><strong>Player {index + 1}:</strong> {player.name} {player.turn ? '👑' : ''}</div>
          <div><strong>Hand:</strong> {player.handLength} cards</div>
          <div><strong>Type:</strong> {player.handType}</div>
          <div><strong>Array:</strong> {player.isArray ? '✅' : '❌'}</div>
          <div><strong>First Card:</strong> {player.firstCard}</div>
          <div><strong>Deck:</strong> {player.deckLength} cards</div>
        </div>
      ))}
      
      <div style={{
        marginTop: '10px',
        padding: '8px',
        background: 'rgba(255,0,0,0.2)',
        borderRadius: '5px',
        border: '1px solid #ff0000'
      }}>
        <strong>🎯 CURRENT PLAYER ANALYSIS:</strong>
        {testResults.players?.find(p => p.turn) ? (
          <div>
            <div>✅ Current player found</div>
            <div>Hand: {testResults.players.find(p => p.turn).handLength} cards</div>
            <div>Should render: {testResults.players.find(p => p.turn).handLength > 0 ? 'YES' : 'NO'}</div>
          </div>
        ) : (
          <div>❌ No current player found</div>
        )}
      </div>
    </div>
  )
}

export default ComprehensiveTest
