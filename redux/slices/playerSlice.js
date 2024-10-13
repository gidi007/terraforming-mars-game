import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: [
    { id: 1, name: 'Player 1', credits: 10, plants: 0, energy: 5 },
    { id: 2, name: 'Player 2', credits: 10, plants: 0, energy: 5 },
  ],
  currentPlayer: 1,
};

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    switchPlayer: (state) => {
      state.currentPlayer =
        state.currentPlayer === 1 ? 2 : 1; // Switch between two players
    },
    updateResources: (state, action) => {
      const { playerId, resource, amount } = action.payload;
      const player = state.players.find((p) => p.id === playerId);
      if (player) player[resource] += amount;
    },
  },
});

export const { switchPlayer, updateResources } = playerSlice.actions;
export default playerSlice.reducer;
