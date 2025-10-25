// Tactical Sound System for Weiss Schwarz Deck Builder
// Retro SNES/Metal Gear Solid style sound effects

class TacticalSoundSystem {
  constructor() {
    this.audioContext = null
    this.sounds = {}
    this.masterVolume = 0.3
    this.enabled = true
    
    this.initAudioContext()
    this.createSounds()
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
      this.enabled = false
    }
  }

  createSounds() {
    if (!this.audioContext) return

    // Tactical Beep - Short, sharp beep for button clicks
    this.sounds.beep = this.createBeepSound(800, 0.1, 'sine')
    
    // System Scan - Longer tone for system operations
    this.sounds.scan = this.createBeepSound(600, 0.3, 'sawtooth')
    
    // Alert - Warning sound for important actions
    this.sounds.alert = this.createAlertSound()
    
    // Success - Confirmation sound
    this.sounds.success = this.createSuccessSound()
    
    // Error - Error sound
    this.sounds.error = this.createErrorSound()
    
    // Card Add - Sound when adding card to deck
    this.sounds.cardAdd = this.createCardAddSound()
    
    // Card Remove - Sound when removing card from deck
    this.sounds.cardRemove = this.createCardRemoveSound()
    
    // Hover - Subtle sound for hover effects
    this.sounds.hover = this.createHoverSound()
    
    // Page Turn - Sound for navigation
    this.sounds.pageTurn = this.createPageTurnSound()
  }

  createBeepSound(frequency, duration, waveType = 'sine') {
    return () => {
      if (!this.enabled || !this.audioContext) return

      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
      oscillator.type = waveType
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.masterVolume, this.audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + duration)
    }
  }

  createAlertSound() {
    return () => {
      if (!this.enabled || !this.audioContext) return

      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime)
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime + 0.1)
      oscillator.type = 'square'
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.8, this.audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 0.2)
    }
  }

  createSuccessSound() {
    return () => {
      if (!this.enabled || !this.audioContext) return

      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime)
      oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime + 0.1)
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime + 0.2)
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.6, this.audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 0.3)
    }
  }

  createErrorSound() {
    return () => {
      if (!this.enabled || !this.audioContext) return

      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime)
      oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime + 0.1)
      oscillator.type = 'sawtooth'
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.7, this.audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.25)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 0.25)
    }
  }

  createCardAddSound() {
    return () => {
      if (!this.enabled || !this.audioContext) return

      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(500, this.audioContext.currentTime)
      oscillator.frequency.setValueAtTime(700, this.audioContext.currentTime + 0.05)
      oscillator.type = 'triangle'
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.5, this.audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.15)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 0.15)
    }
  }

  createCardRemoveSound() {
    return () => {
      if (!this.enabled || !this.audioContext) return

      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime)
      oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime + 0.05)
      oscillator.type = 'square'
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.4, this.audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 0.1)
    }
  }

  createHoverSound() {
    return () => {
      if (!this.enabled || !this.audioContext) return

      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime)
      oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime + 0.05)
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.2, this.audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.08)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 0.08)
    }
  }

  createPageTurnSound() {
    return () => {
      if (!this.enabled || !this.audioContext) return

      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime)
      oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime + 0.1)
      oscillator.type = 'sawtooth'
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.4, this.audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + 0.2)
    }
  }

  // Public methods
  playBeep() {
    this.sounds.beep?.()
  }

  playScan() {
    this.sounds.scan?.()
  }

  playAlert() {
    this.sounds.alert?.()
  }

  playSuccess() {
    this.sounds.success?.()
  }

  playError() {
    this.sounds.error?.()
  }

  playCardAdd() {
    this.sounds.cardAdd?.()
  }

  playCardRemove() {
    this.sounds.cardRemove?.()
  }

  playHover() {
    this.sounds.hover?.()
  }

  playPageTurn() {
    this.sounds.pageTurn?.()
  }

  setVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume))
  }

  setEnabled(enabled) {
    this.enabled = enabled
  }

  // Initialize audio context on user interaction
  enableAudio() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume()
    }
  }
}

// Create global instance
const tacticalSounds = new TacticalSoundSystem()

// Enable audio on first user interaction
document.addEventListener('click', () => {
  tacticalSounds.enableAudio()
}, { once: true })

export default tacticalSounds
