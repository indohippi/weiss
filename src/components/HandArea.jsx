import React from 'react'
import Card from './Card'
import './HandArea.css'

const HandArea = ({
  player,
  currentPhase,
  selectedCard,
  onCardSelect,
  onCardAction,
  availableActions,
  onActionClick
}) => {
  if (!player) {
    return (
      <div className="hand-area">
        <div className="hand-header">
          <div className="hand-label">Hand</div>
          <div className="hand-count">
            <span className="hand-count-label">Cards</span>
            <span className="hand-count-value">0</span>
          </div>
        </div>
        <div className="hand-empty">
          <div className="hand-empty-icon">🎴</div>
          <div className="hand-empty-text">No hand to display</div>
        </div>
      </div>
    )
  }

  const isCardSelected = (card) => {
    return selectedCard && selectedCard.card.id === card.id && selectedCard.location === 'hand'
  }

  const isCardPlayable = (card) => {
    return availableActions.some(action => 
      action.type === 'play' && action.card.id === card.id
    )
  }

  const handleCardClick = (card) => {
    if (!onCardSelect) return
    
    // During clock phase, clicking a card should clock it
    if (currentPhase === 'clock') {
      onCardAction('clock', card, 'hand')
      return
    }
    
    // During main phase, select card to play
    if (currentPhase === 'main' || currentPhase === 'climax') {
      onCardSelect(card, 'hand')
      
      // If it's a climax, auto-play it
      if (card.type === 'climax' && currentPhase === 'climax') {
        onCardAction('play', card, 'hand')
      }
      return
    }
    
    // Default: just select the card
    onCardSelect(card, 'hand')
  }

  return (
    <div className="hand-area">
      <div className="hand-header">
        <div className="hand-label">Hand</div>
        <div className="hand-count">
          <span className="hand-count-label">Cards</span>
          <span className="hand-count-value">{player.hand.length}</span>
        </div>
      </div>

      {player.hand.length > 0 ? (
        <div className="hand-cards">
          {player.hand.map((card, index) => (
            <div
              key={card.id}
              className={`hand-card ${isCardSelected(card) ? 'selected' : ''} ${isCardPlayable(card) ? 'playable' : ''}`}
            >
              <Card
                card={card}
                onClick={handleCardClick}
                showDetails={true}
                showState={false}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="hand-empty">
          <div className="hand-empty-icon">🎴</div>
          <div className="hand-empty-text">No cards in hand</div>
        </div>
      )}

      {availableActions.length > 0 && (
        <div className="hand-actions">
          {availableActions.map((action, index) => (
            <button
              key={index}
              className={`hand-action-button ${action.type === 'clock' ? 'secondary' : action.type === 'discard' ? 'danger' : ''}`}
              onClick={() => onActionClick(action)}
              title={action.description}
            >
              {action.description}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default HandArea
