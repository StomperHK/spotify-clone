import { useParams } from "react-router";

import { useFetchItemData } from "../../hooks/useFetchItemData";
import { SongPlayer } from "./SongPlayer";
import { Spinner } from "../../components/Spinner";

export function Song() {
	const id = useParams().id;
	const songData = useFetchItemData("song", `?id=${id}`);
	const songLoaded = songData.name;

	return (
		<div>
			<main className="flex flex-col h-[calc(100svh_-_var(--header-height))]">
				<div className="flex justify-center items-center h-[85%] shrink-0 bg-spotify rounded-md max-md:h-[60%]">
					{songLoaded ? <img src={songData.image} alt="" className="w-[70%] shrink-0 max-w-[250px] aspect-square rounded-md" /> : <Spinner />}
				</div>

				<SongPlayer key={songData._id} songData={songData} songLoaded={songLoaded} />
			</main>
		</div>
	);
}
