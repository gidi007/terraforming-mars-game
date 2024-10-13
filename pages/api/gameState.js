// pages/api/gameState.js
import dbConnect from '../../utils/dbConnect';
import GameState from '../../models/GameState';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const newState = new GameState(req.body);
    await newState.save();
    res.status(201).json({ success: true });
  } else if (req.method === 'GET') {
    const gameState = await GameState.find({});
    res.status(200).json(gameState);
  }
}
