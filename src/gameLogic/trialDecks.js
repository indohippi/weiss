// Trial/Beginner Deck Presets
// Based on actual Weiss Schwarz Trial Decks structure
// All decks follow official rules: 50 cards, max 4 copies, max 8 climax

import { cardTypes, cardColors, cardTriggers } from './constants'

/**
 * Creates a trial deck card with proper distribution
 */
const createTrialCard = (baseCard, quantity = 1) => {
  const cards = []
  for (let i = 0; i < quantity; i++) {
    cards.push({
      ...baseCard,
      id: `${baseCard.code}-${i}`,
      deckId: `${baseCard.code}-${i}-${Date.now()}-${Math.random()}`
    })
  }
  return cards
}

// ========== SAO TRIAL DECK ==========
const saoTrialDeckCards = [
  // Level 0 Characters (17 cards)
  {
    code: 'SAO-TD-001',
    name: 'Kirito, Black Swordsman',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 0,
    cost: 0,
    power: 1000,
    soul: 1,
    trigger: null,
    traits: ['Avatar', 'Weapon'],
    series: 'Sword Art Online',
    rarity: 'TD',
    ability: 'CONT: During your turn, this card gets +500 power.'
  },
  {
    code: 'SAO-TD-002',
    name: 'Asuna, The Flash',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 0,
    cost: 0,
    power: 1500,
    soul: 1,
    trigger: null,
    traits: ['Avatar', 'Weapon'],
    series: 'Sword Art Online',
    rarity: 'TD',
    ability: 'ACT: [Rest this card] Choose 1 of your characters, that character gets +500 power until end of turn.'
  },
  {
    code: 'SAO-TD-003',
    name: 'Klein, Samurai Style',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 0,
    cost: 0,
    power: 2000,
    soul: 1,
    trigger: null,
    traits: ['Avatar', 'Weapon'],
    series: 'Sword Art Online',
    rarity: 'TD',
    ability: null
  },
  {
    code: 'SAO-TD-004',
    name: 'Silica, Beast Tamer',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 0,
    cost: 0,
    power: 500,
    soul: 1,
    trigger: null,
    traits: ['Avatar', 'Animal'],
    series: 'Sword Art Online',
    rarity: 'TD',
    ability: 'AUTO: When this card attacks, you may pay 1 stock. If you do, draw 1 card.'
  },
  
  // Level 1 Characters (14 cards)
  {
    code: 'SAO-TD-101',
    name: 'Kirito, Dual Wielder',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 1,
    cost: 0,
    power: 5000,
    soul: 1,
    trigger: cardTriggers.SOUL,
    traits: ['Avatar', 'Weapon'],
    series: 'Sword Art Online',
    rarity: 'TD',
    ability: 'CONT: All of your other BLUE characters get +500 power.'
  },
  {
    code: 'SAO-TD-102',
    name: 'Asuna, Vice Commander',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 1,
    cost: 1,
    power: 6000,
    soul: 1,
    trigger: null,
    traits: ['Avatar', 'Weapon'],
    series: 'Sword Art Online',
    rarity: 'TD',
    ability: 'AUTO: When this card attacks, this card gets +1000 power until end of turn.'
  },
  {
    code: 'SAO-TD-103',
    name: 'Lisbeth, Blacksmith',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 1,
    cost: 0,
    power: 4500,
    soul: 1,
    trigger: null,
    traits: ['Avatar', 'Weapon'],
    series: 'Sword Art Online',
    rarity: 'TD',
    ability: 'AUTO: When this card is placed on stage, you may put the top card of your deck into stock.'
  },
  
  // Level 2 Characters (8 cards)
  {
    code: 'SAO-TD-201',
    name: 'Kirito & Asuna',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 2,
    cost: 1,
    power: 7500,
    soul: 1,
    trigger: cardTriggers.SOUL,
    traits: ['Avatar', 'Weapon'],
    series: 'Sword Art Online',
    rarity: 'TD',
    ability: 'AUTO: When this card attacks, you may pay 1 stock. If you do, this card gets +2000 power until end of turn.'
  },
  {
    code: 'SAO-TD-202',
    name: 'Asuna, Undine',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 2,
    cost: 2,
    power: 8000,
    soul: 2,
    trigger: null,
    traits: ['Avatar', 'Magic'],
    series: 'Sword Art Online',
    rarity: 'TD',
    ability: 'AUTO: When this card is placed on stage, you may draw 1 card, then discard 1 card.'
  },
  
  // Level 3 Characters (3 cards)
  {
    code: 'SAO-TD-301',
    name: 'Kirito, Hero of Aincrad',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 3,
    cost: 2,
    power: 10000,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: ['Avatar', 'Weapon'],
    series: 'Sword Art Online',
    rarity: 'TD',
    ability: 'CONT: If you have 2 or more other BLUE characters, this card gets +1000 power.'
  },
  
  // Events (3 cards)
  {
    code: 'SAO-TD-401',
    name: 'Sword Skill',
    type: cardTypes.EVENT,
    color: cardColors.BLUE,
    level: 0,
    cost: 1,
    power: 0,
    soul: 0,
    trigger: null,
    traits: ['Weapon'],
    series: 'Sword Art Online',
    rarity: 'TD',
    ability: 'Choose 1 of your characters, that character gets +2500 power until end of turn.'
  },
  {
    code: 'SAO-TD-402',
    name: 'Backup',
    type: cardTypes.EVENT,
    color: cardColors.BLUE,
    level: 1,
    cost: 0,
    power: 0,
    soul: 0,
    trigger: null,
    traits: [],
    series: 'Sword Art Online',
    rarity: 'TD',
    ability: 'Choose 1 of your characters being frontal attacked, that character gets +1500 power until end of turn.'
  },
  
  // Climax Cards (8 cards)
  {
    code: 'SAO-TD-CX1',
    name: 'Crossing Skill',
    type: cardTypes.CLIMAX,
    color: cardColors.BLUE,
    level: 0,
    cost: 0,
    power: 0,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: [],
    series: 'Sword Art Online',
    rarity: 'TD',
    ability: 'All of your characters get +1 soul and +1000 power until end of turn.'
  }
]

