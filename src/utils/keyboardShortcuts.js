// Keyboard Shortcuts for Game
// Non-intrusive enhancements to improve UX

export const setupKeyboardShortcuts = (callbacks) => {
  const handleKeyPress = (e) => {
    // Don't trigger shortcuts if user is typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return
    }

    switch (e.key.toLowerCase()) {
      case 'n': // Next phase
        if (callbacks.onNextPhase) {
          e.preventDefault()
          callbacks.onNextPhase()
        }
        break
        
      case 'e': // End turn
        if (callbacks.onEndTurn) {
          e.preventDefault()
          callbacks.onEndTurn()
        }
        break
        
      case 's': // Skip phase
        if (callbacks.onSkipPhase) {
          e.preventDefault()
          callbacks.onSkipPhase()
        }
        break
        
      case 'escape':
        if (callbacks.onEscape) {
          e.preventDefault()
          callbacks.onEscape()
        }
        break
        
      case '?': // Show help
        if (callbacks.onShowHelp) {
          e.preventDefault()
          callbacks.onShowHelp()
        }
        break
        
      default:
        break
    }
  }

  window.addEventListener('keydown', handleKeyPress)
  
  return () => {
    window.removeEventListener('keydown', handleKeyPress)
  }
}

export const KEYBOARD_SHORTCUTS = {
  NEXT_PHASE: 'N',
  END_TURN: 'E',
  SKIP_PHASE: 'S',
  ESCAPE: 'ESC',
  HELP: '?'
}

export default setupKeyboardShortcuts

