import React, { useState } from 'react'
import './RuleReference.css'

const RuleReference = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('basics')

  const sections = {
    basics: {
      title: 'Game Basics',
      content: [
        {
          title: 'Objective',
          text: 'Reduce your opponent\'s life to 0 by dealing damage through attacks.'
        },
        {
          title: 'Deck Construction',
          text: 'Build a 50-card deck with no more than 4 copies of any card (except climax cards, max 4).'
        },
        {
          title: 'Starting Game',
          text: 'Each player starts with 7 life, draws 5 cards, and shuffles their deck.'
        },
        {
          title: 'Winning',
          text: 'Win by reducing opponent\'s life to 0, or if opponent cannot draw a card.'
        }
      ]
    },
    phases: {
      title: 'Game Phases',
      content: [
        {
          title: 'Stand Phase',
          text: 'Stand all your characters (turn them from rested to standing).'
        },
        {
          title: 'Draw Phase',
          text: 'Draw 1 card from your deck.'
        },
        {
          title: 'Clock Phase',
          text: 'Optionally clock a card from hand (put it in clock zone).'
        },
        {
          title: 'Main Phase',
          text: 'Play cards, use abilities, and perform actions.'
        },
        {
          title: 'Climax Phase',
          text: 'Play climax cards if you have any.'
        },
        {
          title: 'Attack Phase',
          text: 'Attack with your characters.'
        },
        {
          title: 'End Phase',
          text: 'Clean up and end your turn.'
        }
      ]
    },
    combat: {
      title: 'Combat System',
      content: [
        {
          title: 'Attack Types',
          text: 'Front Attack: Attack opponent\'s character. Direct Attack: Attack opponent directly.'
        },
        {
          title: 'Battle Resolution',
          text: 'Compare power values. Higher power wins. Ties go to the attacking character.'
        },
        {
          title: 'Damage',
          text: 'Deal damage equal to the attacking character\'s soul value.'
        },
        {
          title: 'Triggers',
          text: 'Check top card of deck for trigger effects when dealing damage.'
        }
      ]
    },
    cards: {
      title: 'Card Types',
      content: [
        {
          title: 'Characters',
          text: 'Main cards that attack and defend. Have power, soul, and level values.'
        },
        {
          title: 'Events',
          text: 'One-time effect cards that go to waiting room after use.'
        },
        {
          title: 'Climax',
          text: 'Special cards that provide powerful effects and trigger checks.'
        }
      ]
    },
    deckbuilding: {
      title: 'Deck Building Rules',
      content: [
        {
          title: 'Deck Size',
          text: 'Exactly 50 cards in your deck.'
        },
        {
          title: 'Card Limits',
          text: 'Maximum 4 copies of any card (except climax cards).'
        },
        {
          title: 'Color Requirements',
          text: 'All cards must share at least one color with your deck.'
        },
        {
          title: 'Level Distribution',
          text: 'Recommended: 16 Level 0, 12 Level 1, 8 Level 2, 4 Level 3, 8 Climax.'
        }
      ]
    }
  }

  return (
    <div className="rule-reference">
      <div className="reference-header">
        <h1>📖 Weiss Schwarz Rule Reference</h1>
        <button onClick={onBack} className="back-button">
          ← Back to Menu
        </button>
      </div>

      <div className="reference-layout">
        <div className="reference-sidebar">
          <h3>Table of Contents</h3>
          <nav className="reference-nav">
            {Object.entries(sections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`nav-item ${activeSection === key ? 'active' : ''}`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        <div className="reference-content">
          <div className="content-header">
            <h2>{sections[activeSection].title}</h2>
          </div>
          
          <div className="content-body">
            {sections[activeSection].content.map((item, index) => (
              <div key={index} className="rule-item">
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="reference-footer">
        <div className="quick-tips">
          <h3>💡 Quick Tips</h3>
          <ul>
            <li>Always maintain hand advantage</li>
            <li>Use level 0 characters for early game</li>
            <li>Save climax cards for crucial moments</li>
            <li>Pay attention to trigger effects</li>
            <li>Manage your clock zone carefully</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RuleReference
