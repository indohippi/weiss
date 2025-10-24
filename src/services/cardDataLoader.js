// Card Data Loader - Fetches real Weiss Schwarz cards from GitHub database
// Based on: https://github.com/CCondeluci/WeissSchwarz-ENG-DB

const GITHUB_API_BASE = 'https://api.github.com/repos/CCondeluci/WeissSchwarz-ENG-DB/contents/DB'
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/CCondeluci/WeissSchwarz-ENG-DB/master/DB'

// Cache for loaded card data
let cardCache = null
let cacheTimestamp = null
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour

/**
 * Fetch the list of available card sets from the GitHub repository
 */
export async function fetchAvailableSets() {
  try {
    const response = await fetch(GITHUB_API_BASE)
    if (!response.ok) {
      throw new Error(`Failed to fetch sets: ${response.status}`)
    }
    
    const files = await response.json()
    
    // Filter for JSON files (card sets)
    const sets = files
      .filter(file => file.name.endsWith('.json') && file.type === 'file')
      .map(file => ({
        name: file.name.replace('.json', ''),
        downloadUrl: file.download_url,
        path: file.path
      }))
    
    return sets
  } catch (error) {
    console.error('Error fetching available sets:', error)
    return []
  }
}

/**
 * Fetch cards from a specific set
 */
