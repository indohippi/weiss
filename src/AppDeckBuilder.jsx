import React, { useState, useEffect } from 'react'
import ProfessionalMainMenu from './components/ProfessionalMainMenu'
import ProfessionalDeckBuilder from './components/ProfessionalDeckBuilder'
import CardBrowser from './components/CardBrowser'
import GameplayTools from './components/GameplayTools'
import RuleReference from './components/RuleReference'
import { loadAllCards } from './services/cardDataLoader'
import './styles/professionalWeiss.css'

const SCREENS = {
  MENU: 'menu',
  DECK_BUILDER: 'deck-builder',
  CARD_BROWSER: 'card-browser',
  GAMEPLAY_TOOLS: 'gameplay-tools',
  RULE_REFERENCE: 'rule-reference'
}

const AppDeckBuilder = () => {
  // Screen state
  const [currentScreen, setCurrentScreen] = useState(SCREENS.MENU)
  
  // Card database
  const [allCards, setAllCards] = useState([])
  const [cardsLoading, setCardsLoading] = useState(true)
  const [savedDecks, setSavedDecks] = useState([])

  // Load cards and saved decks on mount
  useEffect(() => {
    loadCardsFromDatabase()
    loadSavedDecks()
  }, [])

  // Load cards from GitHub database
  const loadCardsFromDatabase = async () => {
    try {
      console.log('🔄 Loading cards from database...')
      const cards = await loadAllCards()
      setAllCards(cards)
      setCardsLoading(false)
      console.log(`✅ Loaded ${cards.length} cards from database`)
    } catch (error) {
      console.error('❌ Failed to load cards:', error)
      setCardsLoading(false)
    }
  }

  // Load saved decks from localStorage
  const loadSavedDecks = () => {
    try {
      const saved = localStorage.getItem('weiss-schwarz-decks')
      if (saved) {
        setSavedDecks(JSON.parse(saved))
        console.log('✅ Loaded saved decks')
      }
    } catch (error) {
      console.error('Failed to load saved decks:', error)
    }
  }

  // Navigation handlers
  const goToMenu = () => {
    setCurrentScreen(SCREENS.MENU)
  }

  const goToDeckBuilder = () => {
    setCurrentScreen(SCREENS.DECK_BUILDER)
  }

  const goToCardBrowser = () => {
    setCurrentScreen(SCREENS.CARD_BROWSER)
  }

  const goToGameplayTools = () => {
    setCurrentScreen(SCREENS.GAMEPLAY_TOOLS)
  }

  const goToRuleReference = () => {
    setCurrentScreen(SCREENS.RULE_REFERENCE)
  }

  // Render based on current screen
  if (currentScreen === SCREENS.MENU) {
    return (
      <div className="App deck-builder-app professional-weiss" style={{ minHeight: '100vh' }}>
        <ProfessionalMainMenu
          onStartGame={() => {}} // Disabled for deck builder app
          onDeckBuilder={goToDeckBuilder}
          onTutorial={() => {}}
          savedDecks={savedDecks}
          showGameplayTools={true}
          onCardBrowser={goToCardBrowser}
          onGameplayTools={goToGameplayTools}
          onRuleReference={goToRuleReference}
        />
      </div>
    )
  }

  if (currentScreen === SCREENS.DECK_BUILDER) {
    return (
      <div className="App deck-builder-app professional-weiss" style={{ minHeight: '100vh' }}>
        <ProfessionalDeckBuilder
          allCards={allCards}
          cardsLoading={cardsLoading}
          onBack={goToMenu}
        />
      </div>
    )
  }

  if (currentScreen === SCREENS.CARD_BROWSER) {
    return (
      <div className="App deck-builder-app professional-weiss" style={{ minHeight: '100vh' }}>
        <CardBrowser
          cards={allCards}
          loading={cardsLoading}
        />
      </div>
    )
  }

  if (currentScreen === SCREENS.GAMEPLAY_TOOLS) {
    return (
      <div className="App deck-builder-app professional-weiss" style={{ minHeight: '100vh' }}>
        <GameplayTools
          onBack={goToMenu}
        />
      </div>
    )
  }

  if (currentScreen === SCREENS.RULE_REFERENCE) {
    return (
      <div className="App deck-builder-app professional-weiss" style={{ minHeight: '100vh' }}>
        <RuleReference
          onBack={goToMenu}
        />
      </div>
    )
  }

  return (
    <div className="App deck-builder-app" style={{ minHeight: '100vh' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        color: 'white',
        fontSize: '1.5rem'
      }}>
        Loading Weiss Schwarz Deck Builder...
      </div>
    </div>
  )
}

export default AppDeckBuilder
