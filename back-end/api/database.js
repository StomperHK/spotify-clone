import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config()

const URI = process.env.MONGO_DB_URI;
let client = null;
let database = null;

console.log(URI)

try {
	client = new MongoClient(URI);
	database = client.db("spotify-clone");
} catch (err) {
	client.close();
}

export { database };
