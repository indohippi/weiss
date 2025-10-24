// Weiss Schwarz Game Constants
// Shared constants used across the game

export const gamePhases = [
  'stand',      // Stand Phase - stand all characters
  'draw',       // Draw Phase - draw 1 card
  'clock',      // Clock Phase - optionally clock a card, draw 2 if done
  'main',       // Main Phase - play characters, events, use abilities
  'climax',     // Climax Phase - play climax cards
  'attack',     // Attack Phase - attack with characters
  'end'         // End Phase - hand limit check, climax removal
]

export const cardTypes = {
  CHARACTER: 'character',
  EVENT: 'event',
  CLIMAX: 'climax'
}

export const cardColors = {
  RED: 'red',
  BLUE: 'blue',
  GREEN: 'green',
  YELLOW: 'yellow'
}

export const cardTriggers = {
  SOUL: 'soul',           // +1 soul until end of turn
  DRAW: 'draw',           // Draw 1 card
  COMEBACK: 'comeback',   // Return character from waiting room to hand
  TREASURE: 'treasure',   // Return to hand, then put top card in stock
  GATE: 'gate',           // Return climax from waiting room to hand
  CHOICE: 'choice',       // Return character with soul trigger to hand or stock
  STANDBY: 'standby',     // Put character from waiting room to stage
  SHOT: 'shot'            // Special damage cancel effect
}

export const attackTypes = {
  DIRECT: 'direct',    // No defending character, +1 soul
  FRONTAL: 'frontal',  // Attack facing character
  SIDE: 'side'         // Attack facing character, -X soul based on level
}