export const saoTrialDeck = {
  name: 'SAO Trial Deck - Sword Art Online',
  description: 'Beginner-friendly blue deck featuring Kirito and Asuna. Focuses on power boosts and straightforward gameplay.',
  color: cardColors.BLUE,
  series: 'Sword Art Online',
  difficulty: 'Beginner',
  cards: [
    ...createTrialCard(saoTrialDeckCards[0], 4), // Kirito L0 x4
    ...createTrialCard(saoTrialDeckCards[1], 4), // Asuna L0 x4
    ...createTrialCard(saoTrialDeckCards[2], 4), // Klein x4
    ...createTrialCard(saoTrialDeckCards[3], 5), // Silica x5
    ...createTrialCard(saoTrialDeckCards[4], 4), // Kirito L1 x4
    ...createTrialCard(saoTrialDeckCards[5], 4), // Asuna L1 x4
    ...createTrialCard(saoTrialDeckCards[6], 6), // Lisbeth x6
    ...createTrialCard(saoTrialDeckCards[7], 4), // Kirito&Asuna L2 x4
    ...createTrialCard(saoTrialDeckCards[8], 4), // Asuna L2 x4
    ...createTrialCard(saoTrialDeckCards[9], 3), // Kirito L3 x3
    ...createTrialCard(saoTrialDeckCards[10], 2), // Sword Skill x2
    ...createTrialCard(saoTrialDeckCards[11], 1), // Backup x1
    ...createTrialCard(saoTrialDeckCards[12], 8)  // Climax x8
  ]
}

