import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trialDecks } from '../gameLogic/trialDecks'
import './KawaiiMainMenu.css'

const KawaiiMainMenu = ({ 
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
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Create sparkles
    const sparkleInterval = setInterval(() => {
      setSparkles(prev => [...prev.slice(-10), {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2
      }])
    }, 1000)

    return () => {
      clearInterval(timer)
      clearInterval(sparkleInterval)
    }
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
      subtitle: 'Build your perfect deck! 💕',
      icon: '🎴',
      action: onDeckBuilder,
      color: 'pink'
    },
    {
      id: 'card-browser',
      title: 'Card Browser',
      subtitle: 'Explore all cards! ✨',
      icon: '🔍',
      action: onCardBrowser,
      color: 'blue'
    },
    {
      id: 'gameplay-tools',
      title: 'Game Tools',
      subtitle: 'Helpful game tools! 🎮',
      icon: '🛠️',
      action: onGameplayTools,
      color: 'green'
    },
    {
      id: 'rule-reference',
      title: 'Rules',
      subtitle: 'Learn the rules! 📖',
      icon: '📚',
      action: onRuleReference,
      color: 'purple'
    }
  ]

  return (
    <div className="kawaii-main-menu weiss-kawaii">
      {/* Animated Background */}
      <div className="kawaii-background">
        <div className="floating-hearts">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            >
              💕
            </motion.div>
          ))}
        </div>
        
        <AnimatePresence>
          {sparkles.map(sparkle => (
            <motion.div
              key={sparkle.id}
              className="sparkle"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: sparkle.delay, duration: 0.5 }}
            >
              ✨
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Kawaii Header */}
      <motion.div 
        className="kawaii-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="header-content">
          <div className="header-status">
            <div className="status-badge">✨ Welcome to Weiss Schwarz!</div>
            <div className="status-badge">{formatTime(currentTime)}</div>
          </div>
          <div className="header-title">
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="kawaii-bounce"
            >
              Weiss Schwarz Deck Builder
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Build your perfect deck with kawaii cards! 💕✨
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Main Menu Content */}
      <div className="kawaii-grid kawaii-grid-2">
        
        {/* Primary Menu Items */}
        <motion.div 
          className="kawaii-card menu-section"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2 className="section-title">🎮 Main Features</h2>
          <div className="menu-grid">
            {menuItems.slice(0, 2).map((item, index) => (
              <motion.button
                key={item.id}
                onClick={item.action}
                className={`kawaii-btn ${item.color} menu-item`}
                whileHover={{ 
                  scale: 1.05,
                  rotate: 2
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.2 }}
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
          className="kawaii-card menu-section"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="section-title">🛠️ Tools & Help</h2>
          <div className="menu-grid">
            {menuItems.slice(2, 4).map((item, index) => (
              <motion.button
                key={item.id}
                onClick={item.action}
                className={`kawaii-btn ${item.color} menu-item`}
                whileHover={{ 
                  scale: 1.05,
                  rotate: -2
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
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
          className="kawaii-card stats-panel"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <h2 className="section-title">📊 Your Collection</h2>
          <div className="stats-grid">
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-icon">🎴</div>
              <div className="stat-content">
                <div className="stat-label">Trial Decks</div>
                <div className="stat-value">{trialDecks.length}</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-icon">💾</div>
              <div className="stat-content">
                <div className="stat-label">Custom Decks</div>
                <div className="stat-value">{savedDecks.length}</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-icon">💖</div>
              <div className="stat-content">
                <div className="stat-label">Total Cards</div>
                <div className="stat-value">17,489</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="stat-item"
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-icon">✨</div>
              <div className="stat-content">
                <div className="stat-label">System Status</div>
                <div className="stat-value kawaii-pulse">Online</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Tips */}
        <motion.div 
          className="kawaii-card tips-panel"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h2 className="section-title">💡 Quick Tips</h2>
          <div className="tips-list">
            <motion.div 
              className="tip-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
            >
              <span className="tip-icon">🎯</span>
              <span className="tip-text">Build balanced decks with different levels</span>
            </motion.div>
            
            <motion.div 
              className="tip-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6 }}
            >
              <span className="tip-icon">💕</span>
              <span className="tip-text">Use characters you love for better synergy</span>
            </motion.div>
            
            <motion.div 
              className="tip-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.8 }}
            >
              <span className="tip-icon">⚡</span>
              <span className="tip-text">Don't forget climax cards for powerful effects</span>
            </motion.div>
            
            <motion.div 
              className="tip-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0 }}
            >
              <span className="tip-icon">🎨</span>
              <span className="tip-text">Experiment with different color combinations</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Kawaii Footer */}
      <motion.div 
        className="kawaii-footer"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <div className="footer-content">
          <div className="footer-info">
            <span>Made with 💕 for Weiss Schwarz fans</span>
            <span>Version 1.0.0</span>
            <span>Kawaii Edition ✨</span>
          </div>
          <div className="footer-hearts">
            <span className="kawaii-rotate">💖</span>
            <span className="kawaii-bounce">💕</span>
            <span className="kawaii-pulse">✨</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default KawaiiMainMenu
