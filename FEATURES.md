# Weiss Schwarz Digital Card Game - Features

## 🎮 Game Features

### Card Database
- **Complete Database**: Loads ALL cards from [WeissSchwarz-ENG-DB](https://github.com/CCondeluci/WeissSchwarz-ENG-DB)
- **Batch Loading**: Cards load in batches of 10 to prevent API overload
- **1-Hour Caching**: Downloaded cards cached for better performance
- **Real Card Images**: Displays official Weiss Schwarz card images

### Deck Builder
- ✅ Browse entire card database (thousands of cards)
- ✅ Advanced filtering:
  - Type (Character, Event, Climax)
  - Color (Red, Blue, Green, Yellow)
  - Level (0-3)
  - Series/Expansion
  - Search by name, ability, or traits
- ✅ Real-time deck validation:
  - Must have exactly 50 cards
  - Max 4 copies per card
  - Max 8 climax cards
- ✅ Deck statistics (by type, level, color)
- ✅ Save/Load decks via localStorage
- ✅ Expandable card view (click 🔍 or right-click)

### Performance Optimizations
- **Virtual Scrolling**: Only renders visible cards (handles 10,000+ cards smoothly)
- **React Window**: Efficient grid virtualization
- **Memory Efficient**: No lag even with full database

### Anime-Themed UI
- 🌸 **Sakura Petals**: Floating petal animations
- ✨ **Particle Effects**: Floating light particles
- 🎨 **Gradient Backgrounds**: Animated color shifts
- 💫 **Glow Effects**: Text and neon glows
- 🎴 **Holographic Cards**: Shimmer effect on cards
- 🌊 **Energy Orbs**: Pulsing button effects
- 🎯 **Neon Borders**: Color-coded borders (Blue, Pink, Purple, Cyan)

### UI/UX Features
- **Bigger Cards**: 180×260px (29% larger than before)
- **Card Modal**: Click 🔍 or right-click for detailed view
- **Hover Effects**: Smooth animations and transitions
- **Responsive Design**: Works on mobile, tablet, desktop
- **Keyboard Shortcuts**: ESC to close modals
- **Google Fonts**: Poppins & Noto Sans JP for anime aesthetic

## 🎨 Theme Details

### Color Palette
- **Primary**: Purple gradients (#667eea → #764ba2)
- **Secondary**: Pink gradients (#f093fb → #f5576c)
- **Accent**: Cyan gradients (#4facfe → #00f2fe)
- **Gold**: Warm gradients (#f7b733 → #fc4a1a)

### Animations
- `gradientShift`: Background color animation
- `textGlow`: Pulsing text shadows
- `holographicShine`: Card shimmer effect
- `energyPulse`: Button glow pulse
- `sakuraFall`: Falling petal animation
- `borderRotate`: Rotating border gradient

### Typography
- **Headings**: Poppins (800-900 weight)
- **Body**: Poppins (400-600 weight)
- **Japanese**: Noto Sans JP

## 📊 Technical Stack

### Dependencies
- **react-window**: Virtualized grid rendering
- **react-window-infinite-loader**: Infinite scroll support
- **framer-motion**: Smooth animations
- **vite**: Fast build tool

### File Structure
```
src/
├── components/
│   ├── Card.jsx              # Card display component
│   ├── CardBrowser.jsx       # Card browser with filters
│   ├── CardModal.jsx         # Expanded card view
│   ├── VirtualCardGrid.jsx   # Virtualized grid (performance)
│   ├── DeckBuilder.jsx       # Deck building interface
│   ├── MainMenu.jsx          # Main menu screen
│   ├── GameBoard.jsx         # Game board layout
│   └── GameInfo.jsx          # Game info panel
├── services/
│   └── cardDataLoader.js     # GitHub API integration
├── gameLogic/
│   ├── constants.js          # Game constants
│   ├── gameState.js          # Game rules & logic
│   └── cardDatabase.js       # Local card data
├── styles/
│   └── animeTheme.css        # Anime UI theme
└── App.jsx                   # Main app component
```

## 🚀 Performance

### Before Optimization
- ❌ All cards rendered at once
- ❌ ~5000+ DOM nodes
- ❌ Laggy scrolling
- ❌ High memory usage

### After Optimization  
- ✅ Only visible cards rendered (20-50 nodes)
- ✅ Smooth 60fps scrolling
- ✅ Low memory footprint
- ✅ Instant filtering

## 🎯 Game Rules Implementation

### Official Weiss Schwarz Rules v2.09
- ✅ 50-card decks
- ✅ Level system (0-3)
- ✅ Color requirements
- ✅ Stock & Clock mechanics
- ✅ Trigger effects
- ✅ Phase system (Stand, Draw, Clock, Main, Climax, Attack, End)
- ✅ Win conditions (Level 4 or deck depletion)

## 📝 How to Use

1. **Start Game**: Click "Start Game" → Select decks for both players
2. **Build Deck**: Click "Deck Builder" → Browse/filter → Add cards → Save
3. **View Card Details**: Hover card → Click 🔍 or right-click
4. **Filter Cards**: Use search bar + dropdown filters
5. **Save Decks**: Build deck → Name it → Click "Save Deck"

## 🎨 Customization

### Adding Custom Themes
Edit `src/styles/animeTheme.css`:
- Modify color variables
- Add new animations
- Change font imports

### Performance Tuning
Edit `VirtualCardGrid.jsx`:
- Adjust `CARD_WIDTH` / `CARD_HEIGHT`
- Modify `overscanRowCount` for more/less pre-rendering

## 📦 Credits

- **Card Database**: [CCondeluci/WeissSchwarz-ENG-DB](https://github.com/CCondeluci/WeissSchwarz-ENG-DB)
- **Card Images**: Bushiroad / en.ws-tcg.com
- **Fonts**: Google Fonts (Poppins, Noto Sans JP)
- **Icons**: Native emoji (🎴 🔍 ✨ etc.)

## 📄 License

This is a fan-made, non-commercial project. All Weiss Schwarz cards, images, and game mechanics are © Bushiroad.

**Fair Use Statement**: This project uses Weiss Schwarz card data and images for educational and non-profit purposes only. No commercial use is intended.

