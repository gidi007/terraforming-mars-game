// components/GameBoard.js
import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { increaseOxygen, increaseTemperature, placeOceanTile } from '../redux/slices/gameSlice';
import { toast } from 'react-toastify'; // Importing Toastify for notifications
import 'react-toastify/dist/ReactToastify.css';

export default function GameBoard() {
  const { oxygen, temperature, oceans, gameWon } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [savedState, setSavedState] = useState(null); // Temporary state to store game data

  const handleSave = () => {
    const gameState = { oxygen, temperature, oceans };
    setSavedState(gameState); // Save to temporary state
    toast.success('Game saved!'); // Notify the user with a toast
  };

  const handleLoad = () => {
    if (savedState) {
      // Load the game state from temporary state
      dispatch(increaseOxygen(savedState.oxygen));
      dispatch(increaseTemperature(savedState.temperature));
      dispatch(placeOceanTile(savedState.oceans));
      toast.info('Game loaded!'); // Notify the user with a toast
    } else {
      toast.error('No game state saved!'); // Notify if there's no saved state
    }
  };

  return (
    <div className="flex flex-col items-center p-10 bg-gray-900 text-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Mars Terraforming Status</h1>
      {gameWon ? (
        <div className="text-4xl font-semibold text-green-500 mb-4">Game Won! 🎉</div>
      ) : (
        <>
          <div className="mb-4 text-lg">Oxygen: {oxygen}%</div>
          <div className="mb-4 text-lg">Temperature: {temperature}°C</div>
          <div className="mb-6 text-lg">Oceans: {oceans} / 9</div>

          <div className="flex space-x-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
              onClick={() => {
                dispatch(increaseOxygen());
                toast.success('Oxygen Increased!'); // Notify user
              }}
            >
              Increase Oxygen
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
              onClick={() => {
                dispatch(increaseTemperature());
                toast.success('Temperature Increased!'); // Notify user
              }}
            >
              Increase Temperature
            </button>
            <button
              className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
              onClick={() => {
                dispatch(placeOceanTile());
                toast.success('Ocean Tile Placed!'); // Notify user
              }}
            >
              Place Ocean Tile
            </button>
            <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
              onClick={handleSave}
            >
              Save Game
            </button>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
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
