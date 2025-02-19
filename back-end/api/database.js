import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config()

const URI = process.env.MONGO_DB_URI;
const client = new MongoClient(URI);
const database = client.db("spotify-clone");

export { database };
