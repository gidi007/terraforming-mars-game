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
import { toast } from 'react-toastify'; 

const backgrounds = [
  '/images/background1.jpg', // Ensure paths are correct
  '/images/background2.jpg',
  '/images/background5.jpg',
  '/images/background6.jpg',
];

export default function GameBoard() {
  const { oxygen, temperature, oceans, credits, plants, energy, gameWon } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [savedState, setSavedState] = useState(null);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  // Handle changing backgrounds smoothly
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 60000); // Change background every 60 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const currentBackground = backgrounds[currentBackgroundIndex];

  const handleSave = () => {
    const gameState = { oxygen, temperature, oceans, credits, plants, energy };
    setSavedState(gameState);
    toast.success('Game saved!', { position: 'top-right' });
  };

  const handleLoad = () => {
    if (savedState) {
      dispatch(increaseOxygen(savedState.oxygen));
      dispatch(increaseTemperature(savedState.temperature));
      dispatch(placeOceanTile(savedState.oceans));
      dispatch(increaseCredits(savedState.credits));
      dispatch(increasePlants(savedState.plants));
      dispatch(increaseEnergy(savedState.energy));
      toast.success('Game loaded!', { position: 'top-right' });
    } else {
      toast.error('No game state saved!', { position: 'top-right' });
    }
  };

  const triggerEvent = () => {
    const resourceGain = Math.floor(Math.random() * 10) + 1;
    const randomEvent = Math.floor(Math.random() * 2);

    if (randomEvent === 0) {
      dispatch(increaseCredits(resourceGain));
      dispatch(increasePlants(resourceGain));
      dispatch(increaseEnergy(resourceGain));
      toast.success(`You gained ${resourceGain} resources!`, { position: 'top-right' });
    } else {
      const resourceType = Math.floor(Math.random() * 3);
      if (resourceType === 0) {
        dispatch(decreaseCredits(resourceGain));
        toast.error(`You lost ${resourceGain} credits!`, { position: 'top-right' });
      } else if (resourceType === 1) {
        dispatch(decreasePlants(resourceGain));
        toast.error(`You lost ${resourceGain} plants!`, { position: 'top-right' });
      } else {
        dispatch(decreaseEnergy(resourceGain));
        toast.error(`You lost ${resourceGain} energy!`, { position: 'top-right' });
      }
    }
  };

  return (
    <div 
      className="flex flex-col items-center p-10 text-white rounded-lg shadow-lg transition-all duration-1000" 
      style={{ 
        backgroundImage: `url(${currentBackground})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh', 
        width: '100vw' 
      }}
    >
      <h1 className="text-4xl font-bold mb-8">Mars Terraforming Status</h1>
      {gameWon ? (
        <div className="text-3xl font-semibold text-green-500">Game Won! 🎉</div>
      ) : (
        <>
          <div className="mb-4 text-lg">Oxygen: {oxygen}% 📠</div>
          <div className="mb-4 text-lg">Temperature: {temperature}°C ❄</div>
          <div className="mb-4 text-lg">Oceans: {oceans} / 9 💧</div>
          <div className="mb-4 text-lg">Credits: {credits} 💵</div>
          <div className="mb-4 text-lg">Plants: {plants} 🌿</div>
          <div className="mb-4 text-lg">Energy: {energy} ⛮</div>

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

          <div className="space-x-4 mt-6">
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
