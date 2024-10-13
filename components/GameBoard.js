import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { 
  increaseOxygen, 
  increaseTemperature, 
  placeOceanTile, 
  increaseCredits, 
  decreaseCredits, 
  increasePlants, 
  decreasePlants, 
  increaseEnergy, 
  decreaseEnergy 
} from '../redux/slices/gameSlice';
import { toast } from 'react-toastify'; // Keep this import

export default function GameBoard() {
  const { oxygen, temperature, oceans, credits, plants, energy, gameWon } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [savedState, setSavedState] = useState(null); // Temporary state to store game data

  // Use effect to set saved state after the initial render
  useEffect(() => {
    // Ensure we set savedState only in the client
    const gameState = { oxygen, temperature, oceans, credits, plants, energy };
    setSavedState(gameState);
  }, [oxygen, temperature, oceans, credits, plants, energy]);

  const handleSave = () => {
    const gameState = { oxygen, temperature, oceans, credits, plants, energy };
    setSavedState(gameState); // Save to temporary state
    toast.success('Game saved!', { position: 'top-right' }); // Change here
  };

  const handleLoad = () => {
    if (savedState) {
      // Load the game state from temporary state
      dispatch(increaseOxygen(savedState.oxygen));
      dispatch(increaseTemperature(savedState.temperature));
      dispatch(placeOceanTile(savedState.oceans));
      dispatch(increaseCredits(savedState.credits));
      dispatch(increasePlants(savedState.plants));
      dispatch(increaseEnergy(savedState.energy));
      toast.success('Game loaded!', { position: 'top-right' }); // Change here
    } else {
      toast.error('No game state saved!', { position: 'top-right' }); // Change here
    }
  };

  const triggerEvent = () => {
    const resourceGain = Math.floor(Math.random() * 10) + 1; // Random resource amount
    const randomEvent = Math.floor(Math.random() * 2); // Random event

    if (randomEvent === 0) {
      // Increase resources
      dispatch(increaseCredits(resourceGain));
      dispatch(increasePlants(resourceGain));
      dispatch(increaseEnergy(resourceGain));
      toast.success(`You gained ${resourceGain} resources!`, { position: 'top-right' }); // Change here
    } else {
      // Decrease resources randomly
      const resourceType = Math.floor(Math.random() * 3);
      if (resourceType === 0) {
        dispatch(decreaseCredits(resourceGain));
        toast.error(`You lost ${resourceGain} credits!`, { position: 'top-right' }); // Change here
      } else if (resourceType === 1) {
        dispatch(decreasePlants(resourceGain));
        toast.error(`You lost ${resourceGain} plants!`, { position: 'top-right' }); // Change here
      } else {
        dispatch(decreaseEnergy(resourceGain));
        toast.error(`You lost ${resourceGain} energy!`, { position: 'top-right' }); // Change here
      }
    }
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
          <div className="mb-4 text-lg">Oceans: {oceans} / 9</div>
          <div className="mb-4 text-lg">Credits: {credits}</div>
          <div className="mb-4 text-lg">Plants: {plants}</div>
          <div className="mb-4 text-lg">Energy: {energy}</div>

          {/* Progress Bars */}
          <div className="w-full mb-4">
            <div className="text-sm mb-1">Oxygen Progress</div>
            <div className="bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-full rounded-full" 
                style={{ width: `${(oxygen / 14) * 100}%` }} 
              />
            </div>
          </div>
          <div className="w-full mb-4">
            <div className="text-sm mb-1">Temperature Progress</div>
            <div className="bg-gray-700 rounded-full h-2">
              <div 
                className="bg-orange-500 h-full rounded-full" 
                style={{ width: `${((temperature + 30) / 38) * 100}%` }} 
              />
            </div>
          </div>
          <div className="w-full mb-4">
            <div className="text-sm mb-1">Oceans Progress</div>
            <div className="bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-full rounded-full" 
                style={{ width: `${(oceans / 9) * 100}%` }} 
              />
            </div>
          </div>

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
              onClick={() => {
                dispatch(increaseCredits(5));
                toast.success('Gained 5 credits!', { position: 'top-right' }); // Change here
              }}
            >
              Gain Credits
            </button>
            <button
              className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition"
              onClick={() => {
                dispatch(decreaseCredits(3));
                toast.success('Lost 3 credits!', { position: 'top-right' }); // Change here
              }}
            >
              Lose Credits
            </button>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition"
              onClick={handleSave}
            >
              Save Game
            </button>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition"
              onClick={handleLoad}
            >
              Load Game
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition"
              onClick={triggerEvent}
            >
              Trigger Random Event
            </button>
          </div>
        </>
      )}
    </div>
  );
}
