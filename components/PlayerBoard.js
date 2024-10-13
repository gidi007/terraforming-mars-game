// components/PlayerBoard.js
import React from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { switchPlayer } from '../redux/slices/playerSlice';
import { toast } from 'react-toastify'; // Importing Toastify for notifications

export default function PlayerBoard() {
  const dispatch = useDispatch();
  const { players, currentPlayer } = useSelector((state) => state.players);
  const player = players.find((p) => p.id === currentPlayer);

  const handleEndTurn = () => {
    dispatch(switchPlayer());
    toast.success('Turn ended!'); // Show success toast notification
  };

  return (
    <div className="p-8 bg-gray-800 text-white rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h2 className="text-xl font-semibold mb-4 animate-bounce">{player.name}'s Turn</h2>
      <div className="mb-2">Credits: {player.credits}</div>
      <div className="mb-2">Plants: {player.plants}</div>
      <div className="mb-6">Energy: {player.energy}</div>

      <button
        className="w-full bg-gray-600 hover:bg-gray-700 py-2 mt-4 rounded-lg transition transition-transform transform hover:scale-105"
        onClick={handleEndTurn}
      >
        End Turn
      </button>
    </div>
  );
}
