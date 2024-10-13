import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchPlayer, updateResources } from '../redux/slices/playerSlice';

export default function PlayerBoard() {
  const dispatch = useDispatch();
  const { players, currentPlayer } = useSelector((state) => state.players);
  const player = players.find((p) => p.id === currentPlayer);

  return (
    <div className="p-8 bg-gray-800 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{player.name}'s Turn</h2>
      <div className="mb-2">Credits: {player.credits}</div>
      <div className="mb-2">Plants: {player.plants}</div>
      <div className="mb-6">Energy: {player.energy}</div>

      <button
        className="w-full bg-gray-600 hover:bg-gray-700 py-2 mt-4 rounded-lg transition"
        onClick={() => dispatch(switchPlayer())}
      >
        End Turn
      </button>
    </div>
  );
}
