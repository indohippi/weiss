// Simple, bulletproof game logic

// Simple shuffle function
export function simpleShuffle(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Simple draw cards function
export function simpleDrawCards(player, count) {
  console.log(`🎯 Drawing ${count} cards for ${player.name}`)
  console.log(`🎯 Before draw: Deck has ${player.deck.length} cards, Hand has ${player.hand.length} cards`)
  
  const drawnCards = []
  for (let i = 0; i < count && player.deck.length > 0; i++) {
    const card = player.deck.pop()
    if (card) {
      player.hand.push(card)
      drawnCards.push(card)
      console.log(`🎯 Drew card: ${card.name}`)
    }
  }
  
  console.log(`🎯 After draw: Deck has ${player.deck.length} cards, Hand has ${player.hand.length} cards`)
  console.log(`🎯 Hand cards:`, player.hand.map(c => c.name))
  
  return drawnCards
}

// Simple game initialization
export function simpleInitializeGame(deck1Data, deck2Data) {
  console.log('🎮 Initializing simple game...')
  console.log('🎮 Deck 1 data:', deck1Data.length, 'cards')
  console.log('🎮 Deck 2 data:', deck2Data.length, 'cards')
  
  // Shuffle both decks
  const shuffledDeck1 = simpleShuffle([...deck1Data])
  const shuffledDeck2 = simpleShuffle([...deck2Data])
  
  console.log('🎮 Shuffled deck 1:', shuffledDeck1.length, 'cards')
  console.log('🎮 Shuffled deck 2:', shuffledDeck2.length, 'cards')
  
  // Create players with empty hands
  const player1 = {
    id: 1,
    name: 'Player 1',
    level: [],
    hand: [], // Start with empty hand
    deck: shuffledDeck1,
    stage: [null, null, null, null, null],
    waitingRoom: [],
    clock: [],
    stock: [],
    climaxArea: null,
    memory: [],
    turn: true,
    hasMulliganed: false
  }
  
  const player2 = {
    id: 2,
    name: 'Player 2',
    level: [],
    hand: [], // Start with empty hand
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
  
  console.log('🎮 Created players with empty hands')
  
  // Draw initial hands
  console.log('🎮 Drawing initial hands...')
  simpleDrawCards(player1, 5)
  simpleDrawCards(player2, 5)
  
  console.log('🎮 Final hands:')
  console.log('🎮 Player 1 hand:', player1.hand.length, 'cards:', player1.hand.map(c => c.name))
  console.log('🎮 Player 2 hand:', player2.hand.length, 'cards:', player2.hand.map(c => c.name))
  
  return {
    players: [player1, player2],
    currentPhase: 'stand',
    currentTurn: 1,
    turnNumber: 1,
    gameLog: ['Game started! Both players drew 5 cards.'],
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

// Simple card play function
export function simplePlayCard(player, card, position) {
  console.log(`🎯 Playing card ${card.name} to position ${position}`)
  
  if (player.stage[position] === null) {
    player.stage[position] = card
    // Remove card from hand
    const handIndex = player.hand.findIndex(c => c.id === card.id)
    if (handIndex !== -1) {
      player.hand.splice(handIndex, 1)
      console.log(`🎯 Card played successfully. Hand now has ${player.hand.length} cards`)
      return { success: true, message: `Played ${card.name} to position ${position}` }
    }
  }
  
  return { success: false, message: 'Cannot play card to that position' }
}

// Simple clock function
export function simpleClockCard(player, card) {
  console.log(`🎯 Clocking card ${card.name}`)
  
  const handIndex = player.hand.findIndex(c => c.id === card.id)
  if (handIndex !== -1) {
    const clockedCard = player.hand.splice(handIndex, 1)[0]
    player.clock.push(clockedCard)
    player.stock.push(clockedCard) // Add to stock when clocked
    console.log(`🎯 Card clocked successfully. Hand now has ${player.hand.length} cards`)
    return { success: true, message: `Clocked ${card.name}` }
  }
  
  return { success: false, message: 'Card not found in hand' }
}
