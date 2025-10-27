import React, { useState, useEffect } from 'react'
import MainMenu from './components/MainMenu'
import DeckBuilder from './components/DeckBuilder'
import CleanGameBoard from './components/CleanGameBoard'
import GameInfo from './components/GameInfo'
import ShortcutGuide from './components/ShortcutGuide'
import PhaseNotification from './components/PhaseNotification'
import GameTutorial from './components/GameTutorial'
import { loadAllCards } from './services/cardDataLoader'
import { 
  performMulligan, 
  checkWinCondition
} from './gameLogic/gameState'
import { 
  simpleInitializeGame,
  simpleDrawCards,
  simplePlayCard,
  simpleClockCard
} from './gameLogic/simpleGameLogic'
import {
  executeStandPhase,
  executeDrawPhase,
  executeClockPhase,
  skipClockPhase,
  playCardFromHand,
  skipMainPhase,
  skipClimaxPhase,
  declareAttack,
  performTriggerCheck,
  resolveBattle,
  dealDamage,
  completeAttack,
  endAttackPhase,
  advancePhase,
  endCurrentTurn
} from './gameLogic/gameActions'
import './App.css'
import './styles/animeTheme.css'
import { setupKeyboardShortcuts } from './utils/keyboardShortcuts'

// Background particles component
const AnimeBackground = () => {
  return (
    <>
      <div className="anime-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="anime-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      <div className="anime-particles">
        {[...Array(10)].map((_, i) => (
          <div
            key={`sakura-${i}`}
            className="anime-sakura"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${15 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>
    </>
  )
}

// Game screens
const SCREENS = {
  MENU: 'menu',
  DECK_BUILDER: 'deck_builder',
  GAME: 'game'
}

function App() {
  // Navigation
  const [currentScreen, setCurrentScreen] = useState(SCREENS.MENU)
  
  // Card Database
  const [allCards, setAllCards] = useState([])
  const [cardsLoading, setCardsLoading] = useState(true)
  
  // Deck Management
  const [savedDecks, setSavedDecks] = useState([])
  
  // Game State
  const [gameState, setGameState] = useState(null)
  const [currentPhase, setCurrentPhase] = useState('stand')
  const [selectedCard, setSelectedCard] = useState(null)
  const [gameLog, setGameLog] = useState([])
  const [gameStarted, setGameStarted] = useState(false)
  const [availableActions, setAvailableActions] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [winner, setWinner] = useState(null)
  const [waitingForAction, setWaitingForAction] = useState(null) // 'trigger', 'battle', 'damage'
  const [selectedStagePosition, setSelectedStagePosition] = useState(null)
  const [showPhaseNotification, setShowPhaseNotification] = useState(false)
  const [notificationPhase, setNotificationPhase] = useState('')
  const [showTutorial, setShowTutorial] = useState(false)

  // Load cards and saved decks on mount
  useEffect(() => {
    loadCardsFromDatabase()
    loadSavedDecks()
  }, [])
  
  // Setup keyboard shortcuts for game
  useEffect(() => {
    if (currentScreen === SCREENS.GAME && gameStarted && !gameOver) {
      const cleanup = setupKeyboardShortcuts({
        onNextPhase: nextPhase,
        onEndTurn: endTurn,
        onSkipPhase: handleSkipPhase,
        onEscape: () => setSelectedCard(null)
      })
      
      return cleanup
    }
  }, [currentScreen, gameStarted, gameOver])

  // Load cards from GitHub database
  const loadCardsFromDatabase = async () => {
    try {
      setCardsLoading(true)
      console.log('🔄 Starting card database load...')
      const cards = await loadAllCards()
      setAllCards(cards)
      console.log(`✅ Loaded ${cards.length} cards from database`)
      
      if (cards.length === 0) {
        console.warn('⚠️ No cards loaded! Using fallback data...')
        // Load fallback local card database if API fails
        const cardDatabase = (await import('./gameLogic/cardDatabase')).default
        setAllCards(cardDatabase || [])
      }
    } catch (error) {
      console.error('❌ Failed to load cards:', error)
      // Try fallback
      try {
        const cardDatabase = (await import('./gameLogic/cardDatabase')).default
        setAllCards(cardDatabase || [])
        console.log('✅ Loaded fallback card database')
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError)
        setAllCards([])
      }
    } finally {
      setCardsLoading(false)
    }
  }

  // Load saved decks from localStorage
  const loadSavedDecks = () => {
    try {
      const saved = localStorage.getItem('weiss_decks')
      if (saved) {
        const decks = JSON.parse(saved)
        setSavedDecks(decks)
        console.log(`Loaded ${decks.length} saved decks`)
      }
    } catch (error) {
      console.error('Failed to load saved decks:', error)
    }
  }

  // Save a deck to localStorage
  const saveDeck = (deckData) => {
    try {
      // Check if deck with same name exists
      const existingIndex = savedDecks.findIndex(d => d.name === deckData.name)
      
      let updatedDecks
      if (existingIndex >= 0) {
        // Update existing deck
        updatedDecks = [...savedDecks]
        updatedDecks[existingIndex] = deckData
      } else {
        // Add new deck
        updatedDecks = [...savedDecks, deckData]
      }
      
      setSavedDecks(updatedDecks)
      localStorage.setItem('weiss_decks', JSON.stringify(updatedDecks))
      console.log(`Deck "${deckData.name}" saved successfully`)
    } catch (error) {
      console.error('Failed to save deck:', error)
      alert('Failed to save deck. Please try again.')
    }
  }

  // Convert trial deck cards to use database cards
  const convertTrialDeckToDatabaseCards = (trialDeckCards, databaseCards) => {
    return trialDeckCards.map(trialCard => {
      // Strategy 1: Exact match by name and series
      let matchingCard = databaseCards.find(dbCard => 
        dbCard.name === trialCard.name && 
        dbCard.series === trialCard.series
      )
      
      // Strategy 2: Match by name only (if series doesn't match)
      if (!matchingCard) {
        matchingCard = databaseCards.find(dbCard => 
          dbCard.name === trialCard.name
        )
      }
      
      // Strategy 3: Fuzzy match by name (case insensitive)
      if (!matchingCard) {
        matchingCard = databaseCards.find(dbCard => 
          dbCard.name.toLowerCase().includes(trialCard.name.toLowerCase()) ||
          trialCard.name.toLowerCase().includes(dbCard.name.toLowerCase())
        )
      }
      
      if (matchingCard) {
        console.log(`✅ Matched trial card "${trialCard.name}" to database card "${matchingCard.name}"`)
        // Use database card with unique ID for this instance
        return {
          ...matchingCard,
          id: `${matchingCard.id}-${Date.now()}-${Math.random()}`,
          deckId: `${matchingCard.id}-${Date.now()}-${Math.random()}`
        }
      } else {
        // Fallback to trial card if no match found
        console.warn(`❌ No database match found for trial card: ${trialCard.name}`)
        return {
          ...trialCard,
          id: `${trialCard.id}-${Date.now()}-${Math.random()}`,
          deckId: `${trialCard.id}-${Date.now()}-${Math.random()}`
        }
      }
    })
  }

  // Initialize game with custom decks using simple logic
  const initializeGameWithDecks = (deck1Data, deck2Data) => {
    console.log('🎮 Using simple game initialization...')
    return simpleInitializeGame(deck1Data, deck2Data)
  }

  // Start game with selected decks
  const handleStartGame = ({ deck1, deck2 }) => {
    if (!deck1 || !deck2) {
      alert('Please select decks for both players')
      return
    }

    console.log('🎮 Starting game with decks:', {
      deck1: deck1.name,
      deck1Cards: deck1.cards.length,
      deck2: deck2.name,
      deck2Cards: deck2.cards.length,
      deck1Sample: deck1.cards.slice(0, 3).map(c => ({ name: c.name, type: c.type, level: c.level, series: c.series })),
      deck2Sample: deck2.cards.slice(0, 3).map(c => ({ name: c.name, type: c.type, level: c.level, series: c.series })),
      databaseCardsAvailable: allCards.length
    })

    const newGameState = initializeGameWithDecks(deck1.cards, deck2.cards)
    
    console.log('🎮 Initialized game state:', {
      player1Hand: newGameState.players[0].hand.length,
      player1Deck: newGameState.players[0].deck.length,
      player2Hand: newGameState.players[1].hand.length,
      player2Deck: newGameState.players[1].deck.length,
      player1HandCards: newGameState.players[0].hand.map(c => ({ 
        name: c.name, 
        type: c.type, 
        level: c.level, 
        series: c.series,
        image: c.image ? 'has image' : 'no image',
        fromDatabase: c.series && c.series !== 'Trial'
      })),
      player2HandCards: newGameState.players[1].hand.map(c => ({ 
        name: c.name, 
        type: c.type, 
        level: c.level, 
        series: c.series,
        image: c.image ? 'has image' : 'no image',
        fromDatabase: c.series && c.series !== 'Trial'
      }))
    })
    
    // Perform initial mulligan for both players
    newGameState.players.forEach(player => {
      performMulligan(player)
    })
    
    console.log('🎮 After mulligan:', {
      player1Hand: newGameState.players[0].hand.length,
      player2Hand: newGameState.players[1].hand.length,
      player1HandCards: newGameState.players[0].hand.map(c => ({ 
        name: c.name, 
        type: c.type, 
        level: c.level, 
        series: c.series,
        image: c.image ? 'has image' : 'no image',
        fromDatabase: c.series && c.series !== 'Trial'
      })),
      player2HandCards: newGameState.players[1].hand.map(c => ({ 
        name: c.name, 
        type: c.type, 
        level: c.level, 
        series: c.series,
        image: c.image ? 'has image' : 'no image',
        fromDatabase: c.series && c.series !== 'Trial'
      }))
    })
    
    console.log('🎯 Setting game state:', {
      players: newGameState.players.map(p => ({
        name: p.name,
        turn: p.turn,
        handLength: p.hand.length,
        deckLength: p.deck.length
      })),
      currentPhase: newGameState.currentPhase
    })
    
    setGameState(newGameState)
    setGameStarted(true)
    setCurrentPhase('stand')
    setGameOver(false)
    setWinner(null)
    setGameLog(['Game started! Both players drew 5 cards.'])
    setCurrentScreen(SCREENS.GAME)
    
    console.log('🎯 Game state set, components should re-render')
  }

  // Game logic effects
  useEffect(() => {
    if (gameState && gameStarted && !gameOver) {
      // Check for win conditions
      const winCondition = checkWinCondition(gameState)
      if (winCondition) {
        setGameOver(true)
        setWinner(winCondition.winner)
        setGameLog(prev => [...prev, `🏆 Game Over! ${winCondition.winner.name} wins by ${winCondition.reason}!`])
        return
      }
      
      // Auto-execute certain phases
      handleAutoPhases()
    }
  }, [gameState, currentPhase, gameStarted, gameOver])
  
  // Auto-execute stand and draw phases
  const handleAutoPhases = () => {
    if (!gameState) return
    
    const currentPlayer = gameState.players.find(p => p.turn)
    
    console.log('🔄 Auto-phases check:', {
      currentPhase,
      standCompleted: gameState.phaseActions.stand.completed,
      drawCompleted: gameState.phaseActions.draw.completed,
      currentPlayer: currentPlayer.name
    })
    
    // Auto-execute stand phase
    if (currentPhase === 'stand' && !gameState.phaseActions.stand.completed) {
      console.log('✨ Executing stand phase')
      const result = executeStandPhase(gameState)
      setGameLog(prev => [...prev, `✨ ${result.message}`])
      setGameState(prevState => ({
        ...prevState,
        players: [...prevState.players],
        phaseActions: {...prevState.phaseActions}
      }))
      
      if (result.autoAdvance) {
        setTimeout(() => {
          console.log('➡️ Advancing to draw phase')
          setCurrentPhase('draw')
        }, 500)
      }
    }
    
    // Auto-execute draw phase
    if (currentPhase === 'draw' && gameState.phaseActions.stand.completed && !gameState.phaseActions.draw.completed) {
      console.log('📥 Executing draw phase')
      const result = executeDrawPhase(gameState)
      setGameLog(prev => [...prev, `📥 ${result.message}`])
      setGameState(prevState => ({
        ...prevState,
        players: [...prevState.players],
        phaseActions: {...prevState.phaseActions}
      }))
      
      if (result.gameOver) {
        handleGameOver(currentPlayer, 'deck out')
      } else if (result.autoAdvance) {
        setTimeout(() => {
          console.log('➡️ Advancing to clock phase')
          setCurrentPhase('clock')
        }, 500)
      }
    }
  }

  const handleGameOver = (loser, reason) => {
    const winner = gameState.players.find(p => p.id !== loser.id)
    setGameOver(true)
    setWinner(winner)
    setGameLog(prev => [...prev, `🏆 ${winner.name} wins! (${reason})`])
  }
  
  // Handle skip phase
  const handleSkipPhase = () => {
    if (!gameState) return
    
    let result = null
    
    switch (currentPhase) {
      case 'clock':
        result = skipClockPhase(gameState)
        break
      case 'main':
        result = skipMainPhase(gameState)
        break
      case 'climax':
        result = skipClimaxPhase(gameState)
        break
      case 'attack':
        result = endAttackPhase(gameState)
        break
      default:
        return
    }
    
    if (result.success) {
      setGameLog(prev => [...prev, `⏭️ ${result.message}`])
      setGameState(prevState => ({
        ...prevState,
        players: [...prevState.players],
        phaseActions: {...prevState.phaseActions},
        attackPhase: {...prevState.attackPhase}
      }))
    }
  }

  const handleCardSelect = (card, location, position = null) => {
    setSelectedCard({ card, location, position })
  }

  const handleCardAction = (action, card, location, position = null) => {
    if (!gameState) return

    const currentPlayer = gameState.players.find(p => p.turn)
    const opponent = gameState.players.find(p => !p.turn)
    let result = null
    
    console.log('🎯 Card action:', {
      action,
      cardName: card?.name,
      location,
      position,
      currentPhase,
      currentPlayer: currentPlayer.name
    })

    switch (action) {
      case 'play_character':
      case 'play':
        // Use provided position or ask for one
        if (card && card.type === 'character' && position !== null) {
          result = playCardFromHand(card, currentPlayer, gameState, position)
        } else if (card && card.type === 'character') {
          // Ask for position selection
          setGameLog(prev => [...prev, `📍 Click an empty stage slot for ${card.name}`])
          setSelectedCard({ card, location })
          return
          } else {
          // Events and climax don't need position
          result = playCardFromHand(card, currentPlayer, gameState, null)
        }
        break
        
      case 'clock':
        result = executeClockPhase(card, currentPlayer, gameState)
        break
        
      case 'attack':
        if (waitingForAction === 'trigger') {
          // Perform trigger check
          result = performTriggerCheck(currentPlayer, gameState)
          if (result.success) {
            setWaitingForAction(result.needsBattleStep ? 'battle' : 'damage')
            
            if (result.gameOver) {
              handleGameOver(currentPlayer, 'deck out during attack')
              return
            }
          }
        } else if (waitingForAction === 'battle') {
          // Resolve battle
          result = resolveBattle(gameState)
          if (result.needsDamageStep) {
            setWaitingForAction('damage')
          } else {
            setWaitingForAction(null)
            completeAttack(gameState)
          }
        } else if (waitingForAction === 'damage') {
          // Deal damage
          result = dealDamage(gameState, opponent)
          setWaitingForAction(null)
          completeAttack(gameState)
          
          if (result.gameOver) {
            handleGameOver(opponent, 'level 4')
            return
          }
        } else if (card) {
          // Start attack
          result = declareAttack(card, currentPlayer, opponent, gameState)
          if (result.success && result.needsTriggerCheck) {
            setWaitingForAction('trigger')
            setGameLog(prev => [...prev, `⚔️ ${result.message}`])
            setGameLog(prev => [...prev, `🎲 Click 'Continue Attack' to trigger check`])
            return
          }
        }
        break
        
      default:
        break
    }
    
    if (result) {
      console.log('🎯 Card action result:', result)
      if (result.success) {
        setGameLog(prev => [...prev, `✅ ${result.message}`])
        // Force a complete state update by creating a new object
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

  const nextPhase = () => {
    if (!gameState) return
    
    const result = advancePhase(gameState)
    
    if (result.success) {
      setCurrentPhase(result.nextPhase)
      setGameLog(prev => [...prev, `➡️ ${result.message}`])
      setGameState(prevState => ({
        ...prevState,
        players: [...prevState.players],
        phaseActions: {...prevState.phaseActions},
        attackPhase: {...prevState.attackPhase}
      }))
      
      // Show phase transition notification
      setNotificationPhase(result.nextPhase)
      setShowPhaseNotification(true)
    } else {
      setGameLog(prev => [...prev, `⚠️ ${result.message}`])
    }
  }

  const endTurn = () => {
    if (!gameState) return
    
    const result = endCurrentTurn(gameState)
    
    if (result.success) {
      setGameState(prevState => ({
        ...prevState,
        players: [...prevState.players],
        phaseActions: {...prevState.phaseActions},
        attackPhase: {...prevState.attackPhase}
      }))
      setCurrentPhase('stand')
      setGameLog(prev => [...prev, `🔄 ${result.message}`])
      setWaitingForAction(null)
      setSelectedCard(null)
      setSelectedStagePosition(null)
    } else {
      setGameLog(prev => [...prev, `❌ ${result.message}`])
    }
  }

  const handleActionClick = (action) => {
    const currentPlayer = gameState?.players.find(p => p.turn)
    
    switch (action.type) {
      case 'clock':
        handleCardAction('clock', action.card, 'hand')
        break
      case 'play':
        handleCardAction('play', action.card, 'hand', action.position)
        break
      case 'attack':
        handleCardAction('attack', action.card, 'stage')
        break
      case 'skip':
        handleSkipPhase()
        break
      case 'continue_attack':
      case 'trigger':
      case 'battle':
      case 'damage':
        // Continue attack steps
        handleCardAction('attack', null, null)
        break
      default:
        break
    }
  }

  // Generate available actions based on current phase and waiting state
  useEffect(() => {
    if (!gameState || !gameStarted || gameOver) {
      setAvailableActions([])
      return
    }
    
    const currentPlayer = gameState.players.find(p => p.turn)
    const actions = []
    
    // Attack continuation actions
    if (waitingForAction) {
      actions.push({
        type: 'continue_attack',
        description: waitingForAction === 'trigger' ? '🎲 Perform Trigger Check' :
                     waitingForAction === 'battle' ? '⚔️ Resolve Battle' :
                     '💥 Deal Damage',
        priority: 1
      })
    }
    
    // Phase-specific actions
    if (currentPhase === 'clock' && !gameState.phaseActions.clock.completed) {
      actions.push({
        type: 'skip',
        description: 'Skip Clock Phase',
        priority: 2
      })
    }
    
    setAvailableActions(actions)
  }, [gameState, currentPhase, waitingForAction, gameStarted, gameOver])

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
  if (currentScreen === SCREENS.MENU) {
    return (
      <div className="anime-gradient-bg" style={{ minHeight: '100vh' }}>
        <AnimeBackground />
        <MainMenu
          onStartGame={handleStartGame}
          onDeckBuilder={goToDeckBuilder}
          onTutorial={() => setShowTutorial(true)}
          savedDecks={savedDecks}
        />
      </div>
    )
  }

  if (currentScreen === SCREENS.DECK_BUILDER) {
    return (
      <div className="anime-gradient-bg" style={{ minHeight: '100vh' }}>
        <AnimeBackground />
        {cardsLoading ? (
          <div className="loading-screen">
            <div className="loading-content">
              <div className="spinner"></div>
              <h2>Loading Card Database...</h2>
              <p>Fetching cards from GitHub API</p>
              <p className="loading-hint">This may take 30-60 seconds on first load</p>
              <button 
                className="fallback-button"
                onClick={async () => {
                  console.log('⚡ User triggered fallback load')
                  setCardsLoading(false)
                  try {
                    const cardDatabase = (await import('./gameLogic/cardDatabase')).default
                    setAllCards(cardDatabase || [])
                    console.log(`✅ Loaded ${cardDatabase?.length || 0} fallback cards`)
                  } catch (error) {
                    console.error('❌ Fallback failed:', error)
                    setAllCards([])
                  }
                }}
              >
                Use Offline Database Instead
              </button>
            </div>
          </div>
        ) : allCards.length === 0 ? (
          <div className="loading-screen">
            <div className="loading-content">
              <h2>⚠️ No Cards Loaded</h2>
              <p>Failed to load cards from database</p>
              <button 
                className="fallback-button"
                onClick={async () => {
                  try {
                    const cardDatabase = (await import('./gameLogic/cardDatabase')).default
                    setAllCards(cardDatabase || [])
                    console.log(`✅ Loaded ${cardDatabase?.length || 0} fallback cards`)
                  } catch (error) {
                    console.error('❌ Fallback failed:', error)
                  }
                }}
              >
                Load Offline Database
              </button>
              <button className="fallback-button secondary" onClick={goToMenu}>
                Back to Menu
              </button>
            </div>
          </div>
        ) : (
          <DeckBuilder
            allCards={allCards}
            cardsLoading={cardsLoading}
            onSaveDeck={saveDeck}
            onBackToMenu={goToMenu}
          />
        )}
      </div>
    )
  }

  // Game Screen
  if (gameOver) {
    return (
      <div className="App anime-gradient-bg" style={{ minHeight: '100vh' }}>
        <AnimeBackground />
        <div className="game-over">
          <h1 className="anime-text-glow">Game Over!</h1>
          <div className="winner anime-border-glow">
            <h2>{winner ? winner.name : 'Unknown'} Wins!</h2>
            <button onClick={goToMenu} className="new-game-button anime-energy-orb">
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!gameState || !gameStarted) {
    return (
      <div className="App anime-gradient-bg" style={{ minHeight: '100vh' }}>
        <AnimeBackground />
        <div className="loading">
          <div className="loading-text anime-text-glow">Initializing game...</div>
        </div>
      </div>
    )
  }

  // Debug logging for App component
  console.log('🎮 App render:', {
    gameState: !!gameState,
    gameStarted,
    currentPhase,
    players: gameState?.players?.map(p => ({
      name: p.name,
      turn: p.turn,
      handLength: p.hand.length
    }))
  })

  return (
    <div className="App game-screen" style={{ minHeight: '100vh' }}>
      <AnimeBackground />
      
      <GameTutorial 
        gameState={gameState}
        currentPhase={currentPhase}
        onClose={() => setShowTutorial(false)}
        isVisible={showTutorial}
      />
      
      <div className="game-layout">
        {/* Main Game Board */}
        <div className="game-board-container">
      <CleanGameBoard 
        gameState={gameState}
        currentPhase={currentPhase}
        selectedCard={selectedCard}
        onCardSelect={handleCardSelect}
        onCardAction={handleCardAction}
        availableActions={availableActions}
        onActionClick={handleActionClick}
      />
        </div>

        {/* Side Panel - Game Info & Controls */}
        <div className="game-side-panel">
      <GameInfo 
        currentPhase={currentPhase}
            onPhaseChange={(phase) => setCurrentPhase(phase)}
        gameLog={gameLog}
        gameState={gameState}
        onNextPhase={nextPhase}
        onEndTurn={endTurn}
            onSkipPhase={handleSkipPhase}
        availableActions={availableActions}
        onActionClick={handleActionClick}
      />
        </div>
      </div>
      
      <button onClick={goToMenu} className="back-to-menu-btn anime-neon-blue">
        ← Menu
      </button>
      
      <ShortcutGuide />
      <PhaseNotification 
        phase={notificationPhase}
        show={showPhaseNotification}
        onComplete={() => setShowPhaseNotification(false)}
      />
    </div>
  )
}

export default App
