import { SongPlayerControls } from "./SongPlayerControls";
import { SongTitle } from "./SongTitle";
import { Spinner } from "../../components/Spinner";

export function SongPlayer({ songData, songLoaded }) {
  const { image, name, duration, artist, audio, prevSongId, nextSongId } = songData
  
	return (
		<div className="flex items-center py-4 h-full">
			{songLoaded ? (
				<div className="flex w-full h-full justify-between items-center max-md:flex-col">
					<div className="flex items-center gap-2 h-full">
						<img src={image} alt="" className="w-14 aspect-square rounded-md max-md:hidden" />
						<SongTitle title={name} label={artist} breakpoint="min-xl:hidden" />
					</div>

					<SongPlayerControls audio={audio} duration={duration} prevSongId={prevSongId} nextSongId={nextSongId} />

					<SongTitle title={name} label={artist} breakpoint="max-xl:hidden" />
				</div>
			) : (
				<div className="flex justify-center w-full"><Spinner className="!border-3 !p-3" /></div>
			)}
		</div>
	);
}
