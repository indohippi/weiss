// Comprehensive Weiss Schwarz Card Database
// Contains cards from multiple series with proper game balance

import { cardTypes, cardColors, cardTriggers } from './constants'

// Card traits commonly used in Weiss Schwarz
export const cardTraits = {
  // Character traits
  AVATAR: 'Avatar',
  WEAPON: 'Weapon',
  MAGIC: 'Magic',
  MUSIC: 'Music',
  IDOL: 'Idol',
  STUDENT: 'Student',
  TEACHER: 'Teacher',
  FIGHTER: 'Fighter',
  SWORDSMAN: 'Swordsman',
  GUNNER: 'Gunner',
  MAGE: 'Mage',
  KNIGHT: 'Knight',
  DRAGON: 'Dragon',
  DEMON: 'Demon',
  ANGEL: 'Angel',
  ROBOT: 'Robot',
  ANIMAL: 'Animal',
  PRINCESS: 'Princess',
  HERO: 'Hero',
  VILLAIN: 'Villain'
}

// Complete card database with diverse cards
export const cardDatabase = [
  // ==================== SWORD ART ONLINE SERIES ====================
  // Level 0 Characters
  {
    id: 'SAO-001',
    name: 'Kirito, Black Swordsman',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 0,
    cost: 0,
    power: 1000,
    soul: 1,
    trigger: null,
    traits: [cardTraits.AVATAR, cardTraits.WEAPON],
    series: 'Sword Art Online',
    rarity: 'C',
    ability: 'When this card is played, look at the top card of your deck.',
    image: '/cards/sao-001.jpg'
  },
  {
    id: 'SAO-002',
    name: 'Asuna, Flash',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 0,
    cost: 0,
    power: 1500,
    soul: 1,
    trigger: null,
    traits: [cardTraits.AVATAR, cardTraits.WEAPON],
    series: 'Sword Art Online',
    rarity: 'C',
    ability: 'CONT: During your turn, this card gets +500 power.',
    image: '/cards/sao-002.jpg'
  },
  {
    id: 'SAO-003',
    name: 'Silica, Dragon Tamer',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 0,
    cost: 0,
    power: 500,
    soul: 1,
    trigger: null,
    traits: [cardTraits.AVATAR, cardTraits.ANIMAL],
    series: 'Sword Art Online',
    rarity: 'C',
    ability: 'When this card attacks, you may draw 1 card, then discard 1 card.',
    image: '/cards/sao-003.jpg'
  },
  {
    id: 'SAO-004',
    name: 'Lisbeth, Blacksmith',
    type: cardTypes.CHARACTER,
    color: cardColors.YELLOW,
    level: 0,
    cost: 0,
    power: 2000,
    soul: 1,
    trigger: null,
    traits: [cardTraits.AVATAR, cardTraits.WEAPON],
    series: 'Sword Art Online',
    rarity: 'U',
    ability: 'ACT: [Rest this card] Choose 1 of your characters, that character gets +1000 power until end of turn.',
    image: '/cards/sao-004.jpg'
  },
  
  // Level 1 Characters
  {
    id: 'SAO-101',
    name: 'Kirito, Dual Blades',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 1,
    cost: 0,
    power: 5000,
    soul: 1,
    trigger: null,
    traits: [cardTraits.AVATAR, cardTraits.WEAPON],
    series: 'Sword Art Online',
    rarity: 'R',
    ability: 'CONT: All of your other BLUE characters get +500 power.',
    image: '/cards/sao-101.jpg'
  },
  {
    id: 'SAO-102',
    name: 'Asuna, Knights of Blood',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 1,
    cost: 1,
    power: 6000,
    soul: 1,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.AVATAR, cardTraits.WEAPON],
    series: 'Sword Art Online',
    rarity: 'R',
    ability: 'When this card attacks, deal 1 damage to your opponent.',
    image: '/cards/sao-102.jpg'
  },
  {
    id: 'SAO-103',
    name: 'Sinon, Phantom Bullet',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 1,
    cost: 0,
    power: 4500,
    soul: 1,
    trigger: null,
    traits: [cardTraits.AVATAR, cardTraits.GUNNER],
    series: 'Sword Art Online',
    rarity: 'U',
    ability: 'When this card is reversed, you may pay 1 stock. If you do, return this card to your hand.',
    image: '/cards/sao-103.jpg'
  },
  {
    id: 'SAO-104',
    name: 'Leafa, ALO Warrior',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 1,
    cost: 1,
    power: 6500,
    soul: 1,
    trigger: null,
    traits: [cardTraits.AVATAR, cardTraits.WEAPON],
    series: 'Sword Art Online',
    rarity: 'R',
    ability: 'AUTO: When this card attacks, if you have 2 or more other GREEN characters, this card gets +2000 power until end of turn.',
    image: '/cards/sao-104.jpg'
  },
  
  // Level 2 Characters
  {
    id: 'SAO-201',
    name: 'Kirito, Star King',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 2,
    cost: 1,
    power: 7500,
    soul: 1,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.AVATAR, cardTraits.WEAPON],
    series: 'Sword Art Online',
    rarity: 'RR',
    ability: 'AUTO: When this card is placed on stage, you may search your deck for 1 RED character, reveal it, and add it to your hand.',
    image: '/cards/sao-201.jpg'
  },
  {
    id: 'SAO-202',
    name: 'Asuna, Starburst Stream',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 2,
    cost: 2,
    power: 8500,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.AVATAR, cardTraits.WEAPON],
    series: 'Sword Art Online',
    rarity: 'RR',
    ability: 'CONT: If you have 4 or more characters, this card gets +2000 power.',
    image: '/cards/sao-202.jpg'
  },
  
  // Level 3 Characters
  {
    id: 'SAO-301',
    name: 'Kirito & Asuna',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 3,
    cost: 2,
    power: 10000,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.AVATAR, cardTraits.WEAPON],
    series: 'Sword Art Online',
    rarity: 'RRR',
    ability: 'AUTO: When this card attacks, you may pay 2 stock. If you do, deal 2 damage to your opponent.',
    image: '/cards/sao-301.jpg'
  },
  {
    id: 'SAO-302',
    name: 'Asuna, Undine Healer',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 3,
    cost: 2,
    power: 9500,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.AVATAR, cardTraits.MAGIC],
    series: 'Sword Art Online',
    rarity: 'RR',
    ability: 'AUTO: When this card is placed on stage, you may draw 2 cards, then discard 1 card.',
    image: '/cards/sao-302.jpg'
  },
  
  // Events
  {
    id: 'SAO-401',
    name: 'Sword Skills',
    type: cardTypes.EVENT,
    color: cardColors.BLUE,
    level: 0,
    cost: 1,
    power: 0,
    soul: 0,
    trigger: null,
    traits: [cardTraits.WEAPON],
    series: 'Sword Art Online',
    rarity: 'U',
    ability: 'Choose 1 of your characters, that character gets +3000 power until end of turn.',
    image: '/cards/sao-401.jpg'
  },
  {
    id: 'SAO-402',
    name: 'Flashing Penetrator',
    type: cardTypes.EVENT,
    color: cardColors.RED,
    level: 1,
    cost: 2,
    power: 0,
    soul: 0,
    trigger: null,
    traits: [cardTraits.WEAPON],
    series: 'Sword Art Online',
    rarity: 'R',
    ability: 'Deal 2 damage to your opponent. Search your deck for 1 RED character and add it to your hand.',
    image: '/cards/sao-402.jpg'
  },
  
  // Climax Cards
  {
    id: 'SAO-501',
    name: 'World of Swords',
    type: cardTypes.CLIMAX,
    color: cardColors.BLUE,
    level: 0,
    cost: 0,
    power: 0,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: [],
    series: 'Sword Art Online',
    rarity: 'CC',
    ability: 'All of your characters get +1 soul and +1000 power until end of turn.',
    image: '/cards/sao-501.jpg'
  },
  {
    id: 'SAO-502',
    name: 'Lightning Flash',
    type: cardTypes.CLIMAX,
    color: cardColors.RED,
    level: 0,
    cost: 0,
    power: 0,
    soul: 2,
    trigger: cardTriggers.TREASURE,
    traits: [],
    series: 'Sword Art Online',
    rarity: 'CC',
    ability: 'Draw 2 cards, then discard 1 card.',
    image: '/cards/sao-502.jpg'
  },
  
  // ==================== RE:ZERO SERIES ====================
  // Level 0 Characters
  {
    id: 'REZ-001',
    name: 'Subaru, Determined',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 0,
    cost: 0,
    power: 500,
    soul: 1,
    trigger: null,
    traits: [cardTraits.HERO],
    series: 'Re:Zero',
    rarity: 'C',
    ability: 'When this card is reversed, you may put it into stock instead of waiting room.',
    image: '/cards/rez-001.jpg'
  },
  {
    id: 'REZ-002',
    name: 'Emilia, Half-Elf',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 0,
    cost: 0,
    power: 1000,
    soul: 1,
    trigger: null,
    traits: [cardTraits.MAGIC],
    series: 'Re:Zero',
    rarity: 'C',
    ability: 'CONT: If you have 2 or more BLUE characters, this card gets +1000 power.',
    image: '/cards/rez-002.jpg'
  },
  {
    id: 'REZ-003',
    name: 'Rem, Maid',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 0,
    cost: 0,
    power: 1500,
    soul: 1,
    trigger: null,
    traits: [cardTraits.WEAPON],
    series: 'Re:Zero',
    rarity: 'C',
    ability: 'ACT: [Rest 2 of your characters] This card gets +2000 power until end of turn.',
    image: '/cards/rez-003.jpg'
  },
  {
    id: 'REZ-004',
    name: 'Ram, Maid',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 0,
    cost: 0,
    power: 1500,
    soul: 1,
    trigger: null,
    traits: [cardTraits.MAGIC],
    series: 'Re:Zero',
    rarity: 'C',
    ability: 'When this card attacks, if you have another RED character, this card gets +1500 power until end of turn.',
    image: '/cards/rez-004.jpg'
  },
  
  // Level 1 Characters
  {
    id: 'REZ-101',
    name: 'Subaru, Return by Death',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 1,
    cost: 0,
    power: 4000,
    soul: 1,
    trigger: null,
    traits: [cardTraits.HERO],
    series: 'Re:Zero',
    rarity: 'U',
    ability: 'AUTO: When this card is placed on stage, you may put the top card of your deck into clock.',
    image: '/cards/rez-101.jpg'
  },
  {
    id: 'REZ-102',
    name: 'Emilia, Ice Magic',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 1,
    cost: 1,
    power: 6000,
    soul: 1,
    trigger: null,
    traits: [cardTraits.MAGIC],
    series: 'Re:Zero',
    rarity: 'R',
    ability: 'AUTO: When this card attacks, you may discard 1 card. If you do, this card gets +3000 power until end of turn.',
    image: '/cards/rez-102.jpg'
  },
  {
    id: 'REZ-103',
    name: 'Rem, Demon Form',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 1,
    cost: 0,
    power: 5500,
    soul: 1,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.DEMON, cardTraits.WEAPON],
    series: 'Re:Zero',
    rarity: 'R',
    ability: 'CONT: During your turn, if you have another character named "Ram", this card gets +2000 power.',
    image: '/cards/rez-103.jpg'
  },
  {
    id: 'REZ-104',
    name: 'Ram, Demon Form',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 1,
    cost: 0,
    power: 5500,
    soul: 1,
    trigger: null,
    traits: [cardTraits.DEMON, cardTraits.MAGIC],
    series: 'Re:Zero',
    rarity: 'R',
    ability: 'CONT: During your turn, if you have another character named "Rem", this card gets +2000 power.',
    image: '/cards/rez-104.jpg'
  },
  
  // Level 2 Characters
  {
    id: 'REZ-201',
    name: 'Emilia, Royal Candidate',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 2,
    cost: 1,
    power: 7000,
    soul: 1,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.MAGIC, cardTraits.PRINCESS],
    series: 'Re:Zero',
    rarity: 'RR',
    ability: 'AUTO: When this card is placed on stage, you may heal 1 damage.',
    image: '/cards/rez-201.jpg'
  },
  {
    id: 'REZ-202',
    name: 'Rem, I Love You',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 2,
    cost: 2,
    power: 9000,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.DEMON, cardTraits.WEAPON],
    series: 'Re:Zero',
    rarity: 'RR',
    ability: 'AUTO: When this card attacks, all of your other RED characters get +1000 power until end of turn.',
    image: '/cards/rez-202.jpg'
  },
  
  // Level 3 Characters
  {
    id: 'REZ-301',
    name: 'Emilia, Frozen Bonds',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 3,
    cost: 2,
    power: 10000,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.MAGIC, cardTraits.PRINCESS],
    series: 'Re:Zero',
    rarity: 'RRR',
    ability: 'AUTO: When this card attacks, you may pay 1 stock. If you do, choose 1 of your opponent\'s characters and return it to hand.',
    image: '/cards/rez-301.jpg'
  },
  {
    id: 'REZ-302',
    name: 'Rem & Ram, Twin Maids',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 3,
    cost: 2,
    power: 9500,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.DEMON],
    series: 'Re:Zero',
    rarity: 'RR',
    ability: 'AUTO: When this card is placed on stage, look at up to 4 cards from the top of your deck, choose up to 1 card, add it to your hand, and put the rest into waiting room.',
    image: '/cards/rez-302.jpg'
  },
  
  // Events
  {
    id: 'REZ-401',
    name: 'Starting Life in Another World',
    type: cardTypes.EVENT,
    color: cardColors.GREEN,
    level: 0,
    cost: 0,
    power: 0,
    soul: 0,
    trigger: null,
    traits: [],
    series: 'Re:Zero',
    rarity: 'U',
    ability: 'Look at the top 3 cards of your deck, choose 1, add it to your hand, and put the rest into waiting room.',
    image: '/cards/rez-401.jpg'
  },
  {
    id: 'REZ-402',
    name: 'Ice Brand Arts',
    type: cardTypes.EVENT,
    color: cardColors.BLUE,
    level: 1,
    cost: 1,
    power: 0,
    soul: 0,
    trigger: null,
    traits: [cardTraits.MAGIC],
    series: 'Re:Zero',
    rarity: 'U',
    ability: 'Choose 1 of your opponent\'s characters with level 1 or lower and put it into waiting room.',
    image: '/cards/rez-402.jpg'
  },
  
  // Climax Cards
  {
    id: 'REZ-501',
    name: 'Promise Under the Moon',
    type: cardTypes.CLIMAX,
    color: cardColors.BLUE,
    level: 0,
    cost: 0,
    power: 0,
    soul: 2,
    trigger: cardTriggers.GATE,
    traits: [],
    series: 'Re:Zero',
    rarity: 'CC',
    ability: 'Draw 1 card. All of your characters get +1000 power and +1 soul until end of turn.',
    image: '/cards/rez-501.jpg'
  },
  {
    id: 'REZ-502',
    name: 'From Zero',
    type: cardTypes.CLIMAX,
    color: cardColors.RED,
    level: 0,
    cost: 0,
    power: 0,
    soul: 2,
    trigger: cardTriggers.COMEBACK,
    traits: [],
    series: 'Re:Zero',
    rarity: 'CC',
    ability: 'Return 1 character from your waiting room to your hand. All of your characters get +2000 power until end of turn.',
    image: '/cards/rez-502.jpg'
  },
  
  // ==================== LOVE LIVE! SERIES ====================
  // Level 0 Characters
  {
    id: 'LL-001',
    name: 'Honoka, School Idol',
    type: cardTypes.CHARACTER,
    color: cardColors.YELLOW,
    level: 0,
    cost: 0,
    power: 1000,
    soul: 1,
    trigger: null,
    traits: [cardTraits.MUSIC, cardTraits.STUDENT],
    series: 'Love Live!',
    rarity: 'C',
    ability: 'When this card is placed on stage, all of your other MUSIC characters get +500 power until end of turn.',
    image: '/cards/ll-001.jpg'
  },
  {
    id: 'LL-002',
    name: 'Kotori, Designer',
    type: cardTypes.CHARACTER,
    color: cardColors.YELLOW,
    level: 0,
    cost: 0,
    power: 500,
    soul: 1,
    trigger: null,
    traits: [cardTraits.MUSIC, cardTraits.STUDENT],
    series: 'Love Live!',
    rarity: 'C',
    ability: 'ACT: [Rest this card] Look at the top card of your deck, you may put it on top or bottom of your deck.',
    image: '/cards/ll-002.jpg'
  },
  {
    id: 'LL-003',
    name: 'Umi, Archery Club',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 0,
    cost: 0,
    power: 2000,
    soul: 1,
    trigger: null,
    traits: [cardTraits.MUSIC, cardTraits.STUDENT],
    series: 'Love Live!',
    rarity: 'U',
    ability: 'CONT: This card cannot side attack.',
    image: '/cards/ll-003.jpg'
  },
  
  // Level 1 Characters
  {
    id: 'LL-101',
    name: 'Honoka, μ\'s Leader',
    type: cardTypes.CHARACTER,
    color: cardColors.YELLOW,
    level: 1,
    cost: 0,
    power: 5000,
    soul: 1,
    trigger: null,
    traits: [cardTraits.MUSIC, cardTraits.STUDENT],
    series: 'Love Live!',
    rarity: 'R',
    ability: 'AUTO: When this card attacks, if you have 3 or more other MUSIC characters, this card gets +1500 power until end of turn.',
    image: '/cards/ll-101.jpg'
  },
  {
    id: 'LL-102',
    name: 'Nico, Nico Nico Nii',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 1,
    cost: 1,
    power: 6500,
    soul: 1,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.MUSIC, cardTraits.STUDENT],
    series: 'Love Live!',
    rarity: 'R',
    ability: 'AUTO: When this card is placed on stage, you may draw 1 card, then discard 1 card.',
    image: '/cards/ll-102.jpg'
  },
  {
    id: 'LL-103',
    name: 'Maki, Pianist',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 1,
    cost: 0,
    power: 4500,
    soul: 1,
    trigger: null,
    traits: [cardTraits.MUSIC, cardTraits.STUDENT],
    series: 'Love Live!',
    rarity: 'U',
    ability: 'AUTO: When this card attacks, choose 1 of your other MUSIC characters, that character gets +1000 power until end of turn.',
    image: '/cards/ll-103.jpg'
  },
  
  // Level 2 Characters
  {
    id: 'LL-201',
    name: 'Honoka, Start:Dash!!',
    type: cardTypes.CHARACTER,
    color: cardColors.YELLOW,
    level: 2,
    cost: 1,
    power: 7500,
    soul: 1,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.MUSIC, cardTraits.STUDENT],
    series: 'Love Live!',
    rarity: 'RR',
    ability: 'AUTO: When this card attacks, you may pay 1 stock. If you do, search your deck for 1 MUSIC character and add it to your hand.',
    image: '/cards/ll-201.jpg'
  },
  {
    id: 'LL-202',
    name: 'Umi, Pure Heart',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 2,
    cost: 2,
    power: 8500,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.MUSIC, cardTraits.STUDENT],
    series: 'Love Live!',
    rarity: 'RR',
    ability: 'CONT: All of your other BLUE characters get +1000 power.',
    image: '/cards/ll-202.jpg'
  },
  
  // Level 3 Characters
  {
    id: 'LL-301',
    name: 'μ\'s, Snow Halation',
    type: cardTypes.CHARACTER,
    color: cardColors.YELLOW,
    level: 3,
    cost: 2,
    power: 10000,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.MUSIC],
    series: 'Love Live!',
    rarity: 'RRR',
    ability: 'AUTO: When this card attacks, if you have 5 or more MUSIC characters, deal 3 damage to your opponent.',
    image: '/cards/ll-301.jpg'
  },
  
  // Events
  {
    id: 'LL-401',
    name: 'Live Performance',
    type: cardTypes.EVENT,
    color: cardColors.YELLOW,
    level: 1,
    cost: 2,
    power: 0,
    soul: 0,
    trigger: null,
    traits: [cardTraits.MUSIC],
    series: 'Love Live!',
    rarity: 'U',
    ability: 'All of your MUSIC characters get +2000 power until end of turn.',
    image: '/cards/ll-401.jpg'
  },
  
  // Climax Cards
  {
    id: 'LL-501',
    name: 'Bokura no Live',
    type: cardTypes.CLIMAX,
    color: cardColors.YELLOW,
    level: 0,
    cost: 0,
    power: 0,
    soul: 2,
    trigger: cardTriggers.STANDBY,
    traits: [cardTraits.MUSIC],
    series: 'Love Live!',
    rarity: 'CC',
    ability: 'All of your characters get +1 soul until end of turn.',
    image: '/cards/ll-501.jpg'
  },
  {
    id: 'LL-502',
    name: 'Wonderful Rush',
    type: cardTypes.CLIMAX,
    color: cardColors.BLUE,
    level: 0,
    cost: 0,
    power: 0,
    soul: 2,
    trigger: cardTriggers.DRAW,
    traits: [cardTraits.MUSIC],
    series: 'Love Live!',
    rarity: 'CC',
    ability: 'All of your MUSIC characters get +2000 power and +1 soul until end of turn.',
    image: '/cards/ll-502.jpg'
  },
  
  // ==================== GENERIC/NEUTRAL CARDS ====================
  // Level 0 Characters
  {
    id: 'GEN-001',
    name: 'Novice Swordsman',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 0,
    cost: 0,
    power: 1500,
    soul: 1,
    trigger: null,
    traits: [cardTraits.SWORDSMAN],
    series: 'Generic',
    rarity: 'C',
    ability: null,
    image: '/cards/gen-001.jpg'
  },
  {
    id: 'GEN-002',
    name: 'Rookie Mage',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 0,
    cost: 0,
    power: 500,
    soul: 1,
    trigger: null,
    traits: [cardTraits.MAGE],
    series: 'Generic',
    rarity: 'C',
    ability: 'When this card is placed on stage, draw 1 card, then discard 1 card.',
    image: '/cards/gen-002.jpg'
  },
  {
    id: 'GEN-003',
    name: 'Young Knight',
    type: cardTypes.CHARACTER,
    color: cardColors.YELLOW,
    level: 0,
    cost: 0,
    power: 2500,
    soul: 1,
    trigger: null,
    traits: [cardTraits.KNIGHT],
    series: 'Generic',
    rarity: 'C',
    ability: 'CONT: This card cannot side attack.',
    image: '/cards/gen-003.jpg'
  },
  {
    id: 'GEN-004',
    name: 'Apprentice Archer',
    type: cardTypes.CHARACTER,
    color: cardColors.GREEN,
    level: 0,
    cost: 0,
    power: 1000,
    soul: 1,
    trigger: null,
    traits: [cardTraits.WEAPON],
    series: 'Generic',
    rarity: 'C',
    ability: 'AUTO: When this card attacks, you may pay 1 stock. If you do, this card gets +2000 power until end of turn.',
    image: '/cards/gen-004.jpg'
  },
  
  // Level 1 Characters
  {
    id: 'GEN-101',
    name: 'Veteran Swordsman',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 1,
    cost: 0,
    power: 5500,
    soul: 1,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.SWORDSMAN],
    series: 'Generic',
    rarity: 'U',
    ability: null,
    image: '/cards/gen-101.jpg'
  },
  {
    id: 'GEN-102',
    name: 'Battle Mage',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 1,
    cost: 1,
    power: 6000,
    soul: 1,
    trigger: null,
    traits: [cardTraits.MAGE],
    series: 'Generic',
    rarity: 'U',
    ability: 'ACT: [Pay 1 stock] Deal 1 damage to your opponent.',
    image: '/cards/gen-102.jpg'
  },
  {
    id: 'GEN-103',
    name: 'Holy Knight',
    type: cardTypes.CHARACTER,
    color: cardColors.YELLOW,
    level: 1,
    cost: 0,
    power: 6000,
    soul: 1,
    trigger: null,
    traits: [cardTraits.KNIGHT],
    series: 'Generic',
    rarity: 'R',
    ability: 'CONT: Your other YELLOW characters get +500 power.',
    image: '/cards/gen-103.jpg'
  },
  
  // Level 2 Characters
  {
    id: 'GEN-201',
    name: 'Master Swordsman',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 2,
    cost: 1,
    power: 8000,
    soul: 1,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.SWORDSMAN],
    series: 'Generic',
    rarity: 'R',
    ability: 'AUTO: When this card attacks, this card gets +2000 power until end of turn.',
    image: '/cards/gen-201.jpg'
  },
  {
    id: 'GEN-202',
    name: 'Archmage',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 2,
    cost: 2,
    power: 7500,
    soul: 2,
    trigger: cardTriggers.DRAW,
    traits: [cardTraits.MAGE],
    series: 'Generic',
    rarity: 'RR',
    ability: 'AUTO: When this card is placed on stage, you may discard 1 card. If you do, search your deck for 1 character and add it to your hand.',
    image: '/cards/gen-202.jpg'
  },
  
  // Level 3 Characters
  {
    id: 'GEN-301',
    name: 'Legendary Hero',
    type: cardTypes.CHARACTER,
    color: cardColors.BLUE,
    level: 3,
    cost: 2,
    power: 11000,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.HERO, cardTraits.SWORDSMAN],
    series: 'Generic',
    rarity: 'RRR',
    ability: 'CONT: All of your other characters get +1000 power.',
    image: '/cards/gen-301.jpg'
  },
  {
    id: 'GEN-302',
    name: 'Dragon Lord',
    type: cardTypes.CHARACTER,
    color: cardColors.RED,
    level: 3,
    cost: 3,
    power: 12000,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: [cardTraits.DRAGON],
    series: 'Generic',
    rarity: 'RRR',
    ability: 'AUTO: When this card attacks, you may pay 3 stock. If you do, deal 3 damage to your opponent.',
    image: '/cards/gen-302.jpg'
  },
  
  // Generic Events
  {
    id: 'GEN-401',
    name: 'Power Boost',
    type: cardTypes.EVENT,
    color: cardColors.BLUE,
    level: 0,
    cost: 0,
    power: 0,
    soul: 0,
    trigger: null,
    traits: [],
    series: 'Generic',
    rarity: 'C',
    ability: 'Choose 1 of your characters, that character gets +2000 power until end of turn.',
    image: '/cards/gen-401.jpg'
  },
  {
    id: 'GEN-402',
    name: 'Draw Power',
    type: cardTypes.EVENT,
    color: cardColors.RED,
    level: 1,
    cost: 1,
    power: 0,
    soul: 0,
    trigger: null,
    traits: [cardTraits.MAGIC],
    series: 'Generic',
    rarity: 'U',
    ability: 'Draw 2 cards.',
    image: '/cards/gen-402.jpg'
  },
  {
    id: 'GEN-403',
    name: 'Salvage',
    type: cardTypes.EVENT,
    color: cardColors.GREEN,
    level: 0,
    cost: 0,
    power: 0,
    soul: 0,
    trigger: null,
    traits: [],
    series: 'Generic',
    rarity: 'U',
    ability: 'Choose 1 character in your waiting room and return it to your hand.',
    image: '/cards/gen-403.jpg'
  },
  {
    id: 'GEN-404',
    name: 'Restand',
    type: cardTypes.EVENT,
    color: cardColors.YELLOW,
    level: 2,
    cost: 3,
    power: 0,
    soul: 0,
    trigger: null,
    traits: [],
    series: 'Generic',
    rarity: 'R',
    ability: 'Choose 1 of your rested characters, stand it, and it gets +2000 power until end of turn.',
    image: '/cards/gen-404.jpg'
  },
  
  // Generic Climax Cards
  {
    id: 'GEN-501',
    name: 'Battle Cry',
    type: cardTypes.CLIMAX,
    color: cardColors.RED,
    level: 0,
    cost: 0,
    power: 0,
    soul: 2,
    trigger: cardTriggers.SOUL,
    traits: [],
    series: 'Generic',
    rarity: 'CR',
    ability: 'All of your characters get +1 soul and +1000 power until end of turn.',
    image: '/cards/gen-501.jpg'
  },
  {
    id: 'GEN-502',
    name: 'Strategic Advantage',
    type: cardTypes.CLIMAX,
    color: cardColors.BLUE,
    level: 0,
    cost: 0,
    power: 0,
    soul: 2,
    trigger: cardTriggers.DRAW,
    traits: [],
    series: 'Generic',
    rarity: 'CR',
    ability: 'Draw 2 cards. All of your characters get +1000 power until end of turn.',
    image: '/cards/gen-502.jpg'
  },
  {
    id: 'GEN-503',
    name: 'Last Stand',
    type: cardTypes.CLIMAX,
    color: cardColors.YELLOW,
    level: 0,
    cost: 0,
    power: 0,
    soul: 1,
    trigger: cardTriggers.COMEBACK,
    traits: [],
    series: 'Generic',
    rarity: 'CR',
    ability: 'All of your characters get +2000 power until end of turn.',
    image: '/cards/gen-503.jpg'
  },
  {
    id: 'GEN-504',
    name: 'Hidden Treasure',
    type: cardTypes.CLIMAX,
    color: cardColors.GREEN,
    level: 0,
    cost: 0,
    power: 0,
    soul: 2,
    trigger: cardTriggers.TREASURE,
    traits: [],
    series: 'Generic',
    rarity: 'CR',
    ability: 'Look at the top 3 cards of your deck, choose 1, add it to your hand, and put the rest into waiting room.',
    image: '/cards/gen-504.jpg'
  }
]

