// redux/slices/gameSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  oxygen: 0,
  temperature: -30,
  oceans: 0,
  maxOxygen: 14,
  maxTemperature: 8,
  maxOceans: 9,
  gameWon: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    increaseOxygen: (state) => {
      if (state.oxygen < state.maxOxygen) state.oxygen += 1;
      checkGameWin(state);
    },
    increaseTemperature: (state) => {
      if (state.temperature < state.maxTemperature) state.temperature += 2;
      checkGameWin(state);
    },
    placeOceanTile: (state) => {
      if (state.oceans < state.maxOceans) state.oceans += 1;
      checkGameWin(state);
    },
    saveGame: (state) => {
      // No need to change this logic as it will be handled in the component
    },
    loadGame: (state, action) => {
      return { ...state, ...action.payload }; // Load the game state
    },
  },
});

// Function to check if the game is won
const checkGameWin = (state) => {
  if (
    state.oxygen >= state.maxOxygen &&
    state.temperature >= state.maxTemperature &&
    state.oceans >= state.maxOceans
  ) {
    state.gameWon = true;
  }
};

export const { increaseOxygen, increaseTemperature, placeOceanTile, saveGame, loadGame } = gameSlice.actions;

export default gameSlice.reducer;