export async function fetchSetCards(setName) {
  try {
    const url = `${GITHUB_RAW_BASE}/${setName}.json`
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch set ${setName}: ${response.status}`)
    }
    
    const cards = await response.json()
    return cards
  } catch (error) {
    console.error(`Error fetching cards for set ${setName}:`, error)
    return []
  }
}

/**
 * Load all cards from the database
 * Uses caching to avoid excessive API calls
 */
export async function loadAllCards(forceRefresh = false) {
  // Check cache
  if (!forceRefresh && cardCache && cacheTimestamp) {
    const now = Date.now()
    if (now - cacheTimestamp < CACHE_DURATION) {
      console.log('Using cached card data')
      return cardCache
    }
  }
  
  try {
    console.log('Fetching card data from GitHub...')
    
    // Get all available sets
    const sets = await fetchAvailableSets()
    console.log(`Found ${sets.length} card sets`)
    
    // Fetch cards from ALL sets (not limited anymore)
    console.log('Loading all card sets... This may take a moment.')
    
    // Fetch in batches of 10 to avoid overwhelming the API
    const batchSize = 10
    const allCards = []
    
    for (let i = 0; i < sets.length; i += batchSize) {
      const batch = sets.slice(i, i + batchSize)
      console.log(`Loading batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(sets.length / batchSize)}...`)
      
      const batchPromises = batch.map(set => fetchSetCards(set.name))
      const batchResults = await Promise.all(batchPromises)
      allCards.push(...batchResults.flat())
      
      // Small delay to be nice to the API
      if (i + batchSize < sets.length) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
    
    console.log(`Loaded ${allCards.length} cards total from ${sets.length} sets`)
    
    // Normalize card data to match our game format
    const normalizedCards = allCards.map((card, index) => normalizeCard(card, index))
    
    // Update cache
    cardCache = normalizedCards
    cacheTimestamp = Date.now()
    
    return normalizedCards
  } catch (error) {
    console.error('Error loading all cards:', error)
    
    // Return empty array or cached data if available
    return cardCache || []
  }
}

/**
 * Normalize card data from GitHub format to our game format
 */
function normalizeCard(githubCard, index) {
  return {
    // GitHub format fields
    id: githubCard.code || `CARD-${index}`,
    name: githubCard.name || 'Unknown Card',
    code: githubCard.code,
    rarity: githubCard.rarity || 'C',
    expansion: githubCard.expansion || 'Unknown Set',
    series: githubCard.set || 'Unknown Series',
    
    // Game format fields
    type: normalizeType(githubCard.type),
    color: normalizeColor(githubCard.color),
    level: parseInt(githubCard.level) || 0,
    cost: parseInt(githubCard.cost) || 0,
    power: parseInt(githubCard.power) || 0,
    soul: parseInt(githubCard.soul) || 0,
    trigger: normalizeTrigger(githubCard.trigger),
    
    // Additional fields
    traits: githubCard.attributes || [],
    ability: Array.isArray(githubCard.ability) ? githubCard.ability.join('\n') : githubCard.ability || null,
    flavorText: githubCard.flavor_text || null,
    image: githubCard.image || null,
    
    // Original data
    originalData: githubCard
  }
}

/**
 * Normalize card type from GitHub format
 */
function normalizeType(type) {
  if (!type) return 'character'
  
  const typeLower = type.toLowerCase()
  if (typeLower.includes('character') || typeLower.includes('chr')) {
    return 'character'
  } else if (typeLower.includes('event') || typeLower.includes('evt')) {
    return 'event'
  } else if (typeLower.includes('climax') || typeLower.includes('cx')) {
    return 'climax'
  }
  
  return 'character'
}

/**
 * Normalize card color from GitHub format
 */
function normalizeColor(color) {
  if (!color) return 'blue'
  
  const colorUpper = color.toUpperCase()
  if (colorUpper.includes('YELLOW')) return 'yellow'
  if (colorUpper.includes('GREEN')) return 'green'
  if (colorUpper.includes('RED')) return 'red'
  if (colorUpper.includes('BLUE')) return 'blue'
  
  return 'blue'
}

/**
 * Normalize trigger from GitHub format
 */
function normalizeTrigger(trigger) {
  if (!trigger || !Array.isArray(trigger) || trigger.length === 0) {
    return null
  }
  
  // GitHub format has triggers as array of objects or strings
  const firstTrigger = trigger[0]
  
  if (typeof firstTrigger === 'string') {
    const triggerLower = firstTrigger.toLowerCase()
    if (triggerLower.includes('soul')) return 'soul'
    if (triggerLower.includes('draw')) return 'draw'
    if (triggerLower.includes('comeback')) return 'comeback'
    if (triggerLower.includes('treasure')) return 'treasure'
    if (triggerLower.includes('gate')) return 'gate'
    if (triggerLower.includes('standby')) return 'standby'
    if (triggerLower.includes('shot')) return 'shot'
  }
  
  return null
}

/**
 * Search cards by various criteria
 */
export function searchCards(cards, searchTerm, filters = {}) {
  if (!cards || cards.length === 0) return []
  
  let filtered = [...cards]
  
  // Text search
  if (searchTerm && searchTerm.trim() !== '') {
    const term = searchTerm.toLowerCase()
    filtered = filtered.filter(card => 
      card.name.toLowerCase().includes(term) ||
      (card.ability && card.ability.toLowerCase().includes(term)) ||
      (card.traits && card.traits.some(t => t.toLowerCase().includes(term))) ||
      (card.series && card.series.toLowerCase().includes(term))
    )
  }
  
  // Filter by type
  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(card => card.type === filters.type)
  }
  
  // Filter by color
  if (filters.color && filters.color !== 'all') {
    filtered = filtered.filter(card => card.color === filters.color)
  }
  
  // Filter by level
  if (filters.level !== undefined && filters.level !== 'all') {
    filtered = filtered.filter(card => card.level === parseInt(filters.level))
  }
  
  // Filter by series
  if (filters.series && filters.series !== 'all') {
    filtered = filtered.filter(card => card.series === filters.series)
  }
  
  return filtered
}

/**
 * Get unique series from card list
 */
export function getUniqueSeries(cards) {
  if (!cards || cards.length === 0) return []
  
  const seriesSet = new Set(cards.map(card => card.series).filter(Boolean))
  return Array.from(seriesSet).sort()
}

export default {
  fetchAvailableSets,
  fetchSetCards,
  loadAllCards,
  searchCards,
  getUniqueSeries
}

