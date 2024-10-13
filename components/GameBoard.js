import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseOxygen, increaseTemperature, placeOceanTile, saveGame, loadGame } from '../redux/slices/gameSlice';

const saveGameToDB = async (gameState) => {
  await fetch('/api/game', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameState),
  });
};

const loadGameFromDB = async () => {
  const response = await fetch('/api/game');
  const games = await response.json();
  return games[0]; // Load the latest game state
};

export default function GameBoard() {
  const { oxygen, temperature, oceans, gameWon } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const handleSave = async () => {
    const gameState = { oxygen, temperature, oceans };
    await saveGameToDB(gameState);
    alert('Game saved!');
  };

  const handleLoad = async () => {
    const gameState = await loadGameFromDB();
    dispatch(loadGame(gameState));
    alert('Game loaded!');
  };

  return (
    <div className="flex flex-col items-center p-10 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Mars Terraforming Status</h1>
      {gameWon ? (
        <div className="text-3xl font-semibold text-green-500">Game Won! 🎉</div>
      ) : (
        <>
          <div className="mb-4 text-lg">Oxygen: {oxygen}%</div>
          <div className="mb-4 text-lg">Temperature: {temperature}°C</div>
          <div className="mb-6 text-lg">Oceans: {oceans} / 9</div>

          <div className="space-x-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
              onClick={() => dispatch(increaseOxygen())}
            >
              Increase Oxygen
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition"
              onClick={() => dispatch(increaseTemperature())}
            >
              Increase Temperature
            </button>
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg transition"
              onClick={() => dispatch(placeOceanTile())}
            >
              Place Ocean Tile
            </button>
            <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition"
              onClick={handleSave}
            >
              Save Game
            </button>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition"
              onClick={handleLoad}
            >
              Load Game
            </button>
          </div>
        </>
      )}
    </div>
  );
}
