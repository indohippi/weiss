import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { trialDecks } from '../gameLogic/trialDecks'
import tacticalSounds from '../utils/tacticalSounds'
import './EnhancedTacticalMenu.css'

const EnhancedTacticalMenu = ({ 
  onStartGame, 
  onDeckBuilder, 
  onTutorial, 
  savedDecks = [],
  showGameplayTools = false,
  onCardBrowser,
  onGameplayTools,
  onRuleReference
}) => {
  const [systemStatus, setSystemStatus] = useState('ONLINE')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [scanningLine, setScanningLine] = useState(0)
  const [selectedOperation, setSelectedOperation] = useState(null)

  // Animation springs
  const scanAnimation = useSpring({
    from: { x: -100 },
    to: { x: 100 },
    loop: true,
    config: { duration: 3000 }
  })

  const pulseAnimation = useSpring({
    from: { opacity: 0.5 },
    to: { opacity: 1 },
    loop: { reverse: true },
    config: { duration: 2000 }
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const operations = [
    {
      id: 'deck-builder',
      title: 'DECK CONSTRUCTION',
      subtitle: 'Build tactical card formations',
      icon: '🎴',
      action: onDeckBuilder,
      color: 'green'
    },
    {
      id: 'card-browser',
      title: 'INTEL DATABASE',
      subtitle: 'Access card intelligence',
      icon: '🔍',
      action: onCardBrowser,
      color: 'blue'
    },
    {
      id: 'gameplay-tools',
      title: 'TACTICAL HUD',
      subtitle: 'Mission support tools',
      icon: '🎮',
      action: onGameplayTools,
      color: 'amber'
    },
    {
      id: 'rule-reference',
      title: 'PROTOCOL MANUAL',
      subtitle: 'Rules and procedures',
      icon: '📖',
      action: onRuleReference,
      color: 'red'
    }
  ]

  return (
    <div className="enhanced-tactical-menu">
      {/* Animated Background */}
      <div className="tactical-background">
        <div className="scan-lines"></div>
        <div className="grid-overlay"></div>
        <animated.div 
          className="scanning-line"
          style={{
            transform: scanAnimation.x.to(x => `translateX(${x}%)`)
          }}
        />
      </div>

      {/* Tactical Header */}
      <motion.div 
        className="tactical-header-bar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="system-info">
          <div className="system-status">
            <animated.span 
              className="tactical-status online"
              style={pulseAnimation}
            >
              SYSTEM {systemStatus}
            </animated.span>
            <span className="system-time">{formatTime(currentTime)}</span>
          </div>
          <div className="mission-title">
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              WEISS SCHWARZ TACTICAL DECK BUILDER
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              CLASSIFIED OPERATION - DECK CONSTRUCTION PROTOCOL
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Main Tactical Interface */}
      <div className="tactical-interface">
        <div className="tactical-grid tactical-grid-2">
          
          {/* Primary Operations */}
          <motion.div 
            className="tactical-panel primary-operations"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="tactical-header">PRIMARY OPERATIONS</h2>
            <div className="operation-grid">
              {operations.slice(0, 2).map((operation, index) => (
                <motion.button
                  key={operation.id}
                  onClick={() => {
                    tacticalSounds.playBeep()
                    operation.action()
                  }}
                  onMouseEnter={() => tacticalSounds.playHover()}
                  className={`tactical-btn ${operation.color} operation-btn`}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(0, 255, 65, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                >
                  <div className="btn-icon">{operation.icon}</div>
                  <div className="btn-content">
                    <div className="btn-title">{operation.title}</div>
                    <div className="btn-subtitle">{operation.subtitle}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Support Operations */}
          <motion.div 
            className="tactical-panel support-operations"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="tactical-header">SUPPORT OPERATIONS</h2>
            <div className="operation-grid">
              {operations.slice(2, 4).map((operation, index) => (
                <motion.button
                  key={operation.id}
                  onClick={() => {
                    tacticalSounds.playBeep()
                    operation.action()
                  }}
                  onMouseEnter={() => tacticalSounds.playHover()}
                  className={`tactical-btn ${operation.color} operation-btn`}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(0, 255, 65, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.2 }}
                >
                  <div className="btn-icon">{operation.icon}</div>
                  <div className="btn-content">
                    <div className="btn-title">{operation.title}</div>
                    <div className="btn-subtitle">{operation.subtitle}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Mission Status */}
          <motion.div 
            className="tactical-panel mission-status"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            <h2 className="tactical-header">MISSION STATUS</h2>
            <div className="status-grid">
              <motion.div 
                className="status-item"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 255, 65, 0.1)" }}
              >
                <span className="status-label">TRIAL DECKS:</span>
                <span className="status-value">{trialDecks.length}</span>
              </motion.div>
              <motion.div 
                className="status-item"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 255, 65, 0.1)" }}
              >
                <span className="status-label">CUSTOM DECKS:</span>
                <span className="status-value">{savedDecks.length}</span>
              </motion.div>
              <motion.div 
                className="status-item"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 255, 65, 0.1)" }}
              >
                <span className="status-label">CARD DATABASE:</span>
                <span className="status-value">17,489 CARDS</span>
              </motion.div>
              <motion.div 
                className="status-item"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 255, 65, 0.1)" }}
              >
                <span className="status-label">SYSTEM STATUS:</span>
                <animated.span 
                  className="status-value tactical-status online"
                  style={pulseAnimation}
                >
                  OPERATIONAL
                </animated.span>
              </motion.div>
            </div>
          </motion.div>

          {/* System Diagnostics */}
          <motion.div 
            className="tactical-panel system-diagnostics"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <h2 className="tactical-header">SYSTEM DIAGNOSTICS</h2>
            <div className="diagnostic-grid">
              <motion.div 
                className="diagnostic-item"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <div className="diagnostic-label">CPU USAGE</div>
                <div className="tactical-progress">
                  <motion.div 
                    className="tactical-progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: '25%' }}
                    transition={{ delay: 1.6, duration: 1 }}
                  />
                </div>
                <div className="diagnostic-value">25%</div>
              </motion.div>
              
              <motion.div 
                className="diagnostic-item"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <div className="diagnostic-label">MEMORY</div>
                <div className="tactical-progress">
                  <motion.div 
                    className="tactical-progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ delay: 1.8, duration: 1 }}
                  />
                </div>
                <div className="diagnostic-value">60%</div>
              </motion.div>
              
              <motion.div 
                className="diagnostic-item"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <div className="diagnostic-label">NETWORK</div>
                <div className="tactical-progress">
                  <motion.div 
                    className="tactical-progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: '90%' }}
                    transition={{ delay: 2.0, duration: 1 }}
                  />
                </div>
                <div className="diagnostic-value">90%</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Tactical Footer */}
        <motion.div 
          className="tactical-footer"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <div className="footer-info">
            <span>CLASSIFICATION: UNCLASSIFIED</span>
            <span>VERSION: 1.0.0</span>
            <span>BUILD: TACTICAL-ALPHA</span>
          </div>
          <motion.div 
            className="footer-warning"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>⚠️ UNAUTHORIZED ACCESS PROHIBITED</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default EnhancedTacticalMenu
