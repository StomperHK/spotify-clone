import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

import { useFetchItemsData } from "../../hooks/useFetchItemsData";
import { Card } from "../../components/Card";
import { Spinner } from "../../components/Spinner";

export function AllSongsList() {
	const [songsData, setPath] = useFetchItemsData("songs?limit=20&offset=0");
	const [offset, setOffset] = useState(1);
	const observer = useRef();
	const loadMoreSongsObserver = useRef();
	const songsDataLoaded = songsData.length > 0;

	useEffect(() => {
    async function fetchMoreSongs() {
      setPath(`songs?limit=20&offset=${offset}`)
      setOffset(offset + 1);
    }

		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				fetchMoreSongs();
			}
		});

		observer.current.observe(loadMoreSongsObserver.current);

		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, [offset, setPath]);
  
	return (
		<>
			<h2 className="mb-8">
				Músicas Populares <FontAwesomeIcon icon="fa-solid fa-music" className="ml-1.5" />
			</h2>

			{songsDataLoaded ? (
				<ul className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] max-sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
					{songsData.map(({ _id, image, name }) => (
						<Card key={_id} image={image} name={name} label="Música" href={`/song/${_id}`} />
					))}
				</ul>
			) : (
				<div className="flex justify-center items-center h-[var(--items-list--height)]">
					<Spinner />
				</div>
			)}

      <div ref={loadMoreSongsObserver} className={`flex justify-center ${!songsDataLoaded ? "hidden" : ""}`}>
        <Spinner className="!border-[3px] !p-2" />
      </div>
		</>
	);
}
