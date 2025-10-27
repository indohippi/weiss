import React, { useState, useEffect } from 'react'
import CardBrowser from './CardBrowser'
import Card from './Card'
import DeckExporter from './DeckExporter'
import './DeckBuilder.css'

const DeckBuilder = ({ allCards, cardsLoading = false, onSaveDeck, onBackToMenu, initialDeck = [] }) => {
  const [deck, setDeck] = useState(initialDeck || [])
  const [deckName, setDeckName] = useState('My Deck')
  const [validationErrors, setValidationErrors] = useState([])
  const [showSaveConfirm, setShowSaveConfirm] = useState(false)
  
  console.log(`📊 DeckBuilder received ${allCards?.length || 0} cards`)

  useEffect(() => {
    validateDeck(deck)
  }, [deck])

  const validateDeck = (currentDeck) => {
    const errors = []

    // Check deck size
    if (currentDeck.length !== 50) {
      errors.push(`Deck must have exactly 50 cards (currently ${currentDeck.length})`)
    }

    // Check max 4 copies of each card
    const cardCounts = {}
    currentDeck.forEach(card => {
      const id = card.id || card.code
      cardCounts[id] = (cardCounts[id] || 0) + 1
    })

    Object.entries(cardCounts).forEach(([id, count]) => {
      if (count > 4) {
        const card = currentDeck.find(c => (c.id || c.code) === id)
        errors.push(`"${card.name}" has ${count} copies (max 4 allowed)`)
      }
    })

    // Check max 8 climax cards
    const climaxCount = currentDeck.filter(card => card.type === 'climax').length
    if (climaxCount > 8) {
      errors.push(`Deck has ${climaxCount} climax cards (max 8 allowed)`)
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const addCardToDeck = (card) => {
    const currentCount = deck.filter(c => (c.id || c.code) === (card.id || card.code)).length

    if (currentCount >= 4) {
      alert(`You already have 4 copies of "${card.name}" in your deck`)
      return
    }

    if (deck.length >= 50) {
      alert('Deck is full (50 cards)')
      return
    }

    if (card.type === 'climax') {
      const climaxCount = deck.filter(c => c.type === 'climax').length
      if (climaxCount >= 8) {
        alert('Deck already has 8 climax cards (maximum allowed)')
        return
      }
    }

    setDeck(prev => [...prev, { ...card, deckId: `${card.id || card.code}-${Date.now()}-${Math.random()}` }])
  }

  const removeCardFromDeck = (deckId) => {
    setDeck(prev => {
      const index = prev.findIndex(c => c.deckId === deckId)
      if (index === -1) return prev
      const newDeck = [...prev]
      newDeck.splice(index, 1)
      return newDeck
    })
  }

  const clearDeck = () => {
    if (window.confirm('Are you sure you want to clear your entire deck?')) {
      setDeck([])
    }
  }

  const saveDeck = () => {
    if (!validateDeck(deck)) {
      alert('Please fix validation errors before saving')
      return
    }

    const deckData = {
      name: deckName,
      cards: deck,
      createdAt: new Date().toISOString()
    }

    if (onSaveDeck) {
      onSaveDeck(deckData)
    }

    setShowSaveConfirm(true)
    setTimeout(() => setShowSaveConfirm(false), 3000)
  }

  const getDeckStats = () => {
    const stats = {
      total: deck.length,
      characters: deck.filter(c => c.type === 'character').length,
      events: deck.filter(c => c.type === 'event').length,
      climax: deck.filter(c => c.type === 'climax').length,
      level0: deck.filter(c => c.level === 0).length,
      level1: deck.filter(c => c.level === 1).length,
      level2: deck.filter(c => c.level === 2).length,
      level3: deck.filter(c => c.level === 3).length,
      colors: {
        yellow: deck.filter(c => c.color === 'yellow').length,
        green: deck.filter(c => c.color === 'green').length,
        red: deck.filter(c => c.color === 'red').length,
        blue: deck.filter(c => c.color === 'blue').length
      }
    }
    return stats
  }

  const stats = getDeckStats()
  const isValid = validationErrors.length === 0

  return (
    <div className="deck-builder">
      <div className="deck-builder-header">
        <button onClick={onBackToMenu} className="back-btn">
          ← Back to Menu
        </button>
        <h1>Deck Builder</h1>
        <div className="header-actions">
          <button onClick={saveDeck} className="save-btn" disabled={!isValid}>
            💾 Save Deck
          </button>
        </div>
      </div>

      {showSaveConfirm && (
        <div className="save-confirmation">
          ✓ Deck saved successfully!
        </div>
      )}

      <div className="deck-builder-content">
        {/* Left Panel - Card Browser */}
        <div className="browser-panel">
          <CardBrowser
            cards={allCards}
            onCardClick={addCardToDeck}
            selectedCards={deck}
            loading={cardsLoading}
          />
        </div>

        {/* Right Panel - Current Deck */}
        <div className="deck-panel">
          <div className="deck-header">
            <input
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="deck-name-input"
              placeholder="Deck Name"
            />
            <button onClick={clearDeck} className="clear-deck-btn">
              🗑️ Clear All
            </button>
          </div>

          {/* Deck Stats */}
          <div className="deck-stats">
            <div className="stat-row">
              <div className={`stat-item ${stats.total === 50 ? 'valid' : 'invalid'}`}>
                <span className="stat-label">Total</span>
                <span className="stat-value">{stats.total}/50</span>
              </div>
              <div className={`stat-item ${stats.climax <= 8 ? 'valid' : 'invalid'}`}>
                <span className="stat-label">Climax</span>
                <span className="stat-value">{stats.climax}/8</span>
              </div>
            </div>

            <div className="stat-section">
              <h4>By Type</h4>
              <div className="stat-grid">
                <div className="stat-item">
                  <span className="stat-label">Characters</span>
                  <span className="stat-value">{stats.characters}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Events</span>
                  <span className="stat-value">{stats.events}</span>
                </div>
              </div>
            </div>

            <div className="stat-section">
              <h4>By Level</h4>
              <div className="stat-grid">
                <div className="stat-item">
                  <span className="stat-label">Lv 0</span>
                  <span className="stat-value">{stats.level0}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Lv 1</span>
                  <span className="stat-value">{stats.level1}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Lv 2</span>
                  <span className="stat-value">{stats.level2}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Lv 3</span>
                  <span className="stat-value">{stats.level3}</span>
                </div>
              </div>
            </div>

            <div className="stat-section">
              <h4>By Color</h4>
              <div className="stat-grid">
                <div className="stat-item color-yellow">
                  <span className="stat-label">Yellow</span>
                  <span className="stat-value">{stats.colors.yellow}</span>
                </div>
                <div className="stat-item color-green">
                  <span className="stat-label">Green</span>
                  <span className="stat-value">{stats.colors.green}</span>
                </div>
                <div className="stat-item color-red">
                  <span className="stat-label">Red</span>
                  <span className="stat-value">{stats.colors.red}</span>
                </div>
                <div className="stat-item color-blue">
                  <span className="stat-label">Blue</span>
                  <span className="stat-value">{stats.colors.blue}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Deck Import/Export */}
          <DeckExporter 
            deck={deck}
            deckName={deckName}
            onImport={(importedDeck) => {
              setDeck(importedDeck.cards || [])
              setDeckName(importedDeck.name || 'Imported Deck')
            }}
          />

          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="validation-errors">
              <h4>⚠️ Validation Errors</h4>
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Deck Cards List */}
          <div className="deck-cards">
            <h3>Deck Cards ({deck.length})</h3>
            <div className="deck-cards-grid">
              {deck.length === 0 ? (
                <div className="empty-deck">
                  <p>Your deck is empty</p>
                  <p className="hint">Click cards from the browser to add them</p>
                </div>
              ) : (
                deck.map((card) => (
                  <div key={card.deckId} className="deck-card-item">
                    <Card
                      card={card}
                      showDetails={true}
                      className="deck-card"
                    />
                    <button
                      onClick={() => removeCardFromDeck(card.deckId)}
                      className="remove-card-btn"
                      title="Remove from deck"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeckBuilder

