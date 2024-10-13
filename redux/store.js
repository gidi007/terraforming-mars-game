import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './slices/gameSlice';
import playerSlice from './slices/playerSlice';

const store = configureStore({
  reducer: {
    game: gameSlice,
    players: playerSlice,
  },
});

export default store;