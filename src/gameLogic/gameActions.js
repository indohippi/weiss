// Enhanced Game Actions - Complete attack/defend mechanics and phase flow
import { cardTypes, cardTriggers } from './constants'
import { 
  drawCards, 
  clockCard, 
  playCard, 
  performLevelUp,
  shuffleDeck 
} from './gameState'

/**
 * Execute Stand Phase - Stand all rested characters
 */
export function executeStandPhase(gameState) {
  const currentPlayer = gameState.players.find(p => p.turn)
  
  // Stand all characters
  currentPlayer.stage.forEach((card, index) => {
    if (card && card.state === 'rest') {
      currentPlayer.stage[index] = { ...card, state: 'stand' }
    }
  })
  
  gameState.phaseActions.stand.completed = true
  
  return {
    success: true,
    message: 'All characters stood up',
    autoAdvance: true
  }
}

/**
 * Execute Draw Phase - Draw 1 card (or refresh if deck empty)
 */
export function executeDrawPhase(gameState) {
  const currentPlayer = gameState.players.find(p => p.turn)
  
  // Check if deck is empty
  if (currentPlayer.deck.length === 0) {
    // Check if waiting room is also empty (lose condition)
    if (currentPlayer.waitingRoom.length === 0) {
      return {
        success: false,
        message: 'Deck and waiting room are empty - you lose!',
        gameOver: true
      }
    }
    
    // Perform deck refresh
    refreshDeck(currentPlayer)
    return {
      success: true,
      message: 'Deck refreshed! Top card put into clock. Drew 1 card.',
      autoAdvance: true
    }
  }
  
  // Draw 1 card
  drawCards(currentPlayer, 1)
  gameState.phaseActions.draw.completed = true
  
  return {
    success: true,
    message: 'Drew 1 card',
    autoAdvance: true
  }
}

/**
 * Refresh deck when it runs out
 */
