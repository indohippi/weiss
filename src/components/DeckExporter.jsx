import React, { useState } from 'react'
import './DeckExporter.css'

const DeckExporter = ({ deck, deckName, onImport }) => {
  const [showExport, setShowExport] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [importText, setImportText] = useState('')

  const exportDeck = () => {
    const exportData = {
      name: deckName,
      cards: deck.map(card => ({
        code: card.code || card.id,
        name: card.name,
        count: 1 // Will be aggregated
      })),
      exportedAt: new Date().toISOString(),
      version: '1.0'
    }

    // Aggregate card counts
    const cardCounts = {}
    deck.forEach(card => {
      const id = card.code || card.id
      cardCounts[id] = (cardCounts[id] || 0) + 1
    })

    const aggregatedCards = Object.entries(cardCounts).map(([code, count]) => {
      const card = deck.find(c => (c.code || c.id) === code)
      return {
        code: code,
        name: card.name,
        count: count
      }
    })

    exportData.cards = aggregatedCards

    const jsonString = JSON.stringify(exportData, null, 2)
    
    // Copy to clipboard
    navigator.clipboard.writeText(jsonString)
      .then(() => {
        alert('✅ Deck exported to clipboard!')
      })
      .catch(() => {
        setShowExport(true)
      })
  }

  const importDeck = () => {
    try {
      const data = JSON.parse(importText)
      
      if (!data.cards || !Array.isArray(data.cards)) {
        alert('❌ Invalid deck format')
        return
      }

      onImport(data)
      setShowImport(false)
      setImportText('')
      alert('✅ Deck imported successfully!')
    } catch (error) {
      alert('❌ Error parsing deck data. Please check the format.')
      console.error('Import error:', error)
    }
  }

  return (
    <div className="deck-exporter">
      <div className="exporter-buttons">
        <button onClick={exportDeck} className="export-btn" title="Export deck as JSON">
          📤 Export
        </button>
        <button onClick={() => setShowImport(!showImport)} className="import-btn" title="Import deck from JSON">
          📥 Import
        </button>
      </div>

      {showExport && (
        <div className="export-modal">
          <div className="export-content">
            <h3>Deck Exported!</h3>
            <p>Deck data has been copied to clipboard.</p>
            <button onClick={() => setShowExport(false)}>Close</button>
          </div>
        </div>
      )}

      {showImport && (
        <div className="import-panel">
          <h4>Import Deck</h4>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Paste deck JSON here..."
            className="import-textarea"
            rows="10"
          />
          <div className="import-actions">
            <button onClick={importDeck} className="import-confirm-btn">
              Import Deck
            </button>
            <button onClick={() => {
              setShowImport(false)
              setImportText('')
            }} className="import-cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeckExporter

