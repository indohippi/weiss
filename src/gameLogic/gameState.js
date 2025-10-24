// Weiss Schwarz Game State Management
// Following official Weiss Schwarz rules v2.09 with full gameplay implementation

// Import and re-export constants
export { 
  gamePhases, 
  cardTypes, 
  cardColors, 
  cardTriggers, 
  attackTypes 
} from './constants'

import { buildBalancedDeck } from './cardDatabase'
import { cardTypes, cardTriggers } from './constants'

export function initializeGame() {
  // Create balanced 50-card decks from the card database
  // Player 1 gets a Sword Art Online themed deck
  const deck1 = buildBalancedDeck('Sword Art Online')
  
  // Player 2 gets a Re:Zero themed deck
  const deck2 = buildBalancedDeck('Re:Zero')
  
  // Shuffle decks
  const shuffledDeck1 = shuffleDeck(deck1)
  const shuffledDeck2 = shuffleDeck(deck2)
  
  return {
    players: [
      {
        id: 1,
        name: 'Player 1',
        level: [],
        hand: [],
        deck: shuffledDeck1,
        // 5 stage positions: 0-2 center stage, 3-4 back stage
        stage: [null, null, null, null, null],
        waitingRoom: [],
        clock: [],
        stock: [],
        climaxArea: null,
        memory: [],
        turn: true,
        // Initial hand and mulligan
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
    gameState: 'playing', // playing, paused, gameOver
    // Attack phase state
    attackPhase: {
      isActive: false,
      attackingCharacter: null,
      attackType: null,
      defendingCharacter: null,
      triggerCard: null
    },
    // Game flow state
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

export function shuffleDeck(deck) {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function drawCards(player, count) {
  const drawnCards = []
  for (let i = 0; i < count && player.deck.length > 0; i++) {
    const card = player.deck.pop()
    drawnCards.push(card)
    player.hand.push(card)
  }
  return drawnCards
}

export function canPlayCard(card, player, gameState) {
  // Check if player has enough stock for cost
  if (card.cost > player.stock.length) {
    return { canPlay: false, reason: 'Not enough stock' }
  }
  
  // Check level requirement (except for climax cards)
  if (card.type !== cardTypes.CLIMAX && card.level > player.level.length) {
    return { canPlay: false, reason: 'Level too high' }
  }
  
  // Check color requirement (except for level 0 cards)
  if (card.level > 0 && !hasColorRequirement(player, card.color)) {
    return { canPlay: false, reason: 'Color requirement not met' }
  }
  
  // Check field capacity for characters
  if (card.type === cardTypes.CHARACTER) {
    // Find empty stage position
    const emptyPosition = player.stage.findIndex(pos => pos === null)
    if (emptyPosition === -1) {
      return { canPlay: false, reason: 'No empty stage positions' }
    }
  }
  
  return { canPlay: true, reason: 'Can play' }
}

export function hasColorRequirement(player, cardColor) {
  // Check if player has the required color in level or clock
  const hasInLevel = player.level.some(card => card.color === cardColor)
  const hasInClock = player.clock.some(card => card.color === cardColor)
  return hasInLevel || hasInClock
}

export function playCard(card, player, gameState, stagePosition = null) {
  const canPlay = canPlayCard(card, player, gameState)
  if (!canPlay.canPlay) {
    return { success: false, reason: canPlay.reason }
  }
  
  // Remove card from hand
  const cardIndex = player.hand.findIndex(c => c.id === card.id)
  if (cardIndex === -1) return { success: false, reason: 'Card not in hand' }
  
  player.hand.splice(cardIndex, 1)
  
  // Pay stock cost
  for (let i = 0; i < card.cost; i++) {
    if (player.stock.length > 0) {
      const costCard = player.stock.pop()
      player.waitingRoom.push(costCard)
    }
  }
  
  // Place card based on type
  if (card.type === cardTypes.CHARACTER) {
    if (stagePosition !== null && stagePosition >= 0 && stagePosition < 5) {
      // If position already occupied, move existing card to waiting room
      if (player.stage[stagePosition] !== null) {
        player.waitingRoom.push(player.stage[stagePosition])
      }
      player.stage[stagePosition] = { ...card, state: 'stand' }
    }
  } else if (card.type === cardTypes.EVENT) {
    // Event cards go to resolution zone then waiting room
    player.waitingRoom.push(card)
  } else if (card.type === cardTypes.CLIMAX) {
    // Climax cards go to climax area
    if (player.climaxArea !== null) {
      player.waitingRoom.push(player.climaxArea)
    }
    player.climaxArea = card
  }
  
  return { success: true, reason: 'Card played successfully' }
}

export function clockCard(card, player) {
  // Move card to clock
  const cardIndex = player.hand.findIndex(c => c.id === card.id)
  if (cardIndex === -1) return { success: false, reason: 'Card not in hand' }
  
  player.hand.splice(cardIndex, 1)
  player.clock.push(card)
  
  // Draw 2 cards for clocking
  drawCards(player, 2)
  
  // Check for level up (7+ cards in clock)
  if (player.clock.length >= 7) {
    return performLevelUp(player)
  }
  
  return { success: true, leveledUp: false }
}

export function performLevelUp(player) {
  // Choose 1 card from bottom 7 cards of clock to put in level
  const bottomCards = player.clock.slice(-7)
  const chosenCard = bottomCards[0] // For simplicity, always choose first card
  
  // Move chosen card to level
  if (!player.level) player.level = []
  player.level.push(chosenCard)
  
  // Move remaining 6 cards to waiting room
  const remainingCards = player.clock.slice(0, -7)
  player.waitingRoom.push(...remainingCards)
  
  // Clear clock
  player.clock = []
  
  return { success: true, leveledUp: true, newLevel: player.level.length }
}

export function canAttack(character, player) {
  // Character must be in stand state and on center stage (positions 0-2)
  const position = player.stage.findIndex(c => c && c.id === character.id)
  return position >= 0 && position <= 2 && character.state === 'stand'
}

export function declareAttack(character, player, attackType, defendingCharacter = null) {
  if (!canAttack(character, player)) {
    return { success: false, reason: 'Cannot attack with this character' }
  }
  
  // Set attack phase state
  const attackState = {
    isActive: true,
    attackingCharacter: character,
    attackType: attackType,
    defendingCharacter: defendingCharacter,
    triggerCard: null
  }
  
  // Apply attack type effects
  if (attackType === attackTypes.DIRECT) {
    character.soul += 1
  } else if (attackType === attackTypes.SIDE && defendingCharacter) {
    character.soul -= defendingCharacter.level
  }
  
  // Put attacking character in rest state
  character.state = 'rest'
  
  return { success: true, attackState }
}

export function performTriggerCheck(player, gameState) {
  if (player.deck.length === 0) {
    return null
  }
  
  // Reveal top card of deck
  const triggerCard = player.deck.pop()
  gameState.attackPhase.triggerCard = triggerCard
  
  // Execute trigger effects
  if (triggerCard.trigger) {
    executeTriggerEffect(triggerCard.trigger, player, gameState)
  }
  
  // Put card in stock
  player.stock.push(triggerCard)
  
  return triggerCard
}

export function executeTriggerEffect(trigger, player, gameState) {
  switch (trigger) {
    case cardTriggers.SOUL:
      // +1 soul to attacking character until end of turn
      if (gameState.attackPhase.attackingCharacter) {
        gameState.attackPhase.attackingCharacter.soul += 1
      }
      break
    case cardTriggers.DRAW:
      // Draw 1 card
      drawCards(player, 1)
      break
    case cardTriggers.COMEBACK:
      // Return character from waiting room to hand
      if (player.waitingRoom.length > 0) {
        const character = player.waitingRoom.find(c => c.type === cardTypes.CHARACTER)
        if (character) {
          const index = player.waitingRoom.findIndex(c => c.id === character.id)
          player.waitingRoom.splice(index, 1)
          player.hand.push(character)
        }
      }
      break
    case cardTriggers.TREASURE:
      // Return to hand, then put top card in stock
      if (gameState.attackPhase.triggerCard) {
        player.hand.push(gameState.attackPhase.triggerCard)
        if (player.deck.length > 0) {
          const topCard = player.deck.pop()
          player.stock.push(topCard)
        }
      }
      break
    case cardTriggers.GATE:
      // Return climax from waiting room to hand
      const climax = player.waitingRoom.find(c => c.type === cardTypes.CLIMAX)
      if (climax) {
        const index = player.waitingRoom.findIndex(c => c.id === climax.id)
        player.waitingRoom.splice(index, 1)
        player.hand.push(climax)
      }
      break
    case cardTriggers.STANDBY:
      // Put character from waiting room to stage
      const standbyChar = player.waitingRoom.find(c => c.type === cardTypes.CHARACTER)
      if (standbyChar && standbyChar.level <= player.level.length + 1) {
        const index = player.waitingRoom.findIndex(c => c.id === standbyChar.id)
        player.waitingRoom.splice(index, 1)
        // Find empty stage position
        const emptyPos = player.stage.findIndex(pos => pos === null)
        if (emptyPos !== -1) {
          player.stage[emptyPos] = { ...standbyChar, state: 'rest' }
        }
      }
      break
  }
}

export function resolveBattle(attackingCharacter, defendingCharacter) {
  // Compare power
  if (attackingCharacter.power > defendingCharacter.power) {
    defendingCharacter.state = 'reverse'
    return { result: 'attacker_wins', defeatedCard: defendingCharacter }
  } else if (defendingCharacter.power > attackingCharacter.power) {
    attackingCharacter.state = 'reverse'
    return { result: 'defender_wins', defeatedCard: attackingCharacter }
  } else {
    // Equal power - both go to reverse state
    attackingCharacter.state = 'reverse'
    defendingCharacter.state = 'reverse'
    return { result: 'tie', bothReversed: true }
  }
}

export function dealDamage(attackingCharacter, defendingPlayer) {
  if (!attackingCharacter || attackingCharacter.soul <= 0) {
    return { damage: 0, canceled: false }
  }
  
  const damage = attackingCharacter.soul
  const damageCards = []
  
  // Perform damage process
  for (let i = 0; i < damage; i++) {
    if (defendingPlayer.deck.length === 0) {
      // Check for refresh
      if (defendingPlayer.waitingRoom.length === 0) {
        return { damage: i, canceled: false, gameOver: true }
      }
      // Refresh deck
      defendingPlayer.deck = shuffleDeck([...defendingPlayer.waitingRoom])
      defendingPlayer.waitingRoom = []
      defendingPlayer.clock.push(defendingPlayer.deck.pop())
    }
    
    const card = defendingPlayer.deck.pop()
    damageCards.push(card)
    
    // Check for climax (damage cancel)
    if (card.type === cardTypes.CLIMAX) {
      // Damage cancel - put all cards in waiting room
      defendingPlayer.waitingRoom.push(...damageCards)
      return { damage: i, canceled: true }
    }
  }
  
  // No damage cancel - put cards in clock
  defendingPlayer.clock.push(...damageCards)
  
  // Check for level up
  if (defendingPlayer.clock.length >= 7) {
    performLevelUp(defendingPlayer)
  }
  
  return { damage: damage, canceled: false }
}

export function endTurn(gameState) {
  const currentPlayer = gameState.players.find(p => p.turn)
  const nextPlayer = gameState.players.find(p => !p.turn)
  
  if (currentPlayer && nextPlayer) {
    // End phase actions
    // Check hand limit (7 cards)
    while (currentPlayer.hand.length > 7) {
      const excessCard = currentPlayer.hand.pop()
      currentPlayer.waitingRoom.push(excessCard)
    }
    
    // Remove climax from climax area
    if (currentPlayer.climaxArea) {
      currentPlayer.waitingRoom.push(currentPlayer.climaxArea)
      currentPlayer.climaxArea = null
    }
    
    // Switch turns
    currentPlayer.turn = false
    nextPlayer.turn = true
    gameState.currentTurn = nextPlayer.id
    gameState.turnNumber++
    gameState.currentPhase = 'stand'
    
    // Reset phase actions
    Object.keys(gameState.phaseActions).forEach(phase => {
      gameState.phaseActions[phase].completed = false
    })
    
    // Reset attack phase
    gameState.attackPhase = {
      isActive: false,
      attackingCharacter: null,
      attackType: null,
      defendingCharacter: null,
      triggerCard: null
    }
  }
}

export function checkWinCondition(gameState) {
  for (const player of gameState.players) {
    // Check level condition (4+ cards in level = lose)
    if (player.level && player.level.length >= 4) {
      return { 
        winner: gameState.players.find(p => p.id !== player.id), 
        reason: 'level',
        loser: player
      }
    }
    
    // Check deck and waiting room condition (both empty = lose)
    if (player.deck.length === 0 && player.waitingRoom.length === 0) {
      return { 
        winner: gameState.players.find(p => p.id !== player.id), 
        reason: 'deck_depletion',
        loser: player
      }
    }
  }
  return null
}

export function performMulligan(player) {
  if (player.hasMulliganed) {
    return false
  }
  
  // Draw initial 5 cards
  drawCards(player, 5)
  player.hasMulliganed = true
  
  return true
}

export function refreshDeck(player) {
  if (player.deck.length === 0 && player.waitingRoom.length > 0) {
    player.deck = shuffleDeck([...player.waitingRoom])
    player.waitingRoom = []
    
    // Put top card in clock
    if (player.deck.length > 0) {
      const topCard = player.deck.pop()
      player.clock.push(topCard)
      
      // Check for level up
      if (player.clock.length >= 7) {
        performLevelUp(player)
      }
    }
    
    return true
  }
  return false
}

// New gameplay functions for MTG Arena style experience
export function autoAdvancePhase(gameState, currentPhase) {
  const currentPlayer = gameState.players.find(p => p.turn)
  if (!currentPlayer) return currentPhase
  
  switch (currentPhase) {
    case 'stand':
      // Auto-stand all characters
      currentPlayer.stage.forEach((card, index) => {
        if (card && card.state === 'rest') {
          currentPlayer.stage[index] = { ...card, state: 'stand' }
        }
      })
      gameState.phaseActions.stand.completed = true
      return 'draw'
      
    case 'draw':
      // Auto-draw 1 card
      if (currentPlayer.deck.length > 0) {
        drawCards(currentPlayer, 1)
        gameState.phaseActions.draw.completed = true
      }
      return 'clock'
      
    case 'clock':
      // Player must choose to clock or skip
      return 'clock'
      
    case 'main':
      // Player can play cards
      return 'main'
      
    case 'climax':
      // Player can play climax
      return 'climax'
      
    case 'attack':
      // Player can attack
      return 'attack'
      
    case 'end':
      // Auto-end turn
      endTurn(gameState)
      return 'stand'
      
    default:
      return currentPhase
  }
}

export function canAdvancePhase(gameState, currentPhase) {
  const currentPlayer = gameState.players.find(p => p.turn)
  if (!currentPlayer) return false
  
  switch (currentPhase) {
    case 'stand':
      return true // Always can advance
    case 'draw':
      return gameState.phaseActions.stand.completed
    case 'clock':
      return gameState.phaseActions.draw.completed
    case 'main':
      return gameState.phaseActions.clock.completed
    case 'climax':
      return gameState.phaseActions.main.completed
    case 'attack':
      return gameState.phaseActions.climax.completed
    case 'end':
      return gameState.phaseActions.attack.completed
    default:
      return false
  }
}

export function getAvailableActions(gameState, currentPhase, selectedCard) {
  const currentPlayer = gameState.players.find(p => p.turn)
  if (!currentPlayer) return []
  
  const actions = []
  
  switch (currentPhase) {
    case 'clock':
      // Can clock any card from hand
      currentPlayer.hand.forEach(card => {
        actions.push({
          type: 'clock',
          card: card,
          description: `Clock ${card.name} (draw 2 cards)`
        })
      })
      actions.push({
        type: 'skip',
        description: 'Skip clock phase'
      })
      break
      
    case 'main':
      // Can play cards from hand
      currentPlayer.hand.forEach(card => {
        const canPlay = canPlayCard(card, currentPlayer, gameState)
        if (canPlay.canPlay) {
          actions.push({
            type: 'play',
            card: card,
            description: `Play ${card.name} (Cost: ${card.cost})`
          })
        }
      })
      break
      
    case 'climax':
      // Can play climax cards
      const climaxCards = currentPlayer.hand.filter(card => card.type === cardTypes.CLIMAX)
      climaxCards.forEach(card => {
        actions.push({
          type: 'play',
          card: card,
          description: `Play ${card.name} as climax`
        })
      })
      break
      
    case 'attack':
      // Can attack with standing characters
      currentPlayer.stage.forEach((card, position) => {
        if (card && card.state === 'stand' && position <= 2) {
          actions.push({
            type: 'attack',
            card: card,
            position: position,
            description: `Attack with ${card.name} (Power: ${card.power}, Soul: ${card.soul})`
          })
        }
      })
      break
  }
  
  return actions
}
