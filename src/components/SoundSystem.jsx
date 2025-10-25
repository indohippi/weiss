import React, { useState, useEffect, useRef } from 'react'

const SoundSystem = ({ gameState, currentPhase, soundEnabled = true }) => {
  const [sounds, setSounds] = useState({})
  const audioContextRef = useRef(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize Web Audio API
  useEffect(() => {
    if (soundEnabled && !isInitialized) {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
        setIsInitialized(true)
        console.log('🔊 Sound system initialized')
      } catch (error) {
        console.warn('🔇 Web Audio API not supported:', error)
      }
    }
  }, [soundEnabled, isInitialized])

  // Generate sound effects using Web Audio API
  const generateSound = (type, frequency = 440, duration = 0.5, volume = 0.3) => {
    if (!audioContextRef.current || !soundEnabled) return

    const audioContext = audioContextRef.current
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
  }

  // Card draw sound
  const playCardDraw = () => {
    generateSound('draw', 523.25, 0.3, 0.2) // C5
    setTimeout(() => generateSound('draw', 659.25, 0.2, 0.15), 100) // E5
  }

  // Card play sound
  const playCardPlay = () => {
    generateSound('play', 392.00, 0.4, 0.25) // G4
    setTimeout(() => generateSound('play', 523.25, 0.3, 0.2), 150) // C5
  }

  // Attack sound
  const playAttack = () => {
    generateSound('attack', 220.00, 0.6, 0.4) // A3
    setTimeout(() => generateSound('attack', 293.66, 0.4, 0.3), 200) // D4
    setTimeout(() => generateSound('attack', 369.99, 0.3, 0.2), 400) // F#4
  }

  // Level up sound
  const playLevelUp = () => {
    generateSound('levelup', 261.63, 0.3, 0.2) // C4
    setTimeout(() => generateSound('levelup', 329.63, 0.3, 0.2), 100) // E4
    setTimeout(() => generateSound('levelup', 392.00, 0.3, 0.2), 200) // G4
    setTimeout(() => generateSound('levelup', 523.25, 0.5, 0.3), 300) // C5
  }

  // Phase change sound
  const playPhaseChange = () => {
    generateSound('phase', 440.00, 0.4, 0.2) // A4
    setTimeout(() => generateSound('phase', 554.37, 0.3, 0.15), 150) // C#5
  }

  // Clock sound
  const playClock = () => {
    generateSound('clock', 330.00, 0.5, 0.3) // E4
  }

  // Victory sound
  const playVictory = () => {
    generateSound('victory', 523.25, 0.3, 0.2) // C5
    setTimeout(() => generateSound('victory', 659.25, 0.3, 0.2), 100) // E5
    setTimeout(() => generateSound('victory', 783.99, 0.3, 0.2), 200) // G5
    setTimeout(() => generateSound('victory', 1046.50, 0.5, 0.3), 300) // C6
  }

  // Defeat sound
  const playDefeat = () => {
    generateSound('defeat', 220.00, 0.8, 0.4) // A3
    setTimeout(() => generateSound('defeat', 196.00, 0.6, 0.3), 200) // G3
    setTimeout(() => generateSound('defeat', 174.61, 0.4, 0.2), 400) // F3
  }

  // Hover sound
  const playHover = () => {
    generateSound('hover', 880.00, 0.1, 0.1) // A5
  }

  // Click sound
  const playClick = () => {
    generateSound('click', 1000, 0.1, 0.15) // High frequency
  }

  // Error sound
  const playError = () => {
    generateSound('error', 150, 0.3, 0.2) // Low frequency
  }

  // Store sound functions
  useEffect(() => {
    setSounds({
      cardDraw: playCardDraw,
      cardPlay: playCardPlay,
      attack: playAttack,
      levelUp: playLevelUp,
      phaseChange: playPhaseChange,
      clock: playClock,
      victory: playVictory,
      defeat: playDefeat,
      hover: playHover,
      click: playClick,
      error: playError
    })
  }, [])

  // Phase change detection
  useEffect(() => {
    if (currentPhase && sounds.phaseChange) {
      sounds.phaseChange()
    }
  }, [currentPhase, sounds.phaseChange])

  // Game state change detection
  useEffect(() => {
    if (!gameState) return

    // Check for level up
    const currentPlayer = gameState.players?.find(p => p.turn)
    if (currentPlayer && currentPlayer.level?.length >= 4 && sounds.levelUp) {
      sounds.levelUp()
    }

    // Check for victory/defeat
    if (gameState.gameState === 'game-over') {
      if (gameState.winner === 1 && sounds.victory) {
        sounds.victory()
      } else if (sounds.defeat) {
        sounds.defeat()
      }
    }
  }, [gameState, sounds])

  // Expose sound functions globally for other components
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.gameSounds = sounds
    }
  }, [sounds])

  return null // This component doesn't render anything
}

export default SoundSystem
