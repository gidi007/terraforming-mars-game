import { MongoClient } from 'mongodb';

const uri = 'YOUR_MONGODB_URI'; // Replace with your MongoDB connection string
const client = new MongoClient(uri);
const database = client.db('terraforming_mars');
const collection = database.collection('games');

export default async function handler(req, res) {
  await client.connect();

  if (req.method === 'POST') {
    // Save game state
    const gameData = req.body;
    const result = await collection.insertOne(gameData);
    res.status(201).json(result);
  } else if (req.method === 'GET') {
    // Load game state
    const games = await collection.find({}).toArray();
    res.status(200).json(games);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
