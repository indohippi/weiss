import React from 'react'
import Card from './Card'
import ImprovedCard from './ImprovedCard'
import './GameBoard.css'

const GameBoard = ({
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

  // Force re-evaluation of player selection
  const allPlayers = gameState.players || []
  const currentPlayer = allPlayers.find(p => p.turn) || allPlayers[0]
  const opponentPlayer = allPlayers.find(p => !p.turn) || allPlayers[1]
  
  // Additional safety checks
  if (!currentPlayer) {
    console.error('❌ No current player found!', { allPlayers })
    return <div className="game-board-error">Error: No current player found</div>
  }
  
  if (!currentPlayer.hand) {
    console.error('❌ Current player has no hand!', { currentPlayer })
    return <div className="game-board-error">Error: Player has no hand</div>
  }
  
  // Debug logging
  console.log('🎯 GameBoard render:', {
    currentPlayer: currentPlayer.name,
    currentPlayerHand: currentPlayer.hand.length,
    currentPlayerDeck: currentPlayer.deck.length,
    opponentPlayer: opponentPlayer.name,
    opponentPlayerHand: opponentPlayer.hand.length,
    opponentPlayerDeck: opponentPlayer.deck.length,
    currentPhase,
    currentPlayerHandCards: currentPlayer.hand.map(c => ({ 
      name: c.name, 
      type: c.type, 
      level: c.level, 
      series: c.series,
      image: c.image ? 'has image' : 'no image',
      fromDatabase: c.series && c.series !== 'Trial'
    })),
    opponentPlayerHandCards: opponentPlayer.hand.map(c => ({ 
      name: c.name, 
      type: c.type, 
      level: c.level, 
      series: c.series,
      image: c.image ? 'has image' : 'no image',
      fromDatabase: c.series && c.series !== 'Trial'
    })),
    gameStatePlayers: gameState.players.map(p => ({
      name: p.name,
      turn: p.turn,
      handLength: p.hand.length
    }))
  })
  
  // CRITICAL DEBUG: Check if cards are actually being passed
  console.log('🚨 CRITICAL DEBUG - Hand Array:', {
    handExists: !!currentPlayer.hand,
    handLength: currentPlayer.hand?.length,
    handType: typeof currentPlayer.hand,
    isArray: Array.isArray(currentPlayer.hand),
    firstCard: currentPlayer.hand?.[0],
    allCards: currentPlayer.hand
  })

  const renderZone = (player, zoneName, cards, showBack = false) => {
    const count = Array.isArray(cards) ? cards.length : (cards || 0)
    const cardsArray = Array.isArray(cards) ? cards : []
    
    return (
      <div className={`zone zone-${zoneName.toLowerCase().replace(' ', '-')}`}>
        <div className="zone-label">{zoneName}</div>
        <div className="zone-cards">
          {count > 0 ? (
            showBack ? (
              <div className="card-stack">
                <Card card={null} showDetails={false} />
                <div className="card-stack-count">{count}</div>
              </div>
            ) : (
              cardsArray.slice(-3).map((card, index) => (
                <ImprovedCard
                  key={`${zoneName}-${card.id}-${index}`}
                  card={card}
                  showDetails={false}
                  className="zone-card"
                />
              ))
            )
          ) : (
            <div className="zone-empty">{count}</div>
          )}
        </div>
      </div>
    )
  }

  const renderStagePosition = (player, position, isOpponent = false) => {
    const card = player.stage[position]
    const isCenter = position < 3
    const posLabel = isCenter ? `C${position + 1}` : `B${position - 2}`
    
    return (
      <div 
        key={position} 
        className={`stage-position ${isCenter ? 'center' : 'back'} ${!card && selectedCard?.location === 'hand' && !isOpponent ? 'can-place' : ''}`}
        onClick={() => !card && selectedCard?.location === 'hand' && !isOpponent && onCardAction('play', selectedCard.card, 'hand', position)}
      >
        <div className="position-label">{posLabel}</div>
        {card ? (
          <ImprovedCard
            card={card}
            showDetails={true}
            showState={true}
            onClick={() => !isOpponent && onCardAction('attack', card, 'stage')}
            className={`${card.state === 'stand' && isCenter && !isOpponent ? 'can-attack' : ''}`}
          />
        ) : (
          <div className="empty-slot">
            <div className="empty-slot-text">{posLabel}</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="game-board-new">
      {/* OPPONENT AREA (TOP) */}
      <div className="player-zone opponent-zone">
        <div className="player-header">
          <div className="player-name-badge opponent">{opponentPlayer.name}</div>
          <div className="player-level-display">
            <span className="level-label">LV</span>
            <span className="level-value">{opponentPlayer.level.length}</span>
          </div>
        </div>

        <div className="player-main-area">
          {/* Left Zones */}
          <div className="zones-column left">
            {renderZone(opponentPlayer, 'Deck', opponentPlayer.deck, true)}
            {renderZone(opponentPlayer, 'Stock', opponentPlayer.stock, true)}
            {renderZone(opponentPlayer, 'WR', opponentPlayer.waitingRoom)}
          </div>

          {/* Center - Stage */}
          <div className="stage-area">
            <div className="stage-row back-row">
              {[3, 4].map(pos => renderStagePosition(opponentPlayer, pos, true))}
            </div>
            <div className="stage-row center-row">
              {[0, 1, 2].map(pos => renderStagePosition(opponentPlayer, pos, true))}
            </div>
          </div>

          {/* Right Zones */}
          <div className="zones-column right">
            {renderZone(opponentPlayer, 'Level', opponentPlayer.level)}
            {renderZone(opponentPlayer, 'Clock', opponentPlayer.clock)}
            <div className="zone zone-climax">
              <div className="zone-label">Climax</div>
              <div className="zone-cards">
                {opponentPlayer.climaxArea ? (
                  <ImprovedCard card={opponentPlayer.climaxArea} showDetails={true} />
                ) : (
                  <div className="zone-empty">-</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Opponent Hand (face down) */}
        <div className="opponent-hand">
          <div className="hand-count-badge">
            🎴 {opponentPlayer.hand.length} cards
          </div>
          <div className="hand-cards-preview">
            {opponentPlayer.hand.slice(0, 7).map((_, index) => (
              <div key={index} className="hand-card-back">
                <Card card={null} showDetails={false} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CENTER BATTLE AREA */}
      <div className="battle-zone">
        {gameState.attackPhase?.isActive ? (
          <div className="battle-display active">
            <div className="battle-title">⚔️ BATTLE</div>
            <div className="battle-participants">
              <div className="battle-side attacker">
                <div className="battle-label">ATTACKER</div>
                <div className="battle-name">{gameState.attackPhase.attackingCharacter?.name}</div>
                <div className="battle-power">PWR: {gameState.attackPhase.attackingCharacter?.power}</div>
                <div className="battle-soul">SOUL: {gameState.attackPhase.currentSoul}</div>
              </div>
              <div className="battle-vs">VS</div>
              <div className="battle-side defender">
                <div className="battle-label">DEFENDER</div>
                {gameState.attackPhase.defendingCharacter ? (
                  <>
                    <div className="battle-name">{gameState.attackPhase.defendingCharacter.name}</div>
                    <div className="battle-power">PWR: {gameState.attackPhase.defendingCharacter.power}</div>
                  </>
                ) : (
                  <div className="battle-name">DIRECT ATTACK</div>
                )}
              </div>
            </div>
            {gameState.attackPhase.triggerCard && (
              <div className="trigger-display">
                <span className="trigger-label">TRIGGER:</span>
                <span className="trigger-name">{gameState.attackPhase.triggerCard.name}</span>
                {gameState.attackPhase.triggerCard.trigger && (
                  <span className="trigger-type">✨ {gameState.attackPhase.triggerCard.trigger.toUpperCase()}</span>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="phase-indicator" key={currentPhase}>
            <div className="phase-icon">
              {currentPhase === 'stand' && '🧍'}
              {currentPhase === 'draw' && '📥'}
              {currentPhase === 'clock' && '⏰'}
              {currentPhase === 'main' && '🎴'}
              {currentPhase === 'climax' && '💥'}
              {currentPhase === 'attack' && '⚔️'}
              {currentPhase === 'end' && '🔚'}
            </div>
            <div className="phase-name-big">{currentPhase.toUpperCase()} PHASE</div>
            <div className="phase-desc">
              {currentPhase === 'stand' && '✨ All characters automatically stand up'}
              {currentPhase === 'draw' && '📥 Automatically draw 1 card from your deck'}
              {currentPhase === 'clock' && '⏰ Click a card in hand to clock it, or press S to skip'}
              {currentPhase === 'main' && '🎴 Click cards in hand, then click empty stage slots'}
              {currentPhase === 'climax' && '💥 Click climax cards to play powerful effects'}
              {currentPhase === 'attack' && '⚔️ Click standing characters (front row) to attack'}
              {currentPhase === 'end' && '🔚 Hand limit enforced, climax removed, turn ends'}
            </div>
          </div>
        )}
      </div>

      {/* CURRENT PLAYER AREA (BOTTOM) */}
      <div className="player-zone current-zone">
        {/* Current Player Hand */}
        <div className="current-hand">
          <div className="hand-header">
            <span className="hand-title">🎴 Your Hand</span>
            <span className="hand-limit">{currentPlayer.hand.length} / 7</span>
          </div>
          <div className="hand-cards-display">
            {/* DIRECT CARD RENDERING - BYPASS ALL LOGIC */}
            <div style={{
              position: 'absolute',
              top: '-100px',
              left: '0',
              background: 'rgba(255,255,0,0.9)',
              color: 'black',
              padding: '10px',
              borderRadius: '4px',
              fontSize: '12px',
              zIndex: 1003,
              fontWeight: 'bold'
            }}>
              🚨 DIRECT RENDER: {currentPlayer.hand.length} cards<br/>
              Player: {currentPlayer.name}<br/>
              Turn: {currentPlayer.turn ? 'YES' : 'NO'}
            </div>
            
            {/* FORCE RENDER ALL CARDS - NO CONDITIONS */}
            {currentPlayer.hand.map((card, index) => (
              <div
                key={`force-hand-${card.id}-${index}`}
                style={{
                  width: '140px',
                  height: '200px',
                  background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
                  border: '2px solid #4f9eff',
                  borderRadius: '12px',
                  margin: '8px',
                  padding: '10px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
                onClick={() => {
                  if (currentPhase === 'clock') {
                    onCardAction('clock', card, 'hand')
                  } else {
                    onCardSelect(card, 'hand')
                  }
                }}
              >
                {/* Card Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ background: '#374151', color: 'white', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>
                    L{card.level}
                  </div>
                  <div style={{ background: '#6b7280', color: 'white', padding: '4px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>
                    C{card.cost}
                  </div>
                </div>
                
                {/* Card Name */}
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1f2937', textAlign: 'center', lineHeight: '1.2' }}>
                  {card.name}
                </div>
                
                {/* Card Stats */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: '600' }}>PWR</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#ef4444' }}>{card.power}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '10px', color: '#6b7280', fontWeight: '600' }}>SOUL</div>
                    <div style={{ fontSize: '16px', fontWeight: '700', color: '#3b82f6' }}>{card.soul}</div>
                  </div>
                </div>
                
                {/* Card Type */}
                <div style={{ fontSize: '10px', color: '#6b7280', textAlign: 'center', fontStyle: 'italic' }}>
                  {card.type}
                </div>
                
                {/* Debug overlay */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  background: 'rgba(255,0,0,0.8)',
                  color: 'white',
                  fontSize: '8px',
                  padding: '2px',
                  borderRadius: '0 0 4px 0',
                  zIndex: 1000
                }}>
                  #{index + 1}
                </div>
              </div>
            ))}
            
            {/* Fallback message if no cards */}
            {currentPlayer.hand.length === 0 && (
              <div style={{
                width: '100%',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '12px',
                color: 'white',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                NO CARDS IN HAND
              </div>
            )}
          </div>
        </div>

        <div className="player-main-area">
          {/* Left Zones */}
          <div className="zones-column left">
            {renderZone(currentPlayer, 'Deck', currentPlayer.deck, true)}
            {renderZone(currentPlayer, 'Stock', currentPlayer.stock, true)}
            {renderZone(currentPlayer, 'WR', currentPlayer.waitingRoom)}
          </div>

          {/* Center - Stage */}
          <div className="stage-area">
            <div className="stage-row center-row">
              {[0, 1, 2].map(pos => renderStagePosition(currentPlayer, pos, false))}
            </div>
            <div className="stage-row back-row">
              {[3, 4].map(pos => renderStagePosition(currentPlayer, pos, false))}
            </div>
          </div>

          {/* Right Zones */}
          <div className="zones-column right">
            {renderZone(currentPlayer, 'Level', currentPlayer.level)}
            {renderZone(currentPlayer, 'Clock', currentPlayer.clock)}
            <div className="zone zone-climax">
              <div className="zone-label">Climax</div>
              <div className="zone-cards">
                {currentPlayer.climaxArea ? (
                  <ImprovedCard card={currentPlayer.climaxArea} showDetails={true} />
                ) : (
                  <div className="zone-empty">-</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="player-header">
          <div className="player-name-badge current">{currentPlayer.name}</div>
          <div className="player-level-display">
            <span className="level-label">LV</span>
            <span className="level-value">{currentPlayer.level.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameBoard
