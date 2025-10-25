import React from 'react'
import './ImprovedCard.css'

const ImprovedCard = ({
  card,
  className = '',
  onClick,
  onContextMenu,
  showState = false,
  showDetails = true
}) => {
  // Debug logging
  console.log('🃏 ImprovedCard render:', {
    hasCard: !!card,
    cardName: card?.name,
    cardType: card?.type,
    cardLevel: card?.level,
    className
  })

  if (!card) {
    return (
      <div className={`improved-card empty-card ${className}`}>
        <div className="card-back">
          <div className="card-back-pattern"></div>
          <div className="card-back-logo">WS</div>
        </div>
      </div>
    )
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
      'soul': '💫',
      'draw': '📥',
      'comeback': '🔄',
      'treasure': '💰',
      'gate': '🚪',
      'standby': '🛡️',
      'shot': '🎯'
    }
    return triggerIcons[trigger] || ''
  }

  const getColorClass = (color) => {
    const colorMap = {
      'red': 'red',
      'blue': 'blue', 
      'green': 'green',
      'yellow': 'yellow',
      'purple': 'purple'
    }
    return colorMap[color] || 'neutral'
  }

  const handleClick = () => {
    if (onClick) {
      onClick(card)
    }
  }

  return (
    <div
      className={`improved-card ${getColorClass(card.color)} ${className}`}
      onClick={handleClick}
      onContextMenu={onContextMenu}
      title={card.ability || card.name}
    >
      {/* Card Header */}
      <div className="card-header">
        <div className="card-level">L{card.level}</div>
        <div className="card-cost">C{card.cost}</div>
        <div className="card-type-icon">{getCardTypeIcon(card.type)}</div>
      </div>

      {/* Card Name */}
      <div className="card-name">{card.name}</div>

      {/* Card Traits */}
      {card.traits && card.traits.length > 0 && (
        <div className="card-traits">
          {card.traits.slice(0, 2).join(' • ')}
        </div>
      )}

      {/* Card Stats */}
      <div className="card-stats">
        <div className="stat power">
          <span className="stat-label">PWR</span>
          <span className="stat-value">{card.power}</span>
        </div>
        <div className="stat soul">
          <span className="stat-label">SOUL</span>
          <span className="stat-value">{card.soul}</span>
        </div>
      </div>

      {/* Card Ability */}
      {showDetails && card.ability && (
        <div className="card-ability">
          {card.ability.length > 50 
            ? `${card.ability.substring(0, 50)}...` 
            : card.ability
          }
        </div>
      )}

      {/* Card Trigger */}
      {card.trigger && (
        <div className="card-trigger">
          <span className="trigger-icon">{getTriggerIcon(card.trigger)}</span>
          <span className="trigger-text">{card.trigger.toUpperCase()}</span>
        </div>
      )}

      {/* Card State Indicator */}
      {showState && card.state && (
        <div className={`card-state-indicator ${card.state}`}>
          {card.state === 'stand' && '⚡'}
          {card.state === 'rest' && '😴'}
          {card.state === 'reverse' && '🔄'}
        </div>
      )}
    </div>
  )
}

export default ImprovedCard
