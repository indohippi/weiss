import React, { useState, useEffect } from 'react'
import { trialDecks } from '../gameLogic/trialDecks'
import './TacticalMainMenu.css'

const TacticalMainMenu = ({ 
  onStartGame, 
  onDeckBuilder, 
  onTutorial, 
  savedDecks = [],
  showGameplayTools = false,
  onCardBrowser,
  onGameplayTools,
  onRuleReference
}) => {
  const [systemStatus, setSystemStatus] = useState('ONLINE')
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="tactical-main-menu">
      {/* Tactical Header */}
      <div className="tactical-header-bar">
        <div className="system-info">
          <div className="system-status">
            <span className="tactical-status online">SYSTEM {systemStatus}</span>
            <span className="system-time">{formatTime(currentTime)}</span>
          </div>
          <div className="mission-title">
            <h1>WEISS SCHWARZ TACTICAL DECK BUILDER</h1>
            <p>CLASSIFIED OPERATION - DECK CONSTRUCTION PROTOCOL</p>
          </div>
        </div>
      </div>

      {/* Main Tactical Interface */}
      <div className="tactical-interface">
        <div className="tactical-grid tactical-grid-2">
          
          {/* Primary Operations */}
          <div className="tactical-panel primary-operations">
            <h2 className="tactical-header">PRIMARY OPERATIONS</h2>
            <div className="operation-grid">
              <button
                onClick={onDeckBuilder}
                className="tactical-btn primary operation-btn"
              >
                <div className="btn-icon">🎴</div>
                <div className="btn-content">
                  <div className="btn-title">DECK CONSTRUCTION</div>
                  <div className="btn-subtitle">Build tactical card formations</div>
                </div>
              </button>

              <button
                onClick={onCardBrowser}
                className="tactical-btn secondary operation-btn"
              >
                <div className="btn-icon">🔍</div>
                <div className="btn-content">
                  <div className="btn-title">INTEL DATABASE</div>
                  <div className="btn-subtitle">Access card intelligence</div>
                </div>
              </button>
            </div>
          </div>

          {/* Support Operations */}
          <div className="tactical-panel support-operations">
            <h2 className="tactical-header">SUPPORT OPERATIONS</h2>
            <div className="operation-grid">
              <button
                onClick={onGameplayTools}
                className="tactical-btn secondary operation-btn"
              >
                <div className="btn-icon">🎮</div>
                <div className="btn-content">
                  <div className="btn-title">TACTICAL HUD</div>
                  <div className="btn-subtitle">Mission support tools</div>
                </div>
              </button>

              <button
                onClick={onRuleReference}
                className="tactical-btn secondary operation-btn"
              >
                <div className="btn-icon">📖</div>
                <div className="btn-content">
                  <div className="btn-title">PROTOCOL MANUAL</div>
                  <div className="btn-subtitle">Rules and procedures</div>
                </div>
              </button>
            </div>
          </div>

          {/* Mission Status */}
          <div className="tactical-panel mission-status">
            <h2 className="tactical-header">MISSION STATUS</h2>
            <div className="status-grid">
              <div className="status-item">
                <span className="status-label">TRIAL DECKS:</span>
                <span className="status-value">{trialDecks.length}</span>
              </div>
              <div className="status-item">
                <span className="status-label">CUSTOM DECKS:</span>
                <span className="status-value">{savedDecks.length}</span>
              </div>
              <div className="status-item">
                <span className="status-label">CARD DATABASE:</span>
                <span className="status-value">17,489 CARDS</span>
              </div>
              <div className="status-item">
                <span className="status-label">SYSTEM STATUS:</span>
                <span className="status-value tactical-status online">OPERATIONAL</span>
              </div>
            </div>
          </div>

          {/* System Diagnostics */}
          <div className="tactical-panel system-diagnostics">
            <h2 className="tactical-header">SYSTEM DIAGNOSTICS</h2>
            <div className="diagnostic-grid">
              <div className="diagnostic-item">
                <div className="diagnostic-label">CPU USAGE</div>
                <div className="tactical-progress">
                  <div className="tactical-progress-bar" style={{ width: '25%' }}></div>
                </div>
                <div className="diagnostic-value">25%</div>
              </div>
              
              <div className="diagnostic-item">
                <div className="diagnostic-label">MEMORY</div>
                <div className="tactical-progress">
                  <div className="tactical-progress-bar" style={{ width: '60%' }}></div>
                </div>
                <div className="diagnostic-value">60%</div>
              </div>
              
              <div className="diagnostic-item">
                <div className="diagnostic-label">NETWORK</div>
                <div className="tactical-progress">
                  <div className="tactical-progress-bar" style={{ width: '90%' }}></div>
                </div>
                <div className="diagnostic-value">90%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Footer */}
        <div className="tactical-footer">
          <div className="footer-info">
            <span>CLASSIFICATION: UNCLASSIFIED</span>
            <span>VERSION: 1.0.0</span>
            <span>BUILD: TACTICAL-ALPHA</span>
          </div>
          <div className="footer-warning">
            <span>⚠️ UNAUTHORIZED ACCESS PROHIBITED</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TacticalMainMenu
