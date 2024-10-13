import { MongoClient } from 'mongodb';

// Use a singleton connection to avoid reconnecting on every request
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  try {
    if (cachedClient && cachedDb) {
      console.log('Using cached database connection');
      return { client: cachedClient, db: cachedDb };
    }

    const uri = process.env.MONGODB_URI; // Ensure your connection string is in .env.local
    if (!uri) throw new Error('Missing MongoDB URI. Check your .env.local file.');

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const db = client.db('terraforming_mars');

    cachedClient = client;
    cachedDb = db;

    console.log('Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw new Error('Failed to connect to the database');
  }
}

export default async function handler(req, res) {
  try {
    console.log('API called with method:', req.method);

    const { db } = await connectToDatabase();
    const collection = db.collection('games');

    if (req.method === 'POST') {
      // Save game state
      const gameData = req.body;

      if (!gameData || typeof gameData !== 'object') {
        console.error('Invalid game data:', gameData);
        return res.status(400).json({ message: 'Invalid game data' });
      }

      const result = await collection.insertOne(gameData);
      console.log('Game state saved:', result);
      res.status(201).json({ message: 'Game saved!', result });
    } else if (req.method === 'GET') {
      // Load the latest game state
      const games = await collection.find({}).sort({ _id: -1 }).limit(1).toArray();
      console.log('Fetched game state:', games);

      if (games.length === 0) {
        console.warn('No saved game found');
        return res.status(404).json({ message: 'No saved game found.' });
      }

      res.status(200).json(games[0]);
    } else {
      res.setHeader('Allow', ['POST', 'GET']);
      console.warn(`Method ${req.method} Not Allowed`);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in API handler:', error.message);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
}