function refreshDeck(player) {
  if (player.deck.length === 0 && player.waitingRoom.length > 0) {
    // Shuffle waiting room into deck
    player.deck = shuffleDeck([...player.waitingRoom])
    player.waitingRoom = []
    
    // Put top card into clock
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

/**
 * Complete Attack Phase
 */
export function completeAttackPhase(gameState) {
  const currentPlayer = gameState.players.find(p => p.turn)
  
  // Move all reversed characters to waiting room
  currentPlayer.stage.forEach((card, index) => {
    if (card && card.state === 'reverse') {
      currentPlayer.waitingRoom.push(card)
      currentPlayer.stage[index] = null
    }
  })
  
  // Also check opponent's reversed characters
  const opponent = gameState.players.find(p => !p.turn)
  opponent.stage.forEach((card, index) => {
    if (card && card.state === 'reverse') {
      opponent.waitingRoom.push(card)
      opponent.stage[index] = null
    }
  })
  
  gameState.phaseActions.attack.completed = true
  
  return {
    success: true,
    message: 'Attack phase completed. Reversed characters moved to waiting room.'
  }
}

/**
 * Play a character to a specific stage position
 */
export function playCharacterToStage(card, player, gameState, stagePosition) {
  const result = playCard(card, player, gameState, stagePosition)
  
  if (result.success) {
    return {
      success: true,
      message: `Played ${card.name} to position ${stagePosition + 1}`
    }
  }
  
  return {
    success: false,
    message: result.reason
  }
}

/**
 * Declare an attack with a character
 */
export function declareAttack(attackingCard, attackingPlayer, defendingPlayer, gameState) {
  // Find attacker position
  const attackerPos = attackingPlayer.stage.findIndex(c => c && c.id === attackingCard.id)
  
  if (attackerPos === -1 || attackerPos > 2) {
    return { success: false, message: 'Character must be on center stage (positions 1-3)' }
  }
  
  if (attackingCard.state !== 'stand') {
    return { success: false, message: 'Character must be in stand state to attack' }
  }
  
  // Rest the attacking character
  attackingPlayer.stage[attackerPos] = { ...attackingCard, state: 'rest' }
  
  // Find defending character in same position
  const defendingCard = defendingPlayer.stage[attackerPos]
  
  // Determine attack type
  let attackType = 'direct'
  let baseSoul = attackingCard.soul
  
  if (defendingCard) {
    attackType = 'frontal'
    baseSoul = attackingCard.soul
  }
  
  // Set up attack state
  gameState.attackPhase = {
    isActive: true,
    attackingCharacter: attackingCard,
    attackingPosition: attackerPos,
    defendingCharacter: defendingCard,
    attackType: attackType,
    triggerCard: null,
    baseSoul: baseSoul,
    currentSoul: baseSoul
  }
  
  return {
    success: true,
    message: `${attackingCard.name} attacks! (${attackType})`,
    needsTriggerCheck: true
  }
}

/**
 * Perform trigger check during attack
 */
export function performTriggerCheck(attackingPlayer, gameState) {
  // Check if deck is empty
  if (attackingPlayer.deck.length === 0) {
    if (attackingPlayer.waitingRoom.length > 0) {
      refreshDeck(attackingPlayer)
    } else {
      return { success: false, message: 'No cards to trigger check', gameOver: true }
    }
  }
  
  // Reveal top card
  const triggerCard = attackingPlayer.deck.pop()
  gameState.attackPhase.triggerCard = triggerCard
  
  // Execute trigger effect
  if (triggerCard.trigger) {
    executeTrigger(triggerCard.trigger, attackingPlayer, gameState)
  }
  
  // Put trigger card into stock
  attackingPlayer.stock.push(triggerCard)
  
  return {
    success: true,
    message: `Trigger: ${triggerCard.name} ${triggerCard.trigger ? `(${triggerCard.trigger})` : '(no trigger)'}`,
    triggerCard: triggerCard,
    needsBattleStep: gameState.attackPhase.defendingCharacter !== null
  }
}

/**
 * Execute trigger effects
 */
function executeTrigger(trigger, player, gameState) {
  switch (trigger) {
    case cardTriggers.SOUL:
      // +1 soul to attacking character
      if (gameState.attackPhase.attackingCharacter) {
        gameState.attackPhase.currentSoul += 1
      }
      break
      
    case cardTriggers.DRAW:
      // Draw 1 card
      drawCards(player, 1)
      break
      
    case cardTriggers.COMEBACK:
      // Return character from waiting room to hand
      const character = player.waitingRoom.find(c => c.type === cardTypes.CHARACTER)
      if (character) {
        const index = player.waitingRoom.indexOf(character)
        player.waitingRoom.splice(index, 1)
        player.hand.push(character)
      }
      break
      
    case cardTriggers.TREASURE:
      // Trigger card goes to hand instead of stock
      if (gameState.attackPhase.triggerCard) {
        // Remove from stock (will be added later)
        const triggerCard = player.stock.pop()
        player.hand.push(triggerCard)
        
        // Put top of deck into stock
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
        const index = player.waitingRoom.indexOf(climax)
        player.waitingRoom.splice(index, 1)
        player.hand.push(climax)
      }
      break
      
    default:
      break
  }
}

/**
 * Resolve battle between characters
 */
export function resolveBattle(gameState) {
  const { attackingCharacter, defendingCharacter, attackingPosition } = gameState.attackPhase
  
  if (!defendingCharacter) {
    return {
      success: true,
      message: 'No defending character - direct attack!',
      needsDamageStep: true
    }
  }
  
  // Compare power
  const attackingPlayer = gameState.players.find(p => p.turn)
  const defendingPlayer = gameState.players.find(p => !p.turn)
  
  const attackerPower = attackingCharacter.power
  const defenderPower = defendingCharacter.power
  
  if (attackerPower > defenderPower) {
    // Attacker wins - reverse defender
    const defIndex = defendingPlayer.stage.indexOf(defendingCharacter)
    if (defIndex !== -1) {
      defendingPlayer.stage[defIndex] = { ...defendingCharacter, state: 'reverse' }
    }
    
    return {
      success: true,
      message: `${attackingCharacter.name} (${attackerPower}) defeats ${defendingCharacter.name} (${defenderPower})!`,
      winner: 'attacker',
      needsDamageStep: true
    }
  } else if (defenderPower > attackerPower) {
    // Defender wins - reverse attacker
    const atkIndex = attackingPlayer.stage.indexOf(attackingCharacter)
    if (atkIndex !== -1) {
      attackingPlayer.stage[atkIndex] = { ...attackingCharacter, state: 'reverse' }
    }
    
    return {
      success: true,
      message: `${defendingCharacter.name} (${defenderPower}) defeats ${attackingCharacter.name} (${attackerPower})!`,
      winner: 'defender',
      needsDamageStep: false
    }
  } else {
    // Tie - both reverse
    const atkIndex = attackingPlayer.stage.indexOf(attackingCharacter)
    const defIndex = defendingPlayer.stage.indexOf(defendingCharacter)
    
    if (atkIndex !== -1) {
      attackingPlayer.stage[atkIndex] = { ...attackingCharacter, state: 'reverse' }
    }
    if (defIndex !== -1) {
      defendingPlayer.stage[defIndex] = { ...defendingCharacter, state: 'reverse' }
    }
    
    return {
      success: true,
      message: `Tie! Both characters reversed (${attackerPower} power each)`,
      winner: 'tie',
      needsDamageStep: false
    }
  }
}

/**
 * Deal damage to opponent
 */
export function dealDamage(gameState, defendingPlayer) {
  const { currentSoul } = gameState.attackPhase
  
  if (!currentSoul || currentSoul <= 0) {
    return {
      success: true,
      damage: 0,
      canceled: false,
      message: 'No damage dealt (0 soul)'
    }
  }
  
  const damageCards = []
  let damageCanceled = false
  
  // Perform damage check for each soul
  for (let i = 0; i < currentSoul; i++) {
    // Check if deck is empty
    if (defendingPlayer.deck.length === 0) {
      if (defendingPlayer.waitingRoom.length === 0) {
        return {
          success: true,
          damage: i,
          canceled: false,
          gameOver: true,
          message: 'Defender has no cards left - game over!'
        }
      }
      // Refresh deck
      refreshDeck(defendingPlayer)
    }
    
    // Reveal top card
    const card = defendingPlayer.deck.pop()
    damageCards.push(card)
    
    // Check for climax (damage cancel)
    if (card.type === cardTypes.CLIMAX) {
      damageCanceled = true
      
      // Put all damage cards into waiting room
      defendingPlayer.waitingRoom.push(...damageCards)
      
      return {
        success: true,
        damage: 0,
        canceled: true,
        canceledAt: i + 1,
        message: `Damage canceled! (${card.name} revealed)`
      }
    }
  }
  
  // No cancel - put cards into clock
  defendingPlayer.clock.push(...damageCards)
  
  // Check for level up(s)
  while (defendingPlayer.clock.length >= 7) {
    performLevelUp(defendingPlayer)
    
    // Check for level 4 (lose condition)
    if (defendingPlayer.level.length >= 4) {
      return {
        success: true,
        damage: currentSoul,
        canceled: false,
        leveledUp: true,
        gameOver: true,
        message: `${currentSoul} damage dealt! Defender leveled to 4 - game over!`
      }
    }
  }
  
  const leveledUp = defendingPlayer.level.length > 0
  
  return {
    success: true,
    damage: currentSoul,
    canceled: false,
    leveledUp: leveledUp,
    message: `${currentSoul} damage dealt!${leveledUp ? ' Defender leveled up!' : ''}`
  }
}

/**
 * Complete the current attack
 */
export function completeAttack(gameState) {
  // Reset attack phase
  gameState.attackPhase = {
    isActive: false,
    attackingCharacter: null,
    attackingPosition: null,
    defendingCharacter: null,
    attackType: null,
    triggerCard: null,
    baseSoul: 0,
    currentSoul: 0
  }
  
  return {
    success: true,
    message: 'Attack completed'
  }
}

/**
 * Skip clock phase
 */
export function skipClockPhase(gameState) {
  gameState.phaseActions.clock.completed = true
  
  return {
    success: true,
    message: 'Skipped clock phase',
    autoAdvance: false
  }
}

/**
 * Execute clock phase (clock a card from hand, draw 2)
 */
export function executeClockPhase(card, player, gameState) {
  const result = clockCard(card, player)
  
  if (result.success) {
    gameState.phaseActions.clock.completed = true
    
    return {
      success: true,
      message: `Clocked ${card.name}, drew 2 cards${result.leveledUp ? ', and leveled up!' : ''}`,
      leveledUp: result.leveledUp,
      newLevel: result.newLevel
    }
  }
  
  return {
    success: false,
    message: result.reason
  }
}

/**
 * Play a card from hand
 */
export function playCardFromHand(card, player, gameState, targetPosition = null) {
  let position = targetPosition
  
  // Auto-select position for characters if not specified
  if (card.type === cardTypes.CHARACTER && position === null) {
    position = player.stage.findIndex(slot => slot === null)
  }
  
  const result = playCard(card, player, gameState, position)
  
  if (result.success) {
    // Mark appropriate phase as completed
    if (gameState.currentPhase === 'main') {
      // Don't auto-complete main phase - player can play multiple cards
    } else if (gameState.currentPhase === 'climax') {
      gameState.phaseActions.climax.completed = true
    }
    
    return {
      success: true,
      message: `Played ${card.name}${position !== null ? ` to position ${position + 1}` : ''}`
    }
  }
  
  return {
    success: false,
    message: result.reason
  }
}

/**
 * Advance to next phase
 */
export function advancePhase(gameState) {
  const phaseOrder = ['stand', 'draw', 'clock', 'main', 'climax', 'attack', 'end']
  const currentIndex = phaseOrder.indexOf(gameState.currentPhase)
  
  if (currentIndex === -1 || currentIndex === phaseOrder.length - 1) {
    return {
      success: false,
      message: 'Cannot advance phase'
    }
  }
  
  // Check if current phase is completed
  const currentPhaseAction = gameState.phaseActions[gameState.currentPhase]
  if (!currentPhaseAction.completed) {
    return {
      success: false,
      message: `Must complete ${gameState.currentPhase} phase first`
    }
  }
  
  const nextPhase = phaseOrder[currentIndex + 1]
  gameState.currentPhase = nextPhase
  
  return {
    success: true,
    nextPhase: nextPhase,
    message: `Advanced to ${nextPhase} phase`
  }
}

/**
 * End the current turn
 */
export function endCurrentTurn(gameState) {
  const currentPlayer = gameState.players.find(p => p.turn)
  const nextPlayer = gameState.players.find(p => !p.turn)
  
  if (!currentPlayer || !nextPlayer) {
    return { success: false, message: 'Invalid game state' }
  }
  
  // End phase - hand limit check
  while (currentPlayer.hand.length > 7) {
    const discarded = currentPlayer.hand.pop()
    currentPlayer.waitingRoom.push(discarded)
  }
  
  // Remove climax from climax area
  if (currentPlayer.climaxArea) {
    currentPlayer.waitingRoom.push(currentPlayer.climaxArea)
    currentPlayer.climaxArea = null
  }
  
  // Move reversed characters to waiting room
  currentPlayer.stage.forEach((card, index) => {
    if (card && card.state === 'reverse') {
      currentPlayer.waitingRoom.push(card)
      currentPlayer.stage[index] = null
    }
  })
  
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
    attackingPosition: null,
    defendingCharacter: null,
    attackType: null,
    triggerCard: null,
    baseSoul: 0,
    currentSoul: 0
  }
  
  return {
    success: true,
    message: `Turn ended. ${nextPlayer.name}'s turn begins!`
  }
}

/**
 * Allow player to pass/skip main phase
 */
export function skipMainPhase(gameState) {
  gameState.phaseActions.main.completed = true
  return { success: true, message: 'Main phase skipped' }
}

/**
 * Allow player to skip climax phase
 */
export function skipClimaxPhase(gameState) {
  gameState.phaseActions.climax.completed = true
  return { success: true, message: 'Climax phase skipped' }
}

/**
 * Allow player to end attack phase (no more attacks)
 */
export function endAttackPhase(gameState) {
  // Move reversed characters to waiting room
  completeAttackPhase(gameState)
  return { success: true, message: 'Attack phase ended' }
}

export default {
  executeStandPhase,
  executeDrawPhase,
  completeAttackPhase,
  playCharacterToStage,
  declareAttack,
  performTriggerCheck,
  dealDamage,
  completeAttack,
  skipClockPhase,
  executeClockPhase,
  playCardFromHand,
  advancePhase,
  endCurrentTurn,
  skipMainPhase,
  skipClimaxPhase,
  endAttackPhase
}

