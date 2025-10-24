import React, { useState, useEffect } from 'react'
import { trialDecks } from '../gameLogic/trialDecks'
import './MainMenu.css'

const MainMenu = ({ onStartGame, onDeckBuilder, savedDecks = [] }) => {
  const [selectedDeck1, setSelectedDeck1] = useState(null)
  const [selectedDeck2, setSelectedDeck2] = useState(null)
  const [showDeckSelection, setShowDeckSelection] = useState(false)
  const [useTrialDecks, setUseTrialDecks] = useState(true)
  
  const allDecks = useTrialDecks ? [...trialDecks, ...savedDecks] : savedDecks

  useEffect(() => {
    // Auto-select first two decks if available
    if (allDecks.length > 0 && !selectedDeck1) {
      setSelectedDeck1(allDecks[0])
    }
    if (allDecks.length > 1 && !selectedDeck2) {
      setSelectedDeck2(allDecks[1])
    } else if (allDecks.length > 0 && !selectedDeck2) {
      setSelectedDeck2(allDecks[0])
    }
  }, [allDecks, selectedDeck1, selectedDeck2])

  const handleStartGame = () => {
    onStartGame({ deck1: selectedDeck1, deck2: selectedDeck2 })
  }

  return (
    <div className="main-menu">
      <div className="menu-background"></div>
      
      <div className="menu-content">
        <div className="game-title">
          <h1 className="anime-text-glow">Weiss Schwarz</h1>
          <p className="subtitle anime-text-glow">Digital Card Game</p>
        </div>

        <div className="menu-actions">
          {!showDeckSelection ? (
            <>
              <button 
                onClick={() => setShowDeckSelection(true)} 
                className="menu-btn primary anime-energy-orb anime-holographic"
              >
                <span>▶️ Start Game</span>
              </button>
              <button 
                onClick={onDeckBuilder} 
                className="menu-btn secondary anime-energy-orb anime-holographic"
              >
                <span>🎴 Deck Builder</span>
              </button>
              <div className="deck-count-info">
                🎴 {trialDecks.length} trial decks • 💾 {savedDecks.length} custom deck{savedDecks.length !== 1 ? 's' : ''}
              </div>
            </>
          ) : (
            <div className="deck-selection">
              <h2>Select Decks</h2>
              
              <div className="deck-type-toggle">
                <label className="toggle-option">
                  <input
                    type="checkbox"
                    checked={useTrialDecks}
                    onChange={(e) => setUseTrialDecks(e.target.checked)}
                  />
                  <span>Include Trial Decks (Recommended for beginners)</span>
                </label>
              </div>
              
              <div className="player-deck-select">
                <div className="player-section">
                  <h3>Player 1</h3>
                  {allDecks.length === 0 ? (
                    <div className="no-decks-message">
                      <p>No decks available</p>
                      <button onClick={onDeckBuilder} className="create-deck-btn">
                        Create a Deck
                      </button>
                    </div>
                  ) : (
                    <>
                      <select
                        value={selectedDeck1 ? selectedDeck1.name : ''}
                        onChange={(e) => {
                          const deck = allDecks.find(d => d.name === e.target.value)
                          setSelectedDeck1(deck)
                        }}
                        className="deck-select"
                      >
                        <option value="">Select a deck...</option>
                        {useTrialDecks && (
                          <optgroup label="✨ Trial Decks">
                            {trialDecks.map((deck, index) => (
                              <option key={`trial-${index}`} value={deck.name}>
                                {deck.name} ({deck.cards.length} cards) - {deck.difficulty}
                              </option>
                            ))}
                          </optgroup>
                        )}
                        {savedDecks.length > 0 && (
                          <optgroup label="💾 Custom Decks">
                            {savedDecks.map((deck, index) => (
                              <option key={`custom-${index}`} value={deck.name}>
                                {deck.name} ({deck.cards.length} cards)
                              </option>
                            ))}
                          </optgroup>
                        )}
                      </select>
                      {selectedDeck1 && selectedDeck1.description && (
                        <div className="deck-description">{selectedDeck1.description}</div>
                      )}
                    </>
                  )}
                </div>

                <div className="vs-divider">VS</div>

                <div className="player-section">
                  <h3>Player 2</h3>
                  {allDecks.length === 0 ? (
                    <div className="no-decks-message">
                      <p>No decks available</p>
                      <button onClick={onDeckBuilder} className="create-deck-btn">
                        Create a Deck
                      </button>
                    </div>
                  ) : (
                    <>
                      <select
                        value={selectedDeck2 ? selectedDeck2.name : ''}
                        onChange={(e) => {
                          const deck = allDecks.find(d => d.name === e.target.value)
                          setSelectedDeck2(deck)
                        }}
                        className="deck-select"
                      >
                        <option value="">Select a deck...</option>
                        {useTrialDecks && (
                          <optgroup label="✨ Trial Decks">
                            {trialDecks.map((deck, index) => (
                              <option key={`trial-${index}`} value={deck.name}>
                                {deck.name} ({deck.cards.length} cards) - {deck.difficulty}
                              </option>
                            ))}
                          </optgroup>
                        )}
                        {savedDecks.length > 0 && (
                          <optgroup label="💾 Custom Decks">
                            {savedDecks.map((deck, index) => (
                              <option key={`custom-${index}`} value={deck.name}>
                                {deck.name} ({deck.cards.length} cards)
                              </option>
                            ))}
                          </optgroup>
                        )}
                      </select>
                      {selectedDeck2 && selectedDeck2.description && (
                        <div className="deck-description">{selectedDeck2.description}</div>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="selection-actions">
                <button 
                  onClick={() => setShowDeckSelection(false)} 
                  className="menu-btn secondary"
                >
                  ← Back
                </button>
                <button 
                  onClick={handleStartGame}
                  disabled={!selectedDeck1 || !selectedDeck2}
                  className="menu-btn primary"
                >
                  Start Game
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="menu-footer">
          <p>Official Rules Implementation v2.09</p>
          <p className="credits">
            Card Database: <a href="https://github.com/CCondeluci/WeissSchwarz-ENG-DB" target="_blank" rel="noopener noreferrer">
              WeissSchwarz-ENG-DB
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default MainMenu

