import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import './RetroCard.css'

const RetroCard = ({ 
  card, 
  className = '', 
  onClick, 
  onContextMenu, 
  showState = false, 
  showDetails = true,
  isSelected = false,
  isHovered = false
}) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Animation springs
  const hoverSpring = useSpring({
    transform: isHovered ? 'scale(1.05) translateY(-10px)' : 'scale(1) translateY(0)',
    boxShadow: isHovered 
      ? '0 20px 40px rgba(0, 255, 65, 0.3)' 
      : '0 4px 15px rgba(0, 0, 0, 0.6)',
    config: { tension: 300, friction: 30 }
  })

  const selectedSpring = useSpring({
    borderColor: isSelected ? '#ffaa00' : '#00ff41',
    boxShadow: isSelected 
      ? '0 0 20px rgba(255, 170, 0, 0.5)' 
      : '0 4px 15px rgba(0, 0, 0, 0.6)',
    config: { tension: 300, friction: 30 }
  })

  if (!card) {
    return (
      <motion.div 
        className={`retro-card empty-card ${className}`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-content">
          <div className="card-header">
            <span className="card-type">NO CARD</span>
          </div>
          <div className="card-body">
            <div className="card-image-placeholder">
              <span>?</span>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const getCardColor = (level) => {
    switch (level) {
      case 0: return '#00ff41' // Green
      case 1: return '#0080ff' // Blue  
      case 2: return '#ffaa00' // Amber
      case 3: return '#ff0040' // Red
      default: return '#808080' // Gray
    }
  }

  const cardColor = getCardColor(card.level)

  return (
    <motion.div
      className={`retro-card ${className} ${isSelected ? 'selected' : ''}`}
      style={{
        '--card-color': cardColor
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      <animated.div 
        className="card-container"
        style={{
          ...hoverSpring,
          ...selectedSpring
        }}
      >
        {/* Card Header */}
        <div className="card-header">
          <div className="card-level">
            <span className="level-text">L{card.level}</span>
          </div>
          <div className="card-type">
            <span className="type-text">{card.type?.toUpperCase() || 'UNKNOWN'}</span>
          </div>
          <div className="card-cost">
            {card.cost && <span className="cost-text">{card.cost}</span>}
          </div>
        </div>

        {/* Card Image */}
        <div className="card-image-container">
          {card.image && !imageError ? (
            <motion.img
              src={card.image}
              alt={card.name}
              className="card-image"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="card-image-placeholder">
              <div className="placeholder-icon">
                {card.type === 'character' ? '👤' : 
                 card.type === 'event' ? '⚡' : 
                 card.type === 'climax' ? '💥' : '❓'}
              </div>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="card-body">
          <div className="card-name">
            <h3>{card.name}</h3>
          </div>
          
          {showDetails && (
            <>
              {/* Card Stats */}
              <div className="card-stats">
                {card.power && (
                  <div className="stat-item">
                    <span className="stat-label">PWR</span>
                    <span className="stat-value">{card.power}</span>
                  </div>
                )}
                {card.soul && (
                  <div className="stat-item">
                    <span className="stat-label">SOUL</span>
                    <span className="stat-value">{card.soul}</span>
                  </div>
                )}
                {card.trigger && (
                  <div className="stat-item">
                    <span className="stat-label">TRIG</span>
                    <span className="stat-value">{card.trigger}</span>
                  </div>
                )}
              </div>

              {/* Card Traits */}
              {card.traits && card.traits.length > 0 && (
                <div className="card-traits">
                  <div className="traits-label">TRAITS:</div>
                  <div className="traits-list">
                    {card.traits.map((trait, index) => (
                      <span key={index} className="trait-tag">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Ability */}
              {card.ability && (
                <div className="card-ability">
                  <div className="ability-label">ABILITY:</div>
                  <div className="ability-text">
                    {card.ability.length > 100 
                      ? `${card.ability.substring(0, 100)}...` 
                      : card.ability
                    }
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Card Footer */}
        <div className="card-footer">
          <div className="card-set">
            {card.set && <span className="set-text">{card.set}</span>}
          </div>
          <div className="card-id">
            {card.id && <span className="id-text">{card.id}</span>}
          </div>
        </div>

        {/* Selection Indicator */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className="selection-indicator"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="selection-border"></div>
              <div className="selection-glow"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover Effects */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="hover-effects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="scan-line"></div>
              <div className="glow-effect"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </animated.div>
    </motion.div>
  )
}

export default RetroCard
