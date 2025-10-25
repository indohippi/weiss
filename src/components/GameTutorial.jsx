import React, { useState, useEffect } from 'react'
import './GameTutorial.css'

const GameTutorial = ({ gameState, currentPhase, onClose, isVisible = false }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [tutorialData, setTutorialData] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (isVisible) {
      loadTutorialData()
    }
  }, [isVisible, currentPhase])

  const loadTutorialData = () => {
    const tutorial = [
      {
        id: 'welcome',
        title: 'Welcome to Weiss Schwarz!',
        description: 'Learn the basics of this exciting card game',
        content: 'Weiss Schwarz is a trading card game where you battle with characters from anime series. Your goal is to reduce your opponent\'s life to 0!',
        position: 'center',
        action: 'next'
      },
      {
        id: 'phases',
        title: 'Game Phases',
        description: 'Understanding the turn structure',
        content: 'Each turn has 7 phases: Stand → Draw → Clock → Main → Climax → Attack → End. You must complete each phase before moving to the next.',
        position: 'top',
        action: 'next'
      },
      {
        id: 'hand',
        title: 'Your Hand',
        description: 'Managing your cards',
        content: 'Your hand contains the cards you can play. You can have up to 7 cards in hand. Click on cards to select them, then choose where to play them.',
        position: 'bottom',
        action: 'next'
      },
      {
        id: 'stage',
        title: 'The Stage',
        description: 'Where your characters fight',
        content: 'The stage has 5 positions: 2 back row and 3 front row. Characters in the front row can attack, while back row characters provide support.',
        position: 'center',
        action: 'next'
      },
      {
        id: 'clocking',
        title: 'Clocking Cards',
        description: 'Gaining stock to play cards',
        content: 'During the Clock phase, you can clock (discard) cards from your hand to gain stock. Stock is used to pay the cost of playing cards.',
        position: 'bottom',
        action: 'next'
      },
      {
        id: 'attacking',
        title: 'Attacking',
        description: 'How to attack your opponent',
        content: 'During the Attack phase, you can attack with characters in the front row. Choose a target and resolve the battle. Direct attacks deal damage to your opponent!',
        position: 'center',
        action: 'next'
      },
      {
        id: 'leveling',
        title: 'Leveling Up',
        description: 'Growing stronger',
        content: 'When you take damage, cards go to your level area. When you have 7 cards in level, you level up and become stronger!',
        position: 'center',
        action: 'next'
      },
      {
        id: 'climax',
        title: 'Climax Cards',
        description: 'Powerful game-changing cards',
        content: 'Climax cards are special cards that can turn the tide of battle. They have powerful effects but can only be played during the Climax phase.',
        position: 'center',
        action: 'next'
      },
      {
        id: 'victory',
        title: 'Winning the Game',
        description: 'How to achieve victory',
        content: 'You win when your opponent\'s life reaches 0, or when they can\'t draw a card from their deck. Plan your strategy carefully!',
        position: 'center',
        action: 'complete'
      }
    ]

    setTutorialData(tutorial)
    setCurrentStep(0)
    setIsCompleted(false)
  }

  const handleNext = () => {
    if (currentStep < tutorialData.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleComplete = () => {
    setIsCompleted(true)
    onClose()
  }

  const handleSkip = () => {
    onClose()
  }

  if (!isVisible || tutorialData.length === 0) return null

  const currentTutorial = tutorialData[currentStep]

  return (
    <div className="tutorial-overlay">
      <div className="tutorial-backdrop" onClick={handleSkip}></div>
      
      <div className={`tutorial-modal ${currentTutorial?.position || 'center'}`}>
        <div className="tutorial-header">
          <div className="tutorial-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentStep + 1) / tutorialData.length) * 100}%` }}
              ></div>
            </div>
            <div className="progress-text">
              {currentStep + 1} / {tutorialData.length}
            </div>
          </div>
          
          <button className="tutorial-close" onClick={handleSkip}>
            ✕
          </button>
        </div>

        <div className="tutorial-content">
          <div className="tutorial-title">
            {currentTutorial.title}
          </div>
          
          <div className="tutorial-description">
            {currentTutorial.description}
          </div>
          
          <div className="tutorial-text">
            {currentTutorial.content}
          </div>

          {currentTutorial.id === 'phases' && (
            <div className="tutorial-phases">
              <div className="phase-list">
                {['Stand', 'Draw', 'Clock', 'Main', 'Climax', 'Attack', 'End'].map((phase, index) => (
                  <div key={phase} className={`phase-item ${currentPhase === phase.toLowerCase() ? 'current' : ''}`}>
                    <div className="phase-number">{index + 1}</div>
                    <div className="phase-name">{phase}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentTutorial.id === 'hand' && (
            <div className="tutorial-hand-demo">
              <div className="demo-cards">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="demo-card">
                    <div className="demo-card-level">L{i}</div>
                    <div className="demo-card-name">Card {i}</div>
                  </div>
                ))}
              </div>
              <div className="demo-text">Click cards to select them</div>
            </div>
          )}

          {currentTutorial.id === 'stage' && (
            <div className="tutorial-stage-demo">
              <div className="demo-stage">
                <div className="demo-back-row">
                  <div className="demo-slot">Back 1</div>
                  <div className="demo-slot">Back 2</div>
                </div>
                <div className="demo-front-row">
                  <div className="demo-slot">Front 1</div>
                  <div className="demo-slot">Front 2</div>
                  <div className="demo-slot">Front 3</div>
                </div>
              </div>
              <div className="demo-text">Front row can attack, back row provides support</div>
            </div>
          )}
        </div>

        <div className="tutorial-actions">
          <button 
            className="tutorial-btn secondary" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          
          <button 
            className="tutorial-btn secondary" 
            onClick={handleSkip}
          >
            Skip Tutorial
          </button>
          
          {isCompleted ? (
            <button 
              className="tutorial-btn primary" 
              onClick={handleComplete}
            >
              Start Playing!
            </button>
          ) : (
            <button 
              className="tutorial-btn primary" 
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default GameTutorial
