import React, { useRef, useEffect, useState } from 'react'
import { FixedSizeGrid } from 'react-window'
import Card from './Card'

const VirtualCardGrid = ({ 
  cards, 
  onCardClick, 
  selectedCards = [], 
  onExpandCard 
}) => {
  const gridRef = useRef()
  const containerRef = useRef()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Calculate grid dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({
          width: rect.width,
          height: rect.height
        })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const getCardCount = (cardId) => {
    if (!selectedCards) return 0
    return selectedCards.filter(c => c.id === cardId || c.code === cardId).length
  }

  // Card dimensions
  const CARD_WIDTH = 200
  const CARD_HEIGHT = 300
  const GAP = 20

  // Calculate columns based on container width
  const columnCount = Math.max(1, Math.floor((dimensions.width - GAP) / (CARD_WIDTH + GAP)))
  const rowCount = Math.ceil(cards.length / columnCount)

  // Cell renderer
  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex
    
    if (index >= cards.length) {
      return null
    }

    const card = cards[index]
    const count = getCardCount(card.id || card.code)

    return (
      <div style={{
        ...style,
        padding: `${GAP / 2}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start'
      }}>
        <div className="card-wrapper" style={{ position: 'relative' }}>
          <Card
            card={card}
            onClick={() => onCardClick && onCardClick(card)}
            onContextMenu={(e) => {
              e.preventDefault()
              onExpandCard && onExpandCard(card)
            }}
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
              onExpandCard && onExpandCard(card)
            }}
            title="View card details"
          >
            🔍
          </button>
        </div>
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="no-cards" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100%',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: '1.2rem',
        fontStyle: 'italic'
      }}>
        <p>No cards found matching your criteria</p>
      </div>
    )
  }

  if (dimensions.width === 0 || dimensions.height === 0) {
    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <FixedSizeGrid
        ref={gridRef}
        columnCount={columnCount}
        columnWidth={CARD_WIDTH + GAP}
        height={dimensions.height}
        rowCount={rowCount}
        rowHeight={CARD_HEIGHT + GAP}
        width={dimensions.width}
        overscanRowCount={2}
        style={{
          overflowX: 'hidden'
        }}
      >
        {Cell}
      </FixedSizeGrid>
    </div>
  )
}

export default VirtualCardGrid

