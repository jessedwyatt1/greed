// script.js

class Game {
  constructor() {
    this.players = [];
    this.numberOfDice = 2;
    this.currentPlayerIndex = 0;
    this.isGameOver = false;
  }

  initializeGame(playerCount, numberOfDice) {
    this.players = Array.from({ length: playerCount }, () => ({ score: 0, bank: 0 }));
    this.numberOfDice = numberOfDice;
    this.determineFirstPlayer();
  }

  rollDice() {
    return Array.from({ length: this.numberOfDice }, () => Math.ceil(Math.random() * 6));
  }

  determineFirstPlayer() {
    let highestRoll = 0;
    let playersWithHighestRoll = [];

    this.players.forEach((_, index) => {
      const roll = this.rollDice()[0]; // Roll one die for determining the first player
      console.log(`Player ${index + 1} rolled: ${roll}`);
      if (roll > highestRoll) {
        highestRoll = roll;
        playersWithHighestRoll = [index];
      } else if (roll === highestRoll) {
        playersWithHighestRoll.push(index);
      }
    });

    if (playersWithHighestRoll.length > 1) {
      // If tie, reroll among the tied players
      console.log("Tie detected. Rerolling among tied players.");
      this.determineFirstPlayer(); // Simplified for example, should only reroll for tied players
    } else {
      this.currentPlayerIndex = playersWithHighestRoll[0];
      console.log(`Player ${this.currentPlayerIndex + 1} goes first.`);
    }
  }

  playTurn() {
    if (this.isGameOver) return;

    const currentPlayer = this.players[this.currentPlayerIndex];
    const rollResult = this.rollDice();
    console.log(`Player ${this.currentPlayerIndex + 1} rolled: ${rollResult.join(', ')}`);

    if (rollResult.includes(1)) {
      console.log("Rolled a 1. Turn ends with no points.");
      this.endTurn();
    } else {
      const points = rollResult.reduce((acc, val) => acc + val, 0);
      currentPlayer.score += points;
      console.log(`Current points this turn: ${currentPlayer.score}`);
      // Decide to bank or roll again...
    }
  }

  bankPoints() {
    const currentPlayer = this.players[this.currentPlayerIndex];
    currentPlayer.bank += currentPlayer.score;
    currentPlayer.score = 0;
    console.log(`Player ${this.currentPlayerIndex + 1} banked points. Total bank: ${currentPlayer.bank}`);
    this.checkWinCondition();
    this.endTurn();
  }

  checkWinCondition() {
    const currentPlayer = this.players[this.currentPlayerIndex];
    if (currentPlayer.bank >= 100) {
      console.log(`Player ${this.currentPlayerIndex + 1} wins with ${currentPlayer.bank} points!`);
      this.isGameOver = true;
    }
  }

  endTurn() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    this.players[this.currentPlayerIndex].score = 0; // Reset score for the next player
    console.log(`It's now Player ${this.currentPlayerIndex + 1}'s turn.`);
  }
}

// Example usage:
const game = new Game();
game.initializeGame(4, 2); // 4 players, 2 dice
// Further game actions (playTurn, bankPoints) would be triggered by user actions (button clicks, etc.)
