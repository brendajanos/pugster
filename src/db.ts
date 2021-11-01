import { MongoClient } from "mongodb";

const url = process.env.MONGODB_URL || "mongodb://localhost:27017";

// "mongodb://pugster:pugster@mongodb.database.svc.cluster.local:27017/pugster"

let client: MongoClient | null = null;

function getClient(): MongoClient {
  if (!client) throw new Error("Need to connect to the database first!");
  return client;
}

async function connectToDatabase(): Promise<MongoClient> {
  client = new MongoClient(url);
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to database");
  return client;
}

export { connectToDatabase, getClient };
