import React, { useState, useEffect } from 'react'
import Card from './Card'
import CardModal from './CardModal'
import './CardBrowser.css'

const CardBrowser = ({ cards, onCardClick, selectedCards = [], loading = false }) => {
  const [expandedCard, setExpandedCard] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    type: 'all',
    color: 'all',
    level: 'all',
    series: 'all'
  })
  const [filteredCards, setFilteredCards] = useState([])
  const [uniqueSeries, setUniqueSeries] = useState([])
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const CARDS_PER_PAGE = 50
  
  console.log(`📊 CardBrowser: ${cards?.length || 0} total, ${filteredCards.length} filtered`)

  useEffect(() => {
    if (!cards || cards.length === 0) {
      setFilteredCards([])
      return
    }

    // Get unique series
    const seriesSet = new Set(cards.map(card => card.series).filter(Boolean))
    setUniqueSeries(Array.from(seriesSet).sort())

    // Apply filters
    let filtered = [...cards]

    // Text search
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(card =>
        card.name.toLowerCase().includes(term) ||
        (card.ability && card.ability.toLowerCase().includes(term)) ||
        (card.traits && card.traits.some(t => t.toLowerCase().includes(term)))
      )
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(card => card.type === filters.type)
    }

    // Color filter
    if (filters.color !== 'all') {
      filtered = filtered.filter(card => card.color === filters.color)
    }

    // Level filter
    if (filters.level !== 'all') {
      filtered = filtered.filter(card => card.level === parseInt(filters.level))
    }

    // Series filter
    if (filters.series !== 'all') {
      filtered = filtered.filter(card => card.series === filters.series)
    }

    setFilteredCards(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [cards, searchTerm, filters])

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setSearchTerm('')
    setFilters({
      type: 'all',
      color: 'all',
      level: 'all',
      series: 'all'
    })
  }

  const getCardCount = (cardId) => {
    if (!selectedCards) return 0
    return selectedCards.filter(c => c.id === cardId || c.code === cardId).length
  }

  const handleCardRightClick = (e, card) => {
    e.preventDefault()
    setExpandedCard(card)
  }
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE)
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE
  const endIndex = startIndex + CARDS_PER_PAGE
  const currentPageCards = filteredCards.slice(startIndex, endIndex)
  
  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  if (loading) {
    return (
      <div className="card-browser loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading cards from database...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card-browser">
      <div className="browser-header">
        <h2>Card Browser</h2>
        <div className="browser-info">
          <div className="card-count">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredCards.length)} of {filteredCards.length} cards
          </div>
          <div className="pagination-info">
            Page {currentPage} / {totalPages || 1}
          </div>
          <div className="card-hint">
            💡 Click 🔍 or right-click cards to view details
          </div>
        </div>
      </div>

      <div className="search-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, ability, or trait..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-row">
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Types</option>
            <option value="character">Character</option>
            <option value="event">Event</option>
            <option value="climax">Climax</option>
          </select>

          <select
            value={filters.color}
            onChange={(e) => handleFilterChange('color', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Colors</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>

          <select
            value={filters.level}
            onChange={(e) => handleFilterChange('level', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Levels</option>
            <option value="0">Level 0</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
          </select>

          <select
            value={filters.series}
            onChange={(e) => handleFilterChange('series', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Series</option>
            {uniqueSeries.map(series => (
              <option key={series} value={series}>{series}</option>
            ))}
          </select>

          <button onClick={clearFilters} className="clear-filters-btn">
            Clear Filters
          </button>
        </div>
      </div>

      <div className="cards-grid">
        {currentPageCards.length === 0 ? (
          <div className="no-cards">
            <p>No cards found matching your criteria</p>
          </div>
        ) : (
          currentPageCards.map((card) => {
            const count = getCardCount(card.id || card.code)
            return (
              <div key={card.id || card.code} className="card-wrapper">
                <Card
                  card={card}
                  onClick={() => onCardClick && onCardClick(card)}
                  onContextMenu={(e) => handleCardRightClick(e, card)}
                  showDetails={true}
                  className={count > 0 ? 'card-in-deck' : ''}
                />
                {count > 0 && (
                  <div className="card-count-badge">{count}x</div>
                )}
                <button 
                  className="card-expand-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedCard(card)
                  }}
                  title="View card details"
                >
                  🔍
                </button>
              </div>
            )
          })
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            className="pagination-btn"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >
            ⏮️ First
          </button>
          <button
            className="pagination-btn"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ◀️ Prev
          </button>
          <div className="page-numbers">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              const pageNum = Math.max(1, currentPage - 2) + i
              if (pageNum > totalPages) return null
              return (
                <button
                  key={pageNum}
                  className={`page-number ${pageNum === currentPage ? 'active' : ''}`}
                  onClick={() => goToPage(pageNum)}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>
          <button
            className="pagination-btn"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next ▶️
          </button>
          <button
            className="pagination-btn"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last ⏭️
          </button>
        </div>
      )}

      {expandedCard && (
        <CardModal 
          card={expandedCard} 
          onClose={() => setExpandedCard(null)} 
        />
      )}
    </div>
  )
}

export default CardBrowser

