import React, { useState, useEffect } from 'react'
import MainMenu from './components/MainMenu'
import DeckBuilder from './components/DeckBuilder'
import SimpleGameBoard from './components/SimpleGameBoard'
import SimpleGameInfo from './components/SimpleGameInfo'
import GameTutorial from './components/GameTutorial'
import { loadAllCards } from './services/cardDataLoader'
import { 
  simpleInitializeGame,
  simpleDrawCards,
  simplePlayCard,
  simpleClockCard
} from './gameLogic/simpleGameLogic'
import { trialDecks } from './gameLogic/trialDecks'

const SCREENS = {
  MENU: 'menu',
  DECK_BUILDER: 'deck-builder',
  GAME: 'game'
}

const AppSimple = () => {
  console.log('🎮 AppSimple component rendering...')
  
  // Screen state
  const [currentScreen, setCurrentScreen] = useState(SCREENS.MENU)
  
  // Game state
  const [gameState, setGameState] = useState(null)
  const [currentPhase, setCurrentPhase] = useState('stand')
  const [selectedCard, setSelectedCard] = useState(null)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [gameLog, setGameLog] = useState([])
  const [showTutorial, setShowTutorial] = useState(false)
  
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

  // Start game with selected decks
  const handleStartGame = ({ deck1, deck2 }) => {
    if (!deck1 || !deck2) {
      alert('Please select decks for both players')
      return
    }

    console.log('🎮 Starting simple game with decks:', {
      deck1: deck1.name,
      deck1Cards: deck1.cards.length,
      deck2: deck2.name,
      deck2Cards: deck2.cards.length
    })

    const newGameState = simpleInitializeGame(deck1.cards, deck2.cards)

    console.log('🎮 Simple game initialized:', {
      player1Hand: newGameState.players[0].hand.length,
      player1Deck: newGameState.players[0].deck.length,
      player2Hand: newGameState.players[1].hand.length,
      player2Deck: newGameState.players[1].deck.length,
      player1HandCards: newGameState.players[0].hand.map(c => c.name),
      player2HandCards: newGameState.players[1].hand.map(c => c.name)
    })

    setGameState(newGameState)
    setGameStarted(true)
    setCurrentPhase('stand')
    setGameOver(false)
    setGameLog(['Game started! Both players drew 5 cards.'])
    setCurrentScreen(SCREENS.GAME)
    
    console.log('🎮 Game state set, components should re-render')
  }

  // Handle card selection
  const handleCardSelect = (card, location) => {
    setSelectedCard({ card, location })
    console.log('🎯 Card selected:', card.name, 'from', location)
  }

  // Handle card actions using simple logic
  const handleCardAction = (action, card, location, position = null) => {
    console.log('🎯 Simple card action:', {
      action,
      cardName: card?.name,
      location,
      position,
      currentPhase
    })
    
    if (!gameState || !card) return
    
    const currentPlayer = gameState.players.find(p => p.turn)
    if (!currentPlayer) return
    
    let result = null
    
    if (action === 'play' && location === 'hand') {
      result = simplePlayCard(currentPlayer, card, position)
    } else if (action === 'clock' && location === 'hand') {
      result = simpleClockCard(currentPlayer, card)
    } else if (action === 'attack' && location === 'stage') {
      result = { success: true, message: `Attacking with ${card.name}` }
    }
    
    if (result) {
      console.log('🎯 Simple card action result:', result)
      if (result.success) {
        setGameLog(prev => [...prev, `✅ ${result.message}`])
        // Force a complete state update
        setGameState(prevState => ({
          ...prevState,
          players: [...prevState.players],
          phaseActions: {...prevState.phaseActions},
          attackPhase: {...prevState.attackPhase}
        }))
      } else {
        setGameLog(prev => [...prev, `❌ ${result.message}`])
      }
    }
    
    setSelectedCard(null)
  }

  // Navigation handlers
  const goToMenu = () => {
    setCurrentScreen(SCREENS.MENU)
    setGameStarted(false)
    setGameOver(false)
  }

  const goToDeckBuilder = () => {
    setCurrentScreen(SCREENS.DECK_BUILDER)
  }

  // Render based on current screen
  console.log('🎮 Current screen:', currentScreen)
  
  if (currentScreen === SCREENS.MENU) {
    console.log('🎮 Rendering MENU screen')
    return (
      <div className="App" style={{ minHeight: '100vh' }}>
        <MainMenu
          onStartGame={handleStartGame}
          onDeckBuilder={goToDeckBuilder}
          onTutorial={() => setShowTutorial(true)}
          savedDecks={savedDecks}
        />
        <GameTutorial 
          gameState={gameState}
          currentPhase={currentPhase}
          onClose={() => setShowTutorial(false)}
          isVisible={showTutorial}
        />
      </div>
    )
  }

  if (currentScreen === SCREENS.DECK_BUILDER) {
    console.log('🎮 Rendering DECK_BUILDER screen')
    return (
      <div className="App" style={{ minHeight: '100vh' }}>
        <DeckBuilder
          allCards={allCards}
          cardsLoading={cardsLoading}
          onBack={goToMenu}
        />
      </div>
    )
  }

  // Game Screen
  console.log('🎮 Game screen check:', {
    currentScreen,
    gameState: !!gameState,
    gameStarted,
    gameOver
  })
  
  if (!gameState || !gameStarted) {
    console.log('🎮 Rendering loading screen')
    return (
      <div className="App" style={{ minHeight: '100vh' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          color: 'white',
          fontSize: '1.5rem'
        }}>
          Loading game...
        </div>
      </div>
    )
  }
  
  console.log('🎮 Rendering GAME screen')

  return (
    <div className="App game-screen" style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1a1a2e 0%, #0f0f1e 100%)',
      color: '#e0e0e0'
    }}>
      <GameTutorial 
        gameState={gameState}
        currentPhase={currentPhase}
        onClose={() => setShowTutorial(false)}
        isVisible={showTutorial}
      />
      
      <div className="game-layout" style={{
        display: 'flex',
        height: '100vh',
        gap: '20px',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        {/* Main Game Board */}
        <div className="game-board-container" style={{
          flex: 1,
          minWidth: 0
        }}>
          <SimpleGameBoard 
            gameState={gameState}
            currentPhase={currentPhase}
            selectedCard={selectedCard}
            onCardSelect={handleCardSelect}
            onCardAction={handleCardAction}
            availableActions={[]}
            onActionClick={() => {}}
          />
        </div>

        {/* Side Panel - Game Info & Controls */}
        <div className="game-side-panel" style={{
          width: '300px',
          minWidth: '300px'
        }}>
          <SimpleGameInfo 
            currentPhase={currentPhase}
            gameLog={gameLog}
            onBack={goToMenu}
          />
        </div>
      </div>
    </div>
  )
  
  // Fallback - should never reach here
  console.log('🎮 Rendering FALLBACK screen')
  return (
    <div className="App" style={{ minHeight: '100vh', background: 'red', color: 'white', padding: '20px' }}>
      <h1>ERROR: Unknown screen state</h1>
      <p>Current screen: {currentScreen}</p>
      <p>Game state: {gameState ? 'exists' : 'null'}</p>
      <p>Game started: {gameStarted ? 'yes' : 'no'}</p>
      <button onClick={goToMenu}>Go to Menu</button>
    </div>
  )
}

export default AppSimple
