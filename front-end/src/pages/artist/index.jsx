import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, Link } from "react-router";

import { useFetchItemData } from "../../hooks/useFetchItemData";
import { api } from "../../lib/api";
import { ArtistSong } from "./ArtistSong";
import { Spinner } from "../../components/Spinner";

export function Artist() {
	const [songsAreExpanded, setSongsAreExpanded] = useState(false);
	const [artistSongs, setArtistSongs] = useState([]);
	const { id } = useParams();
	const artistData = useFetchItemData("artist", `?id=${id}`);

	const artistDataLoaded = Boolean(artistSongs.length);

	useEffect(() => {
		if (artistData.songs) {
			setArtistSongs(artistData.songs);
		}
	}, [artistData]);

	async function fetchExtraSongs() {
		const extraSongs = (await api.get(`/songs?limit=5&offset=1&artist=${artistData.name.replaceAll(" ", "%20").replaceAll("&", "%26")}`)).data;

		setArtistSongs([...artistSongs, ...extraSongs]);

		setSongsAreExpanded(true);
	}

	return (
		<main className="min-h-[90svh] rounded-xl overflow-hidden">
			<div
				className={`flex p-8 gap-8 ${artistDataLoaded ? "justify-start items-end" : "justify-center items-center"} aspect-[21/9] bg-green-400 bg-cover bg-center`}
				style={{ backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${artistData && artistData.banner})` }}>
				{artistDataLoaded ? (
					<>
						<img src={artistData && artistData.image} alt={artistData && artistData.name + " image"} className="w-[30%] max-w-[200px] rounded-lg max-md:w-[25%]" />
						<h2 className="text-6xl font-bold max-md:text-4xl">{artistData && artistData.name}</h2>
					</>
				) : (
					<Spinner />
				)}
			</div>

			<nav className="py-12 px-8 spotify-gradient">
				{artistDataLoaded ? (
					<>
						<h3 className="mb-4 text-lg font-semibold">Populares</h3>

						<ol className="[&>*+*]:mt-2 mb-4">
							{artistDataLoaded &&
								artistSongs.map(({ _id, image, name, duration }) => (
									<ArtistSong key={_id} image={image} name={name} href={`/song/${_id}`} duration={duration} />
								))}
						</ol>
					</>
				) : (
          <div className="flex justify-center">
            <Spinner className="!border-3 !p-3" />
          </div>
				)}

				{!songsAreExpanded && artistDataLoaded && (
					<button onClick={fetchExtraSongs} className="hover:underline">
						mais músicas
					</button>
				)}

				{artistDataLoaded && (
					<Link
						to={`/song/${artistSongs[0]._id}`}
						className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-green-500 fixed right-6 bottom-6 ">
						<FontAwesomeIcon icon="fa-solid fa-play" className="text-2xl translate-x-0.5" />
					</Link>
				)}
			</nav>
		</main>
	);
}
