import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  oxygen: 0,
  temperature: -30,
  oceans: 0,
  credits: 0,
  plants: 0,
  energy: 0,
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
    increaseCredits: (state, action) => {
      state.credits += action.payload;
    },
    decreaseCredits: (state, action) => {
      if (state.credits >= action.payload) {
        state.credits -= action.payload;
      } else {
        console.error('Not enough credits!');
      }
    },
    increasePlants: (state, action) => {
      state.plants += action.payload;
    },
    decreasePlants: (state, action) => {
      if (state.plants >= action.payload) {
        state.plants -= action.payload;
      } else {
        console.error('Not enough plants!');
      }
    },
    increaseEnergy: (state, action) => {
      state.energy += action.payload;
    },
    decreaseEnergy: (state, action) => {
      if (state.energy >= action.payload) {
        state.energy -= action.payload;
      } else {
        console.error('Not enough energy!');
      }
    },
  },
});

// Check if the game is won
const checkGameWin = (state) => {
  if (state.oxygen >= state.maxOxygen && state.temperature >= state.maxTemperature && state.oceans >= state.maxOceans) {
    state.gameWon = true;
  }
};

export const {
  increaseOxygen,
  increaseTemperature,
  placeOceanTile,
  increaseCredits,
  decreaseCredits,
  increasePlants,
  decreasePlants,
  increaseEnergy,
  decreaseEnergy,
} = gameSlice.actions;

export default gameSlice.reducer;