// Helper function to get all cards by series
export function getCardsBySeries(seriesName) {
  return cardDatabase.filter(card => card.series === seriesName)
}

// Helper function to get cards by color
export function getCardsByColor(color) {
  return cardDatabase.filter(card => card.color === color)
}

// Helper function to get cards by type
export function getCardsByType(type) {
  return cardDatabase.filter(card => card.type === type)
}

// Helper function to get cards by level
export function getCardsByLevel(level) {
  return cardDatabase.filter(card => card.level === level)
}

// Helper function to get a random selection of cards for deck building
export function getRandomCards(count, options = {}) {
  const { series, color, type, level } = options
  
  let filteredCards = [...cardDatabase]
  
  if (series) {
    filteredCards = filteredCards.filter(card => card.series === series)
  }
  if (color) {
    filteredCards = filteredCards.filter(card => card.color === color)
  }
  if (type) {
    filteredCards = filteredCards.filter(card => card.type === type)
  }
  if (level !== undefined) {
    filteredCards = filteredCards.filter(card => card.level === level)
  }
  
  // Shuffle and select random cards
  const shuffled = [...filteredCards].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

// Build a balanced 50-card deck with proper distribution
export function buildBalancedDeck(series = null) {
  const deck = []
  
  let availableCards = series ? getCardsBySeries(series) : cardDatabase
  
  // Ensure we have cards to work with
  if (availableCards.length === 0) {
    availableCards = cardDatabase
  }
  
  // Distribution targets for a balanced deck
  const targets = {
    level0: 20,  // 40% level 0 cards
    level1: 15,  // 30% level 1 cards
    level2: 8,   // 16% level 2 cards
    level3: 3,   // 6% level 3 cards
    climax: 8    // 8 climax cards (max allowed)
  }
  
  // Counter for generating unique IDs
  let cardCounter = 0
  
  // Get climax cards
  const climaxCards = availableCards.filter(c => c.type === cardTypes.CLIMAX)
  for (let i = 0; i < targets.climax && i < climaxCards.length; i++) {
    const card = climaxCards[i % climaxCards.length]
    deck.push({ ...card, id: `${card.id}-${cardCounter++}` })
  }
  
  // Get level 0 cards
  const level0Cards = availableCards.filter(c => c.level === 0 && c.type !== cardTypes.CLIMAX)
  for (let i = 0; i < targets.level0 && level0Cards.length > 0; i++) {
    const card = level0Cards[i % level0Cards.length]
    deck.push({ ...card, id: `${card.id}-${cardCounter++}` })
  }
  
  // Get level 1 cards
  const level1Cards = availableCards.filter(c => c.level === 1)
  for (let i = 0; i < targets.level1 && level1Cards.length > 0; i++) {
    const card = level1Cards[i % level1Cards.length]
    deck.push({ ...card, id: `${card.id}-${cardCounter++}` })
  }
  
  // Get level 2 cards
  const level2Cards = availableCards.filter(c => c.level === 2)
  for (let i = 0; i < targets.level2 && level2Cards.length > 0; i++) {
    const card = level2Cards[i % level2Cards.length]
    deck.push({ ...card, id: `${card.id}-${cardCounter++}` })
  }
  
  // Get level 3 cards
  const level3Cards = availableCards.filter(c => c.level === 3)
  for (let i = 0; i < targets.level3 && level3Cards.length > 0; i++) {
    const card = level3Cards[i % level3Cards.length]
    deck.push({ ...card, id: `${card.id}-${cardCounter++}` })
  }
  
  // Fill remaining slots with level 0 and 1 cards if deck is not full
  while (deck.length < 50) {
    const fillerCards = [...level0Cards, ...level1Cards]
    if (fillerCards.length === 0) break
    
    const card = fillerCards[deck.length % fillerCards.length]
    deck.push({ ...card, id: `${card.id}-${cardCounter++}` })
  }
  
  return deck.slice(0, 50) // Ensure exactly 50 cards
}

export default cardDatabase

