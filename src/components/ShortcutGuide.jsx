import React, { useState } from 'react'
import './ShortcutGuide.css'

const ShortcutGuide = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button 
        className="shortcut-guide-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Keyboard Shortcuts (Press ?)"
      >
        ⌨️
      </button>

      {isOpen && (
        <div className="shortcut-guide-overlay" onClick={() => setIsOpen(false)}>
          <div className="shortcut-guide-content" onClick={(e) => e.stopPropagation()}>
            <button className="guide-close" onClick={() => setIsOpen(false)}>✕</button>
            
            <h2>⌨️ Keyboard Shortcuts</h2>
            
            <div className="shortcuts-section">
              <h3>Game Controls</h3>
              <div className="shortcut-item">
                <kbd>N</kbd>
                <span>Next Phase</span>
              </div>
              <div className="shortcut-item">
                <kbd>E</kbd>
                <span>End Turn</span>
              </div>
              <div className="shortcut-item">
                <kbd>S</kbd>
                <span>Skip Current Phase</span>
              </div>
              <div className="shortcut-item">
                <kbd>ESC</kbd>
                <span>Deselect Card / Close Modal</span>
              </div>
            </div>

            <div className="shortcuts-section">
              <h3>Card Interactions</h3>
              <div className="shortcut-item">
                <span className="action">Left Click</span>
                <span>Select / Play / Attack</span>
              </div>
              <div className="shortcut-item">
                <span className="action">Right Click</span>
                <span>View Card Details</span>
              </div>
              <div className="shortcut-item">
                <span className="action">🔍 Button</span>
                <span>View Card Details</span>
              </div>
            </div>

            <div className="shortcuts-section">
              <h3>Quick Tips</h3>
              <ul>
                <li>Use filters to narrow down cards quickly</li>
                <li>Green glow = Can place here</li>
                <li>Red glow = Can attack</li>
                <li>Orange glow = Can clock</li>
                <li>Purple border = Selected</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ShortcutGuide

