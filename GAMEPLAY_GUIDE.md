# 🎮 Weiss Schwarz Digital - Complete Gameplay Guide

## 🎯 What's Been Implemented

### **✅ Complete Game Loop**
All phases are now functional with proper automation and player control:

1. **Stand Phase** (Auto)
   - All rested characters automatically stand up
   - Auto-advances to Draw Phase

2. **Draw Phase** (Auto)
   - Automatically draw 1 card
   - Auto-refresh deck if empty (costs 1 clock)
   - Auto-advances to Clock Phase

3. **Clock Phase** (Player Choice)
   - Click any card in hand to clock it (draw 2 cards)
   - OR click "Skip Clock" to skip
   - Level up happens automatically at 7 clock

4. **Main Phase** (Player Actions)
   - Click cards in hand to select them
   - Click empty stage slots to play characters
   - Events auto-play when clicked
   - Click "Skip Main" when done

5. **Climax Phase** (Player Actions)
   - Click climax cards to play them
   - Climax auto-plays to climax area
   - Click "Skip Climax" if no climax

6. **Attack Phase** (Player Actions)
   - Click standing characters (front row only) to attack
   - System shows attacker vs defender
   - Click "Perform Trigger Check" button
   - Click "Resolve Battle" button
   - Click "Deal Damage" button
   - Damage cancel works automatically
   - Click "End Attacks" when done

7. **End Phase** (Auto)
   - Hand limit enforced (7 cards max)
   - Climax removed to waiting room
   - Reversed characters to waiting room
   - Auto-advances to next player's turn

### **✅ Attack System**
Complete 3-step attack resolution:

1. **Declare Attack**
   - Click attacking character (must be stand, front row)
   - System checks for defender in same position
   - Character rests automatically

2. **Trigger Check**
   - Click "Perform Trigger Check" button
   - Top card revealed
   - Trigger effects execute (Soul +1, Draw, etc.)
   - Card goes to stock

3. **Battle Resolution**
   - Compare power values
   - Higher power wins
   - Loser goes to reverse state
   - Equal = both reverse

4. **Damage Step**
   - Deal damage equal to soul
   - Each damage reveals a card
   - Climax = damage cancel!
   - Non-climax = goes to clock
   - Level up at 7 clock

### **✅ Trial Decks**
Two pre-built beginner decks:

#### SAO Trial Deck (Blue)
- **Theme**: Kirito & Asuna duo
- **Strategy**: Power boost synergies
- **Best For**: Learning basic mechanics
- **Cards**: 50 (17 Lv0, 14 Lv1, 8 Lv2, 3 Lv3, 3 Events, 8 Climax)

#### Re:Zero Trial Deck (Green)
- **Theme**: Subaru, Emilia, Rem & Ram
- **Strategy**: Balanced offense/recovery
- **Best For**: Learning healing and comeback
- **Cards**: 50 (17 Lv0, 14 Lv1, 8 Lv2, 3 Lv3, 3 Events, 8 Climax)

### **✅ UI Enhancements**
- 🌸 Floating sakura petals
- ✨ Particle effects
- 🎨 Animated gradient backgrounds
- 💫 Glowing text on titles
- 🎯 Neon borders and effects
- 📊 Real-time battle display
- 🔍 Expandable card view (right-click or 🔍 button)

## 🎮 How to Play

### Starting a Game

1. **Click "▶️ Start Game"** from main menu
2. **Select Decks:**
   - Keep "Include Trial Decks" checked
   - Player 1: Select a deck (SAO or Re:Zero recommended)
   - Player 2: Select a different deck
3. **Click "Start Game"**
4. Both players draw 5 cards automatically

### Playing Your Turn

#### Stand & Draw Phases (Automatic)
- Watch as your characters stand up
- Watch as you draw 1 card
- These happen automatically

#### Clock Phase (Your Choice)
- **Option 1**: Click a card in your hand to clock it
  - You'll draw 2 cards
  - If you reach 7 clock, you level up
- **Option 2**: Click "Skip Clock" to pass

#### Main Phase (Play Cards)
1. **To Play a Character:**
   - Click character card in hand
   - Game says "Click an empty stage slot"
   - Click one of the 5 empty slots (Front 1-3, Back 4-5)
   - Character appears on stage!

2. **To Play an Event:**
   - Click event card in hand
   - Executes immediately

3. **When Done:**
   - Click "Skip Main" or "Next Phase"

#### Climax Phase (Play Climax)
- Click climax card in hand to play it
- Climax goes to climax area
- Powers up your attacks this turn
- Click "Skip Climax" if no climax

#### Attack Phase (Battle!)
1. **Declare Attack:**
   - Click a standing character (Front row only)
   - Character rests (turns sideways)
   - Battle display shows attacker vs defender

2. **Trigger Check:**
   - Click "🎲 Perform Trigger Check" button
   - Top deck card revealed
   - Trigger effects happen (Soul +1, Draw, etc.)
   - Card goes to stock

3. **Resolve Battle:**
   - Click "⚔️ Resolve Battle" button
   - Higher power wins
   - Loser gets reversed

4. **Deal Damage:**
   - Click "💥 Deal Damage" button
   - Reveal cards = soul value
   - Climax = CANCEL!
   - Non-climax = goes to clock

5. **Repeat:**
   - Attack with more characters
   - Or click "End Attacks"

#### End Turn
- Click "🔚 End Turn"
- Hand limit enforced (discard down to 7)
- Climax removed
- Reversed characters to waiting room
- Opponent's turn begins!

## 💡 Pro Tips

### Clock Phase Strategy
- Clock early game to build stock
- Clock bad cards to cycle deck
- Don't clock if hand is good

### Main Phase Strategy
- Play level 0 characters first (no cost)
- Build stock before playing big characters
- Keep stock for events and abilities

