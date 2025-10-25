import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './KawaiiDeckBuilder.css'

const KawaiiDeckBuilder = ({ allCards, cardsLoading, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedColor, setSelectedColor] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [deck, setDeck] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [showCardDetails, setShowCardDetails] = useState(false)

  const cardsPerPage = 12
  const maxDeckSize = 50

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
    }
  }

  // Remove card from deck
  const removeCardFromDeck = (cardToRemove) => {
    const deckIndex = deck.findIndex(c => c.deckId === cardToRemove.deckId)
    if (deckIndex !== -1) {
      const newDeck = [...deck]
      newDeck.splice(deckIndex, 1)
      setDeck(newDeck)
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
    <div className="kawaii-deck-builder weiss-kawaii">
      {/* Kawaii Header */}
      <motion.div 
        className="kawaii-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="header-content">
          <div className="header-status">
            <div className="status-badge">✨ DECK BUILDER ACTIVE</div>
            <div className="status-badge">{new Date().toLocaleTimeString()}</div>
          </div>
          <div className="header-title">
            <h1>Weiss Schwarz Deck Builder</h1>
            <p>Build your perfect deck with kawaii cards! 💕</p>
          </div>
          <button onClick={onBack} className="kawaii-btn secondary">
            ← Back to Menu
          </button>
        </div>
      </motion.div>

      <div className="deck-builder-layout">
        
        {/* Search Panel */}
        <motion.div 
          className="search-panel kawaii-card"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h3>🔍 Search Cards</h3>
          
          <div className="search-controls">
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search for cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="kawaii-input search-input"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Level</label>
              <select 
                value={selectedLevel} 
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="kawaii-input filter-select"
              >
                <option value="all">All Levels</option>
                <option value="0">Level 0</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Type</label>
              <select 
                value={selectedType} 
                onChange={(e) => setSelectedType(e.target.value)}
                className="kawaii-input filter-select"
              >
                <option value="all">All Types</option>
                <option value="character">Character</option>
                <option value="event">Event</option>
                <option value="climax">Climax</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Color</label>
              <select 
                value={selectedColor} 
                onChange={(e) => setSelectedColor(e.target.value)}
                className="kawaii-input filter-select"
              >
                <option value="all">All Colors</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Card Browser */}
        <motion.div 
          className="card-browser kawaii-card"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="browser-header">
            <h3>💖 Card Database</h3>
            <div className="browser-info">
              <span className="results-count">{filteredCards.length} cards found</span>
              <div className="pagination">
                <button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  className="kawaii-btn secondary"
                  disabled={currentPage === 1}
                >
                  ← Prev
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  className="kawaii-btn secondary"
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            </div>
          </div>

          <div className="card-grid">
            <AnimatePresence>
              {currentCards.map((card, index) => (
                <motion.div
                  key={`${card.id}-${index}`}
                  className="card-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCard(card)
                    setShowCardDetails(true)
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    addCardToDeck(card)
                  }}
                >
                  <img 
                    src={card.image} 
                    alt={card.name}
                    className="card-image"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 120"><rect width="200" height="120" fill="%23ffb6c1"/><text x="100" y="60" text-anchor="middle" fill="%23ff69b4" font-family="Arial" font-size="16">No Image</text></svg>'
                    }}
                  />
                  
                  <div className="card-content">
                    <h4 className="card-title">{card.name}</h4>
                    <p className="card-description">
                      {card.ability || 'No description available'}
                    </p>
                    
                    <div className="card-stats">
                      {card.power && (
                        <div className="stat-item">
                          <div className="stat-label">PWR</div>
                          <div className="stat-value">{card.power}</div>
                        </div>
                      )}
                      {card.soul && (
                        <div className="stat-item">
                          <div className="stat-label">SOUL</div>
                          <div className="stat-value">{card.soul}</div>
                        </div>
                      )}
                      {card.trigger && (
                        <div className="stat-item">
                          <div className="stat-label">TRIG</div>
                          <div className="stat-value">{card.trigger}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Deck Panel */}
        <motion.div 
          className="deck-panel kawaii-card"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h3>🎴 My Deck</h3>
          
          <div className="deck-stats">
            <div className="stat-row">
              <span className="stat-label">Deck Size:</span>
              <span className="stat-value">{deckStats.total}/50</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Level 0:</span>
              <span className="stat-value">{deckStats.byLevel[0]}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Level 1:</span>
              <span className="stat-value">{deckStats.byLevel[1]}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Level 2:</span>
              <span className="stat-value">{deckStats.byLevel[2]}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Level 3:</span>
              <span className="stat-value">{deckStats.byLevel[3]}</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Climax:</span>
              <span className="stat-value">{deckStats.byType.climax}</span>
            </div>
          </div>

          <div className="deck-list">
            <div className="deck-header">
              <span className="deck-title">Current Deck</span>
              <span className="deck-count">{deck.length} cards</span>
            </div>
            
            <div className="deck-cards">
              <AnimatePresence>
                {deck.map((card, index) => (
                  <motion.div
                    key={card.deckId}
                    className="deck-card-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.02 }}
                  >
                    <div className="deck-card">
                      <img 
                        src={card.image} 
                        alt={card.name}
                        className="deck-card-image"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60"><rect width="100" height="60" fill="%23ffb6c1"/><text x="50" y="30" text-anchor="middle" fill="%23ff69b4" font-family="Arial" font-size="10">No Image</text></svg>'
                        }}
                      />
                      <div className="deck-card-info">
                        <div className="deck-card-name">{card.name}</div>
                        <div className="deck-card-level">L{card.level}</div>
                      </div>
                    </div>
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
              className="modal-content kawaii-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>Card Details</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowCardDetails(false)}
                >
                  ✕
                </button>
              </div>
              
              <div className="modal-body">
                <div className="modal-card-image">
                  <img 
                    src={selectedCard.image} 
                    alt={selectedCard.name}
                    className="large-card-image"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 180"><rect width="300" height="180" fill="%23ffb6c1"/><text x="150" y="90" text-anchor="middle" fill="%23ff69b4" font-family="Arial" font-size="20">No Image</text></svg>'
                    }}
                  />
                </div>
                
                <div className="modal-card-info">
                  <h4>{selectedCard.name}</h4>
                  <div className="card-details">
                    <p><strong>Type:</strong> {selectedCard.type}</p>
                    <p><strong>Level:</strong> {selectedCard.level}</p>
                    {selectedCard.power && <p><strong>Power:</strong> {selectedCard.power}</p>}
                    {selectedCard.soul && <p><strong>Soul:</strong> {selectedCard.soul}</p>}
                    {selectedCard.trigger && <p><strong>Trigger:</strong> {selectedCard.trigger}</p>}
                    {selectedCard.ability && (
                      <div className="ability-section">
                        <strong>Ability:</strong>
                        <p>{selectedCard.ability}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="kawaii-btn primary"
                  onClick={() => {
                    addCardToDeck(selectedCard)
                    setShowCardDetails(false)
                  }}
                >
                  Add to Deck 💕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default KawaiiDeckBuilder
