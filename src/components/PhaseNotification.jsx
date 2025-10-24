import React, { useEffect, useState } from 'react'
import './PhaseNotification.css'

const PhaseNotification = ({ phase, show, onComplete }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        if (onComplete) onComplete()
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [show, phase, onComplete])

  if (!visible) return null

  const getPhaseInfo = (phaseName) => {
    const phaseData = {
      stand: { icon: '🧍', color: '#10b981', text: 'STAND PHASE' },
      draw: { icon: '📥', color: '#4f9eff', text: 'DRAW PHASE' },
      clock: { icon: '⏰', color: '#f59e0b', text: 'CLOCK PHASE' },
      main: { icon: '🎴', color: '#8b5cf6', text: 'MAIN PHASE' },
      climax: { icon: '💥', color: '#ef4444', text: 'CLIMAX PHASE' },
      attack: { icon: '⚔️', color: '#dc2626', text: 'ATTACK PHASE' },
      end: { icon: '🔚', color: '#6b7280', text: 'END PHASE' }
    }
    return phaseData[phaseName] || { icon: '❓', color: '#9ca3af', text: 'UNKNOWN PHASE' }
  }

  const info = getPhaseInfo(phase)

  return (
    <div className="phase-notification" style={{ borderColor: info.color }}>
      <div className="notification-icon" style={{ color: info.color }}>
        {info.icon}
      </div>
      <div className="notification-text" style={{ color: info.color }}>
        {info.text}
      </div>
    </div>
  )
}

export default PhaseNotification