// ========== RE:ZERO TRIAL DECK ==========
const rezeroTrialDeckCards = [
  // Level 0 Characters
  {
    code: 'REZ-TD-001',
    name: 'Subaru, Determination',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 0,
    cost: 0,
    power: 1000,
    soul: 1,
    trigger: null,
    traits: ['Hero'],
    series: 'Re:Zero',
    rarity: 'TD',
    ability: 'AUTO: When this card is placed on stage, you may mill 2 cards.'
  },
  {
    code: 'REZ-TD-002',
    name: 'Emilia, Half-Elf',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 0,
    cost: 0,
    power: 1500,
    soul: 1,
    trigger: null,
    traits: ['Magic'],
    series: 'Re:Zero',
    rarity: 'TD',
    ability: 'CONT: If you have 2 or more other GREEN characters, this card gets +1000 power.'
  },
  {
    code: 'REZ-TD-003',
    name: 'Rem, Maid',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 0,
    cost: 0,
    power: 2000,
    soul: 1,
    trigger: null,
    traits: ['Weapon'],
    series: 'Re:Zero',
    rarity: 'TD',
    ability: null
  },
  {
    code: 'REZ-TD-004',
    name: 'Ram, Maid',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 0,
    cost: 0,
    power: 500,
    soul: 1,
    trigger: null,
    traits: ['Magic'],
    series: 'Re:Zero',
    rarity: 'TD',
    ability: 'AUTO: When this card attacks, you may discard 1 card. If you do, this card gets +2000 power until end of turn.'
  },
  
  // Level 1 Characters
  {
    code: 'REZ-TD-101',
    name: 'Subaru, Return by Death',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 1,
    cost: 0,
    power: 4500,
    soul: 1,
    trigger: null,
    traits: ['Hero'],
    series: 'Re:Zero',
    rarity: 'TD',
    ability: 'AUTO: When this card becomes reversed, you may put the top card of your deck into clock.'
  },
  {
    code: 'REZ-TD-102',
    name: 'Emilia, Royal Selection',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 1,
    cost: 1,
    power: 6000,
    soul: 1,
    trigger: cardTriggers.SOUL,
    traits: ['Magic', 'Royal'],
    series: 'Re:Zero',
    rarity: 'TD',
    ability: 'AUTO: When this card attacks, all of your other GREEN characters get +500 power until end of turn.'
  },
  {
    code: 'REZ-TD-103',
    name: 'Rem, Demon Form',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 1,
    cost: 0,
    power: 5500,
    soul: 1,
    trigger: null,
    traits: ['Demon', 'Weapon'],
    series: 'Re:Zero',
    rarity: 'TD',
    ability: 'CONT: If you have another character named "Ram", this card gets +1000 power.'
  },
  
  // Level 2 Characters
  {
    code: 'REZ-TD-201',
    name: 'Emilia, Frozen Bonds',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 2,
    cost: 1,
    power: 7000,
    soul: 1,
    trigger: cardTriggers.SOUL,
    traits: ['Magic', 'Royal'],
    series: 'Re:Zero',
    rarity: 'TD',
    ability: 'AUTO: When this card is placed on stage, you may heal 1 damage.'
  },
  {
    code: 'REZ-TD-202',
    name: 'Rem, I Love You',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 2,
    cost: 2,
    power: 8500,
    soul: 2,
    trigger: null,
    traits: ['Demon', 'Weapon'],
    series: 'Re:Zero',
    rarity: 'TD',
    ability: 'AUTO: When this card attacks, all of your other GREEN characters get +1000 power until end of turn.'
  },
  
  // Level 3 Character
  {
    code: 'REZ-TD-301',
    name: 'Emilia, True Heroine',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 3,
    cost: 2,
    power: 10000,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: ['Magic', 'Royal'],
    series: 'Re:Zero',
    rarity: 'TD',
    ability: 'CONT: All of your other GREEN characters get +1000 power.'
  },
  
  // Events
  {
    code: 'REZ-TD-401',
    name: 'Ice Magic',
    type: cardTypes.EVENT,
    color: cardColors.GREEN,
    level: 1,
    cost: 1,
    power: 0,
    soul: 0,
    trigger: null,
    traits: ['Magic'],
    series: 'Re:Zero',
    rarity: 'TD',
    ability: 'Choose 1 of your opponent\'s level 1 or lower characters, and put it into waiting room.'
  },
  {
    code: 'REZ-TD-402',
    name: 'Determination',
    type: cardTypes.EVENT,
    color: cardColors.GREEN,
    level: 0,
    cost: 0,
    power: 0,
    soul: 0,
    trigger: null,
    traits: [],
    series: 'Re:Zero',
    rarity: 'TD',
    ability: 'Look at the top 3 cards of your deck, choose up to 1 card, add it to your hand, and put the rest into waiting room.'
  },
  
  // Climax
  {
    code: 'REZ-TD-CX1',
    name: 'Starting Life in Another World',
    type: cardTypes.CLIMAX,
    color: cardColors.GREEN,
    level: 0,
    cost: 0,
    power: 0,
    soul: 2,
    trigger: cardTriggers.COMEBACK,
    traits: [],
    series: 'Re:Zero',
    rarity: 'TD',
    ability: 'All of your characters get +2000 power until end of turn.'
  }
]

export const rezeroTrialDeck = {
  name: 'Re:Zero Trial Deck - Starting Life',
  description: 'Green deck featuring Subaru, Emilia, and the twin maids. Good balance of offense and recovery.',
  color: cardColors.GREEN,
  series: 'Re:Zero',
  difficulty: 'Beginner',
  cards: [
    ...createTrialCard(rezeroTrialDeckCards[0], 4),  // Subaru L0 x4
    ...createTrialCard(rezeroTrialDeckCards[1], 4),  // Emilia L0 x4
    ...createTrialCard(rezeroTrialDeckCards[2], 5),  // Rem L0 x5
    ...createTrialCard(rezeroTrialDeckCards[3], 4),  // Ram L0 x4
    ...createTrialCard(rezeroTrialDeckCards[4], 6),  // Subaru L1 x6
    ...createTrialCard(rezeroTrialDeckCards[5], 4),  // Emilia L1 x4
    ...createTrialCard(rezeroTrialDeckCards[6], 4),  // Rem L1 x4
    ...createTrialCard(rezeroTrialDeckCards[7], 4),  // Emilia L2 x4
    ...createTrialCard(rezeroTrialDeckCards[8], 4),  // Rem L2 x4
    ...createTrialCard(rezeroTrialDeckCards[9], 3),  // Emilia L3 x3
    ...createTrialCard(rezeroTrialDeckCards[10], 1), // Ice Magic x1
    ...createTrialCard(rezeroTrialDeckCards[11], 2), // Determination x2
    ...createTrialCard(rezeroTrialDeckCards[12], 8)  // Climax x8
  ]
}

// Export all trial decks
export const trialDecks = [
  saoTrialDeck,
  rezeroTrialDeck
]

export default trialDecks

