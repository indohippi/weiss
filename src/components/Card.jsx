import React from 'react'
import './Card.css'

const Card = ({
  card,
  className = '',
  onClick,
  onContextMenu,
  showState = false,
  showDetails = true
}) => {
  if (!card) {
    return <div className={`card empty-card ${className}`}>No Card</div>
  }
  
  // Debug logging for card rendering
  console.log('🃏 Card render:', {
    name: card.name,
    type: card.type,
    level: card.level,
    power: card.power,
    soul: card.soul,
    showDetails,
    showState
  })

  const handleClick = () => {
    if (onClick) {
      onClick(card)
    }
  }

  const getCardTypeIcon = (type) => {
    const typeIcons = {
      'character': '👤',
      'event': '⚡',
      'climax': '💥'
    }
    return typeIcons[type] || '❓'
  }

  const getTriggerIcon = (trigger) => {
    const triggerIcons = {
      'soul': '✨',
      'draw': '⬆️',
      'comeback': '↩️',
      'treasure': '💰',
      'gate': '🚪',
      'choice': '↔️',
      'standby': '🛡️',
      'shot': '🎯'
    }
    return triggerIcons[trigger] || ''
  }

  const [imageError, setImageError] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)

  return (
    <div
      className={`card ${className} card-color-${card.color} ${card.image && !imageError ? 'has-image' : ''}`}
      onClick={handleClick}
      onContextMenu={onContextMenu}
      title={card.ability || card.name}
    >
      {showDetails ? (
        <>
          {card.image && !imageError ? (
            // Show actual card image if available
            <div className="card-image-container">
              {!imageLoaded && (
                <div className="card-image-loading">
                  <div className="loading-spinner-small"></div>
                </div>
              )}
              <img 
                src={card.image} 
                alt={card.name}
                className="card-image"
                style={{ display: imageLoaded ? 'block' : 'none' }}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true)
                  setImageLoaded(false)
                }}
              />
            </div>
          ) : (
            // Fallback to text display if no image available
            <div className="card-text-display">
              <div className="card-header">
                <span className="card-level">L{card.level}</span>
                <span className="card-cost">C{card.cost}</span>
              </div>
              <div className="card-name">{card.name}</div>
              {card.traits && card.traits.length > 0 && (
                <div className="card-traits">
                  {card.traits.slice(0, 2).join(' • ')}
                </div>
              )}
              <div className="card-type-series">
                <span className="card-type">
                  <span className="card-type-icon">{getCardTypeIcon(card.type)}</span>
                  {card.type}
                </span>
                <span className="card-series">{card.series}</span>
              </div>
              <div className="card-stats">
                <span className="card-power">P: {card.power}</span>
                <span className="card-soul">S: {card.soul}</span>
              </div>
              {card.trigger && (
                <div className="card-trigger">
                  {getTriggerIcon(card.trigger)} {card.trigger.toUpperCase()}
                </div>
              )}
              {card.ability && (
                <div className="card-ability">
                  {card.ability.substring(0, 50)}{card.ability.length > 50 ? '...' : ''}
                </div>
              )}
              <div className="card-rarity">{card.rarity}</div>
              <div className="no-image-indicator">📷 No Image</div>
            </div>
          )}
        </>
      ) : (
        <div className="card-back">WS</div>
      )}
      {showState && card.state && (
        <div className={`card-state-indicator card-state-${card.state}`}>
          {card.state.toUpperCase()}
        </div>
      )}
    </div>
  )
}

export default Card
