import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import RetroCard from './RetroCard'
import tacticalSounds from '../utils/tacticalSounds'
import './EnhancedDeckBuilder.css'

const EnhancedDeckBuilder = ({ allCards, cardsLoading, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedColor, setSelectedColor] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [deck, setDeck] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [showCardDetails, setShowCardDetails] = useState(false)

  const cardsPerPage = 20
  const maxDeckSize = 50

  // Animation springs
  const deckSpring = useSpring({
    from: { opacity: 0, y: 20 },
    to: { opacity: 1, y: 0 },
    config: { tension: 300, friction: 30 }
  })

  const searchSpring = useSpring({
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 300, friction: 30 }
  })

  // Filter cards based on search and filters
  const filteredCards = allCards.filter(card => {
    const matchesSearch = card.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.traits?.some(trait => trait.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesLevel = selectedLevel === 'all' || card.level === parseInt(selectedLevel)
    const matchesType = selectedType === 'all' || card.type === selectedType
    const matchesColor = selectedColor === 'all' || card.color === selectedColor
    
    return matchesSearch && matchesLevel && matchesType && matchesColor
  })

  // Pagination
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage)
  const startIndex = (currentPage - 1) * cardsPerPage
  const endIndex = startIndex + cardsPerPage
  const currentCards = filteredCards.slice(startIndex, endIndex)

  // Add card to deck
  const addCardToDeck = (card) => {
    const cardCount = deck.filter(c => c.id === card.id).length
    if (cardCount < 4 && deck.length < maxDeckSize) {
      setDeck([...deck, { ...card, deckId: `${card.id}-${Date.now()}` }])
      tacticalSounds.playCardAdd()
    } else {
      tacticalSounds.playError()
    }
  }

  // Remove card from deck
  const removeCardFromDeck = (cardToRemove) => {
    const deckIndex = deck.findIndex(c => c.deckId === cardToRemove.deckId)
    if (deckIndex !== -1) {
      const newDeck = [...deck]
      newDeck.splice(deckIndex, 1)
      setDeck(newDeck)
      tacticalSounds.playCardRemove()
    }
  }

  // Get deck statistics
  const getDeckStats = () => {
    const stats = {
      total: deck.length,
      byLevel: { 0: 0, 1: 0, 2: 0, 3: 0 },
      byType: { character: 0, event: 0, climax: 0 },
      byColor: {}
    }

    deck.forEach(card => {
      stats.byLevel[card.level] = (stats.byLevel[card.level] || 0) + 1
      stats.byType[card.type] = (stats.byType[card.type] || 0) + 1
      stats.byColor[card.color] = (stats.byColor[card.color] || 0) + 1
    })

    return stats
  }

  const deckStats = getDeckStats()

  return (
    <div className="enhanced-deck-builder retro-tactical">
      {/* Tactical Header */}
      <motion.div 
        className="tactical-header-bar"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="system-info">
          <div className="system-status">
            <span className="tactical-status online">DECK CONSTRUCTION ACTIVE</span>
            <span className="system-time">{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="mission-title">
            <h1>WEISS SCHWARZ DECK CONSTRUCTION</h1>
            <p>TACTICAL CARD FORMATION PROTOCOL</p>
          </div>
        </div>
      </motion.div>

      <div className="deck-builder-interface">
        <div className="builder-grid">
          
          {/* Search and Filters */}
          <motion.div 
            className="tactical-panel search-panel"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="tactical-header">INTEL SEARCH</h2>
            
            <animated.div style={searchSpring} className="search-controls">
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="SEARCH CARDS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="tactical-input search-input"
                />
                <div className="search-icon">🔍</div>
              </div>

              <div className="filter-grid">
                <div className="filter-group">
                  <label className="filter-label">LEVEL</label>
                  <select 
                    value={selectedLevel} 
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="tactical-input filter-select"
                  >
                    <option value="all">ALL LEVELS</option>
                    <option value="0">LEVEL 0</option>
                    <option value="1">LEVEL 1</option>
                    <option value="2">LEVEL 2</option>
                    <option value="3">LEVEL 3</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">TYPE</label>
                  <select 
                    value={selectedType} 
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="tactical-input filter-select"
                  >
                    <option value="all">ALL TYPES</option>
                    <option value="character">CHARACTER</option>
                    <option value="event">EVENT</option>
                    <option value="climax">CLIMAX</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label className="filter-label">COLOR</label>
                  <select 
                    value={selectedColor} 
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="tactical-input filter-select"
                  >
                    <option value="all">ALL COLORS</option>
                    <option value="red">RED</option>
                    <option value="blue">BLUE</option>
                    <option value="green">GREEN</option>
                    <option value="yellow">YELLOW</option>
                  </select>
                </div>
              </div>
            </animated.div>
          </motion.div>

          {/* Card Browser */}
          <motion.div 
            className="tactical-panel card-browser"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h2 className="tactical-header">CARD DATABASE</h2>
            
            <div className="browser-controls">
              <div className="results-info">
                <span className="results-text">
                  {filteredCards.length} CARDS FOUND
                </span>
              </div>
              
              <div className="pagination">
                <button 
                  onClick={() => {
                    tacticalSounds.playPageTurn()
                    setCurrentPage(Math.max(1, currentPage - 1))
                  }}
                  className="tactical-btn secondary"
                  disabled={currentPage === 1}
                >
                  ← PREV
                </button>
                <span className="page-info">
                  PAGE {currentPage} OF {totalPages}
                </span>
                <button 
                  onClick={() => {
                    tacticalSounds.playPageTurn()
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }}
                  className="tactical-btn secondary"
                  disabled={currentPage === totalPages}
                >
                  NEXT →
                </button>
              </div>
            </div>

            <div className="card-grid">
              <AnimatePresence>
                {currentCards.map((card, index) => (
                  <motion.div
                    key={`${card.id}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RetroCard
                      card={card}
                      onClick={() => {
                        setSelectedCard(card)
                        setShowCardDetails(true)
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault()
                        addCardToDeck(card)
                      }}
                      showDetails={true}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Deck Builder */}
          <animated.div 
            className="tactical-panel deck-builder"
            style={deckSpring}
          >
            <h2 className="tactical-header">DECK CONSTRUCTION</h2>
            
            <div className="deck-stats">
              <div className="stat-row">
                <span className="stat-label">DECK SIZE:</span>
                <span className="stat-value">{deckStats.total}/50</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">LEVEL 0:</span>
                <span className="stat-value">{deckStats.byLevel[0]}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">LEVEL 1:</span>
                <span className="stat-value">{deckStats.byLevel[1]}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">LEVEL 2:</span>
                <span className="stat-value">{deckStats.byLevel[2]}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">LEVEL 3:</span>
                <span className="stat-value">{deckStats.byLevel[3]}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">CLIMAX:</span>
                <span className="stat-value">{deckStats.byType.climax}</span>
              </div>
            </div>

            <div className="deck-list">
              <div className="deck-header">
                <span className="deck-title">CURRENT DECK</span>
                <span className="deck-count">{deck.length} CARDS</span>
              </div>
              
              <div className="deck-cards">
                <AnimatePresence>
                  {deck.map((card, index) => (
                    <motion.div
                      key={card.deckId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.02 }}
                      className="deck-card-item"
                    >
                      <RetroCard
                        card={card}
                        className="deck-card"
                        onClick={() => removeCardFromDeck(card)}
                        showDetails={false}
                      />
                      <button 
                        className="remove-btn"
                        onClick={() => removeCardFromDeck(card)}
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </animated.div>
        </div>

        {/* Tactical Footer */}
        <motion.div 
          className="tactical-footer"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <button onClick={onBack} className="tactical-btn secondary">
            ← RETURN TO COMMAND
          </button>
          <div className="footer-info">
            <span>DECK CONSTRUCTION PROTOCOL</span>
            <span>CARDS LOADED: {allCards.length}</span>
          </div>
        </motion.div>
      </div>

      {/* Card Details Modal */}
      <AnimatePresence>
        {showCardDetails && selectedCard && (
          <motion.div
            className="card-details-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCardDetails(false)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>CARD DETAILS</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowCardDetails(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="modal-body">
                <RetroCard
                  card={selectedCard}
                  showDetails={true}
                  className="large-card"
                />
                <div className="card-info">
                  <h4>{selectedCard.name}</h4>
                  <p><strong>Type:</strong> {selectedCard.type}</p>
                  <p><strong>Level:</strong> {selectedCard.level}</p>
                  <p><strong>Power:</strong> {selectedCard.power}</p>
                  <p><strong>Soul:</strong> {selectedCard.soul}</p>
                  {selectedCard.ability && (
                    <div className="ability-section">
                      <strong>Ability:</strong>
                      <p>{selectedCard.ability}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="tactical-btn primary"
                  onClick={() => {
                    addCardToDeck(selectedCard)
                    setShowCardDetails(false)
                  }}
                >
                  ADD TO DECK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EnhancedDeckBuilder
