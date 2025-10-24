import React, { useEffect } from 'react'
import './CardModal.css'

const CardModal = ({ card, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!card) return null

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

  return (
    <div className="card-modal-overlay" onClick={onClose}>
      <div className="card-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="card-modal-close" onClick={onClose}>
          ✕
        </button>
        
        <div className="card-modal-grid">
          {/* Left side - Card Image */}
          <div className="card-modal-image-section">
            {card.image ? (
              <img 
                src={card.image} 
                alt={card.name}
                className="card-modal-image"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
            ) : null}
            <div 
              className="card-modal-image-placeholder" 
              style={{ display: card.image ? 'none' : 'flex' }}
            >
              <div className="placeholder-text">
                <div className="placeholder-icon">🎴</div>
                <div>No Image Available</div>
              </div>
            </div>
          </div>

          {/* Right side - Card Details */}
          <div className="card-modal-details">
            <div className="card-modal-header">
              <h2 className="card-modal-title">{card.name}</h2>
              <div className="card-modal-code">{card.code || card.id}</div>
            </div>

            <div className="card-modal-stats">
              <div className={`stat-badge stat-level color-${card.color}`}>
                <span className="stat-label">Level</span>
                <span className="stat-value">{card.level}</span>
              </div>
              <div className={`stat-badge stat-cost color-${card.color}`}>
                <span className="stat-label">Cost</span>
                <span className="stat-value">{card.cost}</span>
              </div>
              <div className={`stat-badge stat-power color-${card.color}`}>
                <span className="stat-label">Power</span>
                <span className="stat-value">{card.power}</span>
              </div>
              <div className={`stat-badge stat-soul color-${card.color}`}>
                <span className="stat-label">Soul</span>
                <span className="stat-value">{card.soul}</span>
              </div>
            </div>

            <div className="card-modal-info">
              <div className="info-row">
                <span className="info-label">Type:</span>
                <span className={`info-value type-${card.type}`}>
                  {card.type?.toUpperCase() || 'Unknown'}
                </span>
              </div>
              <div className="info-row">
                <span className="info-label">Color:</span>
                <span className={`info-value color-badge color-${card.color}`}>
                  {card.color?.toUpperCase() || 'Unknown'}
                </span>
              </div>
              {card.trigger && (
                <div className="info-row">
                  <span className="info-label">Trigger:</span>
                  <span className="info-value trigger-badge">
                    {getTriggerIcon(card.trigger)} {card.trigger.toUpperCase()}
                  </span>
                </div>
              )}
              {card.traits && card.traits.length > 0 && (
                <div className="info-row">
                  <span className="info-label">Traits:</span>
                  <span className="info-value">
                    {card.traits.join(' • ')}
                  </span>
                </div>
              )}
              <div className="info-row">
                <span className="info-label">Rarity:</span>
                <span className="info-value rarity-badge">
                  {card.rarity || 'Unknown'}
                </span>
              </div>
              {card.series && (
                <div className="info-row">
                  <span className="info-label">Series:</span>
                  <span className="info-value">{card.series}</span>
                </div>
              )}
              {card.expansion && (
                <div className="info-row">
                  <span className="info-label">Expansion:</span>
                  <span className="info-value">{card.expansion}</span>
                </div>
              )}
            </div>

            {card.ability && (
              <div className="card-modal-ability">
                <h3>Card Ability</h3>
                <div className="ability-text">
                  {Array.isArray(card.ability) ? (
                    card.ability.map((ability, index) => (
                      <p key={index}>{ability}</p>
                    ))
                  ) : (
                    card.ability.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))
                  )}
                </div>
              </div>
            )}

            {card.flavorText && card.flavorText !== '-' && (
              <div className="card-modal-flavor">
                <h3>Flavor Text</h3>
                <p className="flavor-text">{card.flavorText}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardModal

