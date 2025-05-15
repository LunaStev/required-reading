import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

const globalForMongo = globalThis as unknown as {
    _mongoClientPromise?: Promise<MongoClient>;
};

if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env.local');
}

if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(uri!, options);
    globalForMongo._mongoClientPromise = client.connect();
}

const clientPromise = globalForMongo._mongoClientPromise!;

export default clientPromise;
