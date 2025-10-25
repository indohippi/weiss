import React, { useState, useEffect } from 'react'
import './CardAnimations.css'

const CardAnimations = ({ 
  gameState, 
  currentPhase, 
  onCardSelect, 
  onCardAction,
  selectedCard 
}) => {
  const [animations, setAnimations] = useState({})
  const [particleEffects, setParticleEffects] = useState([])
  const [cardTransitions, setCardTransitions] = useState([])

  // Trigger card draw animation
  const triggerCardDraw = (playerId, card) => {
    const animationId = `draw-${playerId}-${Date.now()}`
    setAnimations(prev => ({
      ...prev,
      [animationId]: {
        type: 'draw',
        card,
        playerId,
        timestamp: Date.now()
      }
    }))

    // Add particle effect
    setParticleEffects(prev => [...prev, {
      id: animationId,
      type: 'sparkle',
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      timestamp: Date.now()
    }])

    // Remove animation after duration
    setTimeout(() => {
      setAnimations(prev => {
        const newAnimations = { ...prev }
        delete newAnimations[animationId]
        return newAnimations
      })
    }, 2000)
  }

  // Trigger card play animation
  const triggerCardPlay = (card, fromLocation, toLocation) => {
    const animationId = `play-${card.id}-${Date.now()}`
    setCardTransitions(prev => [...prev, {
      id: animationId,
      card,
      fromLocation,
      toLocation,
      timestamp: Date.now()
    }])

    // Add magic effect
    setParticleEffects(prev => [...prev, {
      id: animationId,
      type: 'magic',
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      timestamp: Date.now()
    }])

    // Remove transition after duration
    setTimeout(() => {
      setCardTransitions(prev => prev.filter(t => t.id !== animationId))
    }, 1500)
  }

  // Trigger attack animation
  const triggerAttack = (attacker, defender) => {
    const animationId = `attack-${attacker.id}-${Date.now()}`
    setAnimations(prev => ({
      ...prev,
      [animationId]: {
        type: 'attack',
        attacker,
        defender,
        timestamp: Date.now()
      }
    }))

    // Add impact effect
    setParticleEffects(prev => [...prev, {
      id: animationId,
      type: 'impact',
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      timestamp: Date.now()
    }])

    setTimeout(() => {
      setAnimations(prev => {
        const newAnimations = { ...prev }
        delete newAnimations[animationId]
        return newAnimations
      })
    }, 3000)
  }

  // Trigger level up animation
  const triggerLevelUp = (playerId, newLevel) => {
    const animationId = `levelup-${playerId}-${Date.now()}`
    setAnimations(prev => ({
      ...prev,
      [animationId]: {
        type: 'levelup',
        playerId,
        newLevel,
        timestamp: Date.now()
      }
    }))

    // Add level up effect
    setParticleEffects(prev => [...prev, {
      id: animationId,
      type: 'levelup',
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      timestamp: Date.now()
    }])

    setTimeout(() => {
      setAnimations(prev => {
        const newAnimations = { ...prev }
        delete newAnimations[animationId]
        return newAnimations
      })
    }, 4000)
  }

  // Clean up old particle effects
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setParticleEffects(prev => prev.filter(effect => now - effect.timestamp < 5000))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!gameState) return null

  const allPlayers = gameState.players || []
  const currentPlayer = allPlayers.find(p => p.turn) || allPlayers[0]

  return (
    <div className="card-animations">
      {/* Card Draw Animations */}
      {Object.values(animations).map(animation => {
        if (animation.type === 'draw') {
          return (
            <div
              key={animation.timestamp}
              className="draw-animation"
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000
              }}
            >
              <div className="draw-card">
                <div className="card-glow"></div>
                <div className="card-content">
                  <div className="card-name">{animation.card.name}</div>
                  <div className="card-level">L{animation.card.level}</div>
                </div>
              </div>
            </div>
          )
        }

        if (animation.type === 'attack') {
          return (
            <div
              key={animation.timestamp}
              className="attack-animation"
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000
              }}
            >
              <div className="attack-effect">
                <div className="attack-line"></div>
                <div className="impact-explosion"></div>
              </div>
            </div>
          )
        }

        if (animation.type === 'levelup') {
          return (
            <div
              key={animation.timestamp}
              className="levelup-animation"
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1000
              }}
            >
              <div className="levelup-effect">
                <div className="levelup-text">LEVEL UP!</div>
                <div className="levelup-number">L{animation.newLevel}</div>
              </div>
            </div>
          )
        }

        return null
      })}

      {/* Card Transitions */}
      {cardTransitions.map(transition => (
        <div
          key={transition.id}
          className="card-transition"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000
          }}
        >
          <div className="transition-card">
            <div className="card-name">{transition.card.name}</div>
            <div className="transition-effect"></div>
          </div>
        </div>
      ))}

      {/* Particle Effects */}
      {particleEffects.map(effect => {
        if (effect.type === 'sparkle') {
          return (
            <div
              key={effect.id}
              className="sparkle-effect"
              style={{
                position: 'fixed',
                left: effect.x,
                top: effect.y,
                zIndex: 999
              }}
            >
              <div className="sparkle"></div>
            </div>
          )
        }

        if (effect.type === 'magic') {
          return (
            <div
              key={effect.id}
              className="magic-effect"
              style={{
                position: 'fixed',
                left: effect.x,
                top: effect.y,
                zIndex: 999
              }}
            >
              <div className="magic-circle"></div>
            </div>
          )
        }

        if (effect.type === 'impact') {
          return (
            <div
              key={effect.id}
              className="impact-effect"
              style={{
                position: 'fixed',
                left: effect.x,
                top: effect.y,
                zIndex: 999
              }}
            >
              <div className="impact-ring"></div>
            </div>
          )
        }

        if (effect.type === 'levelup') {
          return (
            <div
              key={effect.id}
              className="levelup-particles"
              style={{
                position: 'fixed',
                left: effect.x,
                top: effect.y,
                zIndex: 999
              }}
            >
              <div className="levelup-particle"></div>
              <div className="levelup-particle"></div>
              <div className="levelup-particle"></div>
            </div>
          )
        }

        return null
      })}

      {/* Phase Transition Effects */}
      {currentPhase && (
        <div className="phase-transition">
          <div className="phase-glow" style={{ backgroundColor: getPhaseColor(currentPhase) }}></div>
        </div>
      )}
    </div>
  )
}

const getPhaseColor = (phase) => {
  const colors = {
    stand: '#10b981',
    draw: '#3b82f6', 
    clock: '#f59e0b',
    main: '#8b5cf6',
    climax: '#ec4899',
    attack: '#ef4444',
    end: '#6b7280'
  }
  return colors[phase] || '#6b7280'
}

export default CardAnimations
