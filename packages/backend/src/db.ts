import { MongoClient } from "mongodb";

let url = "mongodb://localhost:27017";

if (process.env.NODE_ENV === "production") {
  url = "mongodb://pugster:pugster@mongodb.database.svc.cluster.local:27017"
}

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
