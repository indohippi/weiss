import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trialDecks } from '../gameLogic/trialDecks'
import './ProfessionalMainMenu.css'

const ProfessionalMainMenu = ({ 
  onStartGame, 
  onDeckBuilder, 
  onTutorial, 
  savedDecks = [],
  showGameplayTools = false,
  onCardBrowser,
  onGameplayTools,
  onRuleReference
}) => {
  const [currentTime, setCurrentTime] = useState(new Date())

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

  const menuItems = [
    {
      id: 'deck-builder',
      title: 'Deck Builder',
      subtitle: 'Construct and analyze decks',
      icon: '🎴',
      action: onDeckBuilder,
      color: 'primary'
    },
    {
      id: 'card-browser',
      title: 'Card Browser',
      subtitle: 'Explore the card database',
      icon: '🔍',
      action: onCardBrowser,
      color: 'secondary'
    },
    {
      id: 'gameplay-tools',
      title: 'Game Tools',
      subtitle: 'Life counter and phase tracker',
      icon: '🛠️',
      action: onGameplayTools,
      color: 'accent'
    },
    {
      id: 'rule-reference',
      title: 'Rule Reference',
      subtitle: 'Learn the game rules',
      icon: '📖',
      action: onRuleReference,
      color: 'info'
    }
  ]

  return (
    <div className="professional-main-menu professional-weiss">
      {/* Professional Header */}
      <motion.div 
        className="professional-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="header-content">
          <div className="header-status">
            <div className="status-badge">WEISS SCHWARZ</div>
            <div className="status-badge">{formatTime(currentTime)}</div>
          </div>
          <div className="header-title">
            <motion.h1
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Weiss Schwarz Deck Builder
            </motion.h1>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Professional deck construction and analysis platform
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Main Menu Content */}
      <div className="professional-grid professional-grid-2">
        
        {/* Primary Menu Items */}
        <motion.div 
          className="professional-card menu-section"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="section-title">Core Features</h2>
          <div className="menu-grid">
            {menuItems.slice(0, 2).map((item, index) => (
              <motion.button
                key={item.id}
                onClick={item.action}
                className={`professional-btn ${item.color} menu-item`}
                whileHover={{ 
                  scale: 1.02,
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="menu-icon">{item.icon}</div>
                <div className="menu-content">
                  <div className="menu-title">{item.title}</div>
                  <div className="menu-subtitle">{item.subtitle}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Secondary Menu Items */}
        <motion.div 
          className="professional-card menu-section"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="section-title">Tools & Resources</h2>
          <div className="menu-grid">
            {menuItems.slice(2, 4).map((item, index) => (
              <motion.button
                key={item.id}
                onClick={item.action}
                className={`professional-btn ${item.color} menu-item`}
                whileHover={{ 
                  scale: 1.02,
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="menu-icon">{item.icon}</div>
                <div className="menu-content">
                  <div className="menu-title">{item.title}</div>
                  <div className="menu-subtitle">{item.subtitle}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats Panel */}
        <motion.div 
          className="professional-card stats-panel"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="section-title">System Status</h2>
          <div className="stats-grid">
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.02 }}
            >
              <div className="stat-icon">🎴</div>
              <div className="stat-content">
                <div className="stat-label">Trial Decks</div>
                <div className="stat-value">{trialDecks.length}</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.02 }}
            >
              <div className="stat-icon">💾</div>
              <div className="stat-content">
                <div className="stat-label">Custom Decks</div>
                <div className="stat-value">{savedDecks.length}</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.02 }}
            >
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-label">Total Cards</div>
                <div className="stat-value">17,489</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.02 }}
            >
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-label">System Status</div>
                <div className="stat-value">Online</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Tips */}
        <motion.div 
          className="professional-card tips-panel"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="section-title">Quick Tips</h2>
          <div className="tips-list">
            <motion.div 
              className="tip-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <span className="tip-icon">⚖️</span>
              <span className="tip-text">Build balanced decks with appropriate level distribution</span>
            </motion.div>
            
            <motion.div 
              className="tip-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
            >
              <span className="tip-icon">🎯</span>
              <span className="tip-text">Focus on character synergy and trait combinations</span>
            </motion.div>
            
            <motion.div 
              className="tip-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
            >
              <span className="tip-icon">⚡</span>
              <span className="tip-text">Include climax cards for powerful game-changing effects</span>
            </motion.div>
            
            <motion.div 
              className="tip-item"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <span className="tip-icon">🎨</span>
              <span className="tip-text">Experiment with different color combinations and strategies</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Professional Footer */}
      <motion.div 
        className="professional-footer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <div className="footer-content">
          <div className="footer-info">
            <span>Weiss Schwarz Deck Builder v1.0.0</span>
            <span>Professional Edition</span>
            <span>© 2024</span>
          </div>
          <div className="footer-status">
            <span className="status-indicator online"></span>
            <span>System Online</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProfessionalMainMenu
