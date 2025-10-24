import React, { useState, useEffect } from 'react'
import MainMenu from './components/MainMenu'
import DeckBuilder from './components/DeckBuilder'
import GameBoard from './components/GameBoard'
import GameInfo from './components/GameInfo'
import ShortcutGuide from './components/ShortcutGuide'
import PhaseNotification from './components/PhaseNotification'
import { loadAllCards } from './services/cardDataLoader'
import { 
  performMulligan, 
  checkWinCondition,
  shuffleDeck
} from './gameLogic/gameState'
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

  // Initialize game with custom decks
  const initializeGameWithDecks = (deck1Data, deck2Data) => {
    // Shuffle both decks
    const shuffledDeck1 = shuffleDeck([...deck1Data])
    const shuffledDeck2 = shuffleDeck([...deck2Data])
    
    return {
      players: [
        {
          id: 1,
          name: 'Player 1',
          level: [],
          hand: [],
          deck: shuffledDeck1,
          stage: [null, null, null, null, null],
          waitingRoom: [],
          clock: [],
          stock: [],
          climaxArea: null,
          memory: [],
          turn: true,
          hasMulliganed: false
        },
        {
          id: 2,
          name: 'Player 2',
          level: [],
          hand: [],
          deck: shuffledDeck2,
          stage: [null, null, null, null, null],
          waitingRoom: [],
          clock: [],
          stock: [],
          climaxArea: null,
          memory: [],
          turn: false,
          hasMulliganed: false
        }
      ],
      currentPhase: 'stand',
      currentTurn: 1,
      turnNumber: 1,
      gameLog: [],
      selectedCard: null,
      gameState: 'playing',
      attackPhase: {
        isActive: false,
        attackingCharacter: null,
        attackType: null,
        defendingCharacter: null,
        triggerCard: null
      },
      phaseActions: {
        stand: { completed: false, description: 'Stand all characters' },
        draw: { completed: false, description: 'Draw 1 card' },
        clock: { completed: false, description: 'Optionally clock a card' },
        main: { completed: false, description: 'Play cards and use abilities' },
        climax: { completed: false, description: 'Play climax cards' },
        attack: { completed: false, description: 'Attack with characters' },
        end: { completed: false, description: 'End turn cleanup' }
      }
    }
  }

  // Start game with selected decks
  const handleStartGame = ({ deck1, deck2 }) => {
    if (!deck1 || !deck2) {
      alert('Please select decks for both players')
      return
    }

    const newGameState = initializeGameWithDecks(deck1.cards, deck2.cards)
    
    // Perform initial mulligan for both players
    newGameState.players.forEach(player => {
      performMulligan(player)
    })
    
    setGameState(newGameState)
    setGameStarted(true)
    setCurrentPhase('stand')
    setGameOver(false)
    setWinner(null)
    setGameLog(['Game started! Both players drew 5 cards.'])
    setCurrentScreen(SCREENS.GAME)
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
    
    // Auto-execute stand phase
    if (currentPhase === 'stand' && !gameState.phaseActions.stand.completed) {
      const result = executeStandPhase(gameState)
      setGameLog(prev => [...prev, `✨ ${result.message}`])
      
      if (result.autoAdvance) {
        setTimeout(() => {
          setCurrentPhase('draw')
        }, 500)
      }
    }
    
    // Auto-execute draw phase
    if (currentPhase === 'draw' && gameState.phaseActions.stand.completed && !gameState.phaseActions.draw.completed) {
      const result = executeDrawPhase(gameState)
      setGameLog(prev => [...prev, `📥 ${result.message}`])
      setGameState({...gameState})
      
      if (result.gameOver) {
        handleGameOver(currentPlayer, 'deck out')
      } else if (result.autoAdvance) {
        setTimeout(() => {
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
      setGameState({...gameState})
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
      if (result.success) {
        setGameLog(prev => [...prev, `✅ ${result.message}`])
        setGameState({...gameState})
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
      setGameState({...gameState})
      
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
      setGameState({...gameState})
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

  return (
    <div className="App game-screen" style={{ minHeight: '100vh' }}>
      <AnimeBackground />
      
      <div className="game-layout">
        {/* Main Game Board */}
        <div className="game-board-container">
      <GameBoard 
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
