import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { database } from "./database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isInProduction = process.env.PRODUCTION === "true"

if (isInProduction) {
  app.use(cors({origin: /vercel\.app$/}))
}
else {  
  app.use(cors({ origin: true }));
}


app.get("/artists", async (req, res) => {
	const limit = Number(req.query.limit);

	const artistsCollection = database.collection("artists");
	const artists = await artistsCollection
		.find({}, { projection: { image: 1, name: 1 } })
		.limit(limit ? limit : 0)
		.toArray();

	res.status(200);
	res.send(artists);
});

app.get("/songs", async (req, res) => {
	const limit = Number(req.query.limit);
	const offset = Number(req.query.offset);
	const artist = req.query.artist;
	const songsCollection = database.collection("songs");
	let songs = [];

	if (artist) {
		songs = await songsCollection
			.find({ artist: artist }, { projection: { image: 1, name: 1, duration: 1 } })
			.limit(limit || 5)
			.skip(limit ? limit * offset : 0)
			.toArray();
	} else {
		songs = await songsCollection
			.find({}, { projection: { image: 1, name: 1 } })
			.limit(limit || 20)
			.skip(limit ? limit * offset : 0)
			.toArray();
	}

	if (songs.length === 0) {
		console.log(songs);

		res.status(404);
		res.send("No songs were found");
		return;
	}

	res.status(200);
	res.send(songs);
});

app.get("/artist", async (req, res) => {
	let { id } = req.query;
	id = new ObjectId(id);
	let artist = {};
	let artistSongs = [];

	if (!id) {
		res.status(400);
		res.statusMessage = "Missing artist id.";
		res.send("Bad Request");
		return;
	}

	artist = await database.collection("artists").findOne({ _id: id });

	console.log(artist);

	if (typeof artist !== "object") {
		res.status(404);
		res.send("No artist found");
		return;
	}

	artistSongs = await database.collection("songs").find({ artist: artist.name }).limit(5).toArray();
	artist.songs = artistSongs;

	res.status(200);
	res.send(artist);
});

app.get("/song", async (req, res) => {
	const id = new ObjectId(req.query.id);
	let cursor = null;
	let song = {};
	let prevSongId = null;
	let nextSongId = null;

	if (!id) {
		res.status(400);
		res.send("Bad request");
	}

	song = await database.collection("songs").findOne({ _id: id });
	cursor = await database
		.collection("songs")
		.find({ artist: song.artist }, { projection: { _id: 1 } })
		.limit(20);

	for await (const doc of cursor) {
		if (doc._id.toString() === song._id.toString()) {
			song.prevSongId = prevSongId;

			if (await cursor.hasNext()) {
				nextSongId = (await cursor.next())._id;
			}

			song.nextSongId = nextSongId;

			break;
		}

		prevSongId = doc._id;
	}

	if (typeof song !== "object") {
		res.status(404);
		res.send("No song found");
		return;
	}

	res.status(200);
	res.send(song);
});

app.listen(PORT);