### Attack Phase Strategy
- Trigger check before battle!
- Soul triggers add +1 soul
- Direct attacks (no defender) = +1 soul
- Front row only can attack

### Stock Management
- You need stock to pay costs
- Trigger checks build stock
- Don't waste stock early game

## 🎯 Win Conditions

### You Win When:
1. ✅ Opponent reaches **Level 4**
2. ✅ Opponent has **0 cards** in deck AND waiting room

### You Lose When:
1. ❌ You reach **Level 4**
2. ❌ You have **0 cards** in deck AND waiting room

## 🎴 Card Types Explained

### Characters
- Play to stage (5 positions)
- Front row (1-3) can attack
- Back row (4-5) support only
- Have Power and Soul

### Events
- One-time effects
- Go to waiting room after use
- Instant effects

### Climax
- Play during Climax Phase
- Stay in climax area for 1 turn
- Removed at end of turn
- Max 8 per deck
- Can cancel damage!

## 🎨 UI Guide

### Card States
- **Stand** (upright) = Can attack
- **Rest** (sideways) = Already attacked or paid cost
- **Reverse** (upside down) = Lost battle, will be removed

### Visual Indicators
- 🟢 **Green Glow** = Can place here
- 🔴 **Red Glow** = Can attack
- 🟣 **Purple Border** = Selected
- 📷 **No Image** = Image unavailable (card still works!)

### Buttons
- ▶ **Next Phase** = Advance phase
- 🔚 **End Turn** = End your turn
- ⏭️ **Skip [Phase]** = Pass on optional phases
- 🎲 **Trigger Check** = Reveal for triggers
- ⚔️ **Resolve Battle** = Compare power
- 💥 **Deal Damage** = Inflict damage

## 📱 Controls

### Mouse Controls
- **Left Click** card = Select/Play/Attack
- **Right Click** card = View details
- **Click** 🔍 button = View details
- **Click** empty slot = Place character
- **ESC** = Close modal

### Keyboard Shortcuts
- **ESC** = Close card viewer

## ⚠️ Common Issues

### "Cannot play card"
- ✅ Check if you have enough stock
- ✅ Check if you meet level requirement
- ✅ Check if you meet color requirement (level 1+)

### "Cannot attack"
- ✅ Character must be in Stand state
- ✅ Character must be in front row (positions 1-3)
- ✅ Must be during Attack Phase

### "Deck is empty"
- ✅ Deck auto-refreshes from waiting room
- ✅ Costs 1 card to clock
- ✅ If both empty = you lose

## 🎓 Tutorial Flow (Recommended)

### Turn 1 (Learning Basics)
1. Stand Phase (watch it happen)
2. Draw Phase (watch it happen)
3. Clock Phase - **Clock a card** (draw 2)
4. Main Phase - **Play a level 0 character**
5. Climax Phase - **Skip** (save climax for later)
6. Attack Phase - **Skip** (no good attacks yet)
7. End Turn

### Turn 2 (First Attack)
1. Auto-phases happen
2. Clock again (build stock)
3. Play more level 0 characters
4. **Don't skip climax** - play one!
5. **Attack with a character:**
   - Click character
   - Trigger check
   - Battle (if defender exists)
   - Deal damage
6. End turn

### Turn 3+ (Advanced Play)
- Play level 1 characters (need level 1+)
- Use events strategically
- Chain attacks
- Manage stock carefully

## 🔧 Technical Details

### Card Play Mechanics
1. Select card from hand
2. System checks: cost, level, color
3. Pay stock cost (stock → waiting room)
4. Card goes to appropriate zone
5. Phase marked as completed (if applicable)

### Attack Flow
```
Declare Attack
    ↓
Rest Attacker
    ↓
Trigger Check (reveal top deck)
    ↓
Execute Trigger Effect
    ↓
Battle (compare power) [if defender exists]
    ↓
Damage Step (reveal cards = soul)
    ↓
Climax Check (cancel if found)
    ↓
Cards to Clock OR Waiting Room
    ↓
Level Up Check (7+ clock)
    ↓
Complete Attack
```

### Level Up Process
1. Clock reaches 7 cards
2. Choose 1 card from clock → level
3. Other 6 cards → waiting room
4. Clock resets to 0
5. If level = 4, you lose!

## 🎁 Features Summary

✅ **Full Weiss Schwarz Rules** (v2.09)  
✅ **Real Card Database** (thousands of cards)  
✅ **Trial Decks** (beginner-friendly)  
✅ **Custom Deck Builder**  
✅ **Complete Attack System**  
✅ **Trigger Mechanics**  
✅ **Damage Cancel**  
✅ **Level Up System**  
✅ **Win/Lose Conditions**  
✅ **Anime-Themed UI**  
✅ **Virtual Scrolling** (no lag!)  
✅ **Card Image Display**  
✅ **Expandable Card View**  

## 📝 Credits

- **Game**: Bushiroad's Weiss Schwarz TCG
- **Card Database**: [WeissSchwarz-ENG-DB](https://github.com/CCondeluci/WeissSchwarz-ENG-DB)
- **Development**: Fan-made digital implementation
- **Status**: Educational/Non-commercial use only

---

## 🚀 Quick Start Checklist

- [ ] Click "Start Game"
- [ ] Select SAO Trial Deck for Player 1
- [ ] Select Re:Zero Trial Deck for Player 2
- [ ] Click "Start Game"
- [ ] Watch Stand & Draw (auto)
- [ ] Clock a card or skip
- [ ] Play a character from hand
- [ ] Click empty slot to place it
- [ ] Skip climax (or play one!)
- [ ] Click character to attack
- [ ] Follow attack prompts
- [ ] Click "End Turn"
- [ ] Repeat!

**Have fun! 🎴✨**

