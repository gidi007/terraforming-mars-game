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
  '/images/background1.jpg',
  '/images/background2.jpg',
  '/images/background5.jpg',
  '/images/background6.jpg',
];

export default function GameBoard() {
  const { oxygen, temperature, oceans, credits, plants, energy, gameWon } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const [savedState, setSavedState] = useState(null);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  // Smooth background change
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 60000); 

    return () => clearInterval(intervalId);
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
      const resourceActions = [
        () => dispatch(decreaseCredits(resourceGain)),
        () => dispatch(decreasePlants(resourceGain)),
        () => dispatch(decreaseEnergy(resourceGain)),
      ];
      resourceActions[resourceType]();
      toast.error(`You lost ${resourceGain} resources!`, { position: 'top-right' });
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-8 text-white min-h-screen transition-all duration-1000"
      style={{ 
        backgroundImage: `url(${currentBackground})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-4xl font-bold mb-10 text-center">Mars Terraforming Status</h1>
      {gameWon ? (
        <div className="text-3xl font-semibold text-green-500">Game Won! 🎉</div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-6 w-full max-w-md mb-8">
            <Stat label="Oxygen" value={`${oxygen}% 📠`} />
            <Stat label="Temperature" value={`${temperature}°C ❄`} />
            <Stat label="Oceans" value={`${oceans} / 9 💧`} />
            <Stat label="Credits" value={`${credits} 💵`} />
            <Stat label="Plants" value={`${plants} 🌿`} />
            <Stat label="Energy" value={`${energy} ⛮`} />
          </div>

          {/* Progress Bars */}
          <Progress label="Oxygen Progress" value={(oxygen / 14) * 100} color="green" />
          <Progress label="Temperature Progress" value={((temperature + 30) / 38) * 100} color="orange" />
          <Progress label="Oceans Progress" value={(oceans / 9) * 100} color="blue" />

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {renderButtons(dispatch, handleSave, handleLoad, triggerEvent)}
          </div>
        </>
      )}
    </div>
  );
}

// Component for displaying stats
const Stat = ({ label, value }) => (
  <div className="flex justify-between text-lg font-medium">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

// Progress Bar Component
const Progress = ({ label, value, color }) => (
  <div className="w-full mb-4">
    <div className="text-sm mb-1">{label}</div>
    <div className="bg-gray-700 rounded-full h-2">
      <div 
        className={`bg-${color}-500 h-full rounded-full`} 
        style={{ width: `${value}%` }} 
      />
    </div>
  </div>
);

// Render Action Buttons
const renderButtons = (dispatch, handleSave, handleLoad, triggerEvent) => {
  const buttons = [
    { text: 'Increase Oxygen', action: increaseOxygen, color: 'blue' },
    { text: 'Increase Temperature', action: increaseTemperature, color: 'red' },
    { text: 'Place Ocean Tile', action: placeOceanTile, color: 'teal' },
    { text: 'Save Game', action: handleSave, color: 'purple' },
    { text: 'Load Game', action: handleLoad, color: 'indigo' },
    { text: 'Trigger Random Event', action: triggerEvent, color: 'gray' },
  ];

  return buttons.map((btn, index) => (
    <button
      key={index}
      className={`bg-${btn.color}-600 hover:bg-${btn.color}-700 text-white py-2 px-4 rounded-lg transition`}
      onClick={() => dispatch(btn.action())}
    >
      {btn.text}
    </button>
  ));
};
