import React from 'react'
import Card from './Card'
import './PlayerArea.css'

const PlayerArea = ({
  player,
  isCurrentPlayer,
  isOpponent = false,
  selectedCard,
  onCardSelect,
  onCardAction
}) => {
  if (!player) {
    return (
      <div className="player-area">
        <div className="player-info">
          <div className="player-name">No Player</div>
        </div>
        <div className="field">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="field-position">
              <div className="field-label">{index < 3 ? 'Front' : 'Back'}</div>
              <div className="empty-card">No Card</div>
            </div>
          ))}
        </div>
        <div className="zones">
          <div className="zone level">
            <div className="zone-label">Level</div>
            <div className="zone-content">0</div>
          </div>
          <div className="zone stock">
            <div className="zone-label">Stock</div>
            <div className="zone-content">0</div>
          </div>
          <div className="zone clock">
            <div className="zone-label">Clock</div>
            <div className="zone-content">0</div>
          </div>
          <div className="zone deck">
            <div className="zone-label">Deck</div>
            <div className="zone-content">0</div>
          </div>
          <div className="zone waiting-room">
            <div className="zone-label">Waiting Room</div>
            <div className="zone-content">0</div>
          </div>
          <div className="zone memory">
            <div className="zone-label">Memory</div>
            <div className="zone-content">0</div>
          </div>
        </div>
      </div>
    )
  }

  const isCardSelected = (card, location) => {
    return selectedCard && selectedCard.card.id === card.id && selectedCard.location === location
  }

  const handleCardClick = (card, location, position = null) => {
    if (!onCardSelect) return
    
    // If clicking a stage card during attack phase, attack with it
    if (location === 'stage' && isCurrentPlayer) {
      onCardAction('attack', card, location)
      return
    }
    
    // Otherwise, select the card
    onCardSelect(card, location, position)
  }
  
  const handleEmptySlotClick = (position) => {
    // If in main phase and card is selected, play it here
    if (selectedCard && selectedCard.location === 'hand' && selectedCard.card.type === 'character') {
      onCardAction('play', selectedCard.card, 'hand', position)
    }
  }

  const getFieldPositionClass = (index) => {
    return index < 3 ? 'front' : 'back'
  }

  return (
    <div className={`player-area ${isOpponent ? 'opponent' : 'current'}`}>
      <div className="player-info">
        <div className={`player-name ${isOpponent ? 'opponent' : 'current'}`}>
          {player.name}
        </div>
        <div className="player-stats">
          <div className="player-stat">
            <span className="stat-label">Level</span>
            <span className="stat-value">{player.level.length}</span>
          </div>
          <div className="player-stat">
            <span className="stat-label">Hand</span>
            <span className="stat-value">{player.hand.length}</span>
          </div>
          <div className="player-stat">
            <span className="stat-label">Stock</span>
            <span className="stat-value">{player.stock.length}</span>
          </div>
          <div className="player-stat">
            <span className="stat-label">Clock</span>
            <span className="stat-value">{player.clock.length}</span>
          </div>
        </div>
      </div>

      <div className="field">
        {player.stage.map((card, index) => (
          <div key={index} className={`field-position ${getFieldPositionClass(index)}`}>
            <div className={`field-label ${getFieldPositionClass(index)}`}>
              {getFieldPositionClass(index) === 'front' ? 'Front' : 'Back'} {index + 1}
            </div>
            {card ? (
              <Card
                card={card}
                onClick={() => handleCardClick(card, 'stage', index)}
                showDetails={true}
                showState={true}
                className={`${isCardSelected(card, 'stage') ? 'selected' : ''} ${isCurrentPlayer && card.state === 'stand' && index < 3 ? 'can-attack' : ''}`}
              />
            ) : (
              <div 
                className={`empty-card ${selectedCard && selectedCard.location === 'hand' ? 'can-place' : ''}`}
                onClick={() => handleEmptySlotClick(index)}
              >
                Empty
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="zones">
        <div className="zone level">
          <div className="zone-label">Level</div>
          <div className="zone-content">
            {player.level.length > 0 ? (
              player.level.map((card, index) => (
                <Card
                  key={`level-${card.id}-${index}`}
                  card={card}
                  onClick={() => handleCardClick(card, 'level')}
                  showDetails={false}
                  showState={false}
                />
              ))
            ) : (
              <span>0</span>
            )}
          </div>
        </div>

        <div className="zone stock">
          <div className="zone-label">Stock</div>
          <div className="zone-content">
            {player.stock.length > 0 ? (
              player.stock.map((card, index) => (
                <Card
                  key={`stock-${card.id}-${index}`}
                  card={card}
                  onClick={() => handleCardClick(card, 'stock')}
                  showDetails={false}
                  showState={false}
                />
              ))
            ) : (
              <span>0</span>
            )}
          </div>
        </div>

        <div className="zone clock">
          <div className="zone-label">Clock</div>
          <div className="zone-content">
            {player.clock.length > 0 ? (
              player.clock.map((card, index) => (
                <Card
                  key={`clock-${card.id}-${index}`}
                  card={card}
                  onClick={() => handleCardClick(card, 'clock')}
                  showDetails={false}
                  showState={false}
                />
              ))
            ) : (
              <span>0</span>
            )}
          </div>
        </div>

        <div className="zone deck">
          <div className="zone-label">Deck</div>
          <div className="zone-content">
            {player.deck.length > 0 ? (
              <Card
                card={player.deck[0]}
                showDetails={false}
                showState={false}
                className="deck-back"
              />
            ) : (
              <span>0</span>
            )}
            {player.deck.length > 1 && (
              <div className="card-count-badge">+{player.deck.length - 1}</div>
            )}
          </div>
        </div>

        <div className="zone waiting-room">
          <div className="zone-label">Waiting Room</div>
          <div className="zone-content">
            {player.waitingRoom.length > 0 ? (
              player.waitingRoom.slice(0, 3).map((card, index) => (
                <Card
                  key={`waiting-${card.id}-${index}`}
                  card={card}
                  onClick={() => handleCardClick(card, 'waitingRoom')}
                  showDetails={false}
                  showState={false}
                />
              ))
            ) : (
              <span>0</span>
            )}
            {player.waitingRoom.length > 3 && (
              <div className="card-count-badge">+{player.waitingRoom.length - 3}</div>
            )}
          </div>
        </div>

        <div className="zone memory">
          <div className="zone-label">Memory</div>
          <div className="zone-content">
            {player.memory.length > 0 ? (
              player.memory.map((card, index) => (
                <Card
                  key={`memory-${card.id}-${index}`}
                  card={card}
                  onClick={() => handleCardClick(card, 'memory')}
                  showDetails={false}
                  showState={false}
                />
              ))
            ) : (
              <span>0</span>
            )}
          </div>
        </div>

        <div className="zone climax">
          <div className="zone-label">Climax</div>
          <div className="zone-content">
            {player.climaxZone ? (
              <Card
                card={player.climaxZone}
                onClick={() => handleCardClick(player.climaxZone, 'climax')}
                showDetails={true}
                showState={false}
              />
            ) : (
              <span>None</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayerArea
