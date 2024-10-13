// models/GameState.js
import mongoose from 'mongoose';

const gameStateSchema = new mongoose.Schema({
  oxygen: Number,
  temperature: Number,
  oceans: Number,
  players: Array,
  progress: Array,
});

export default mongoose.models.GameState || mongoose.model('GameState', gameStateSchema);
