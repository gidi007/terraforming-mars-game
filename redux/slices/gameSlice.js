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
    saveGame: (state, action) => {
      // logic for saving game state
    },
    loadGame: (state, action) => {
      // logic for loading game state
      return { ...state, ...action.payload };
    },
  },
});

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
