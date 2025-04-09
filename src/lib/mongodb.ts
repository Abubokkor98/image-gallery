import { MongoClient, ServerApiVersion } from "mongodb";

export default function dbConnect(collectionName: string) {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  //avoid connection issues
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }

  // Create a new MongoDB client with specified server API version and strict mode
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  //connect to the database
  return client.db(dbName).collection(collectionName);
}
