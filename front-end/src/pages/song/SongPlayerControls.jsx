import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import PropTypes, { func } from "prop-types";


function handleTimeUpdate(setCurrentTime, audioPlayer) {
  setCurrentTime(audioPlayer.currentTime)
}

export function SongPlayerControls({ audio, duration, prevSongId, nextSongId }) {
	const [playerState, setPlayerState] = useState("paused");
	const [currentTime, setCurrentTime] = useState(0);
	const audioPlayer = useRef(new Audio(audio)).current;
	const playerIsPaused = playerState === "paused";
	const durationInSeconds = convertDurationToSeconds(duration);

	useEffect(() => {
    function destroyAudioPlayer() {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      audioPlayer.removeEventListener("timeupdate", handleTimeUpdate);
    }

		audioPlayer.addEventListener("timeupdate", () => handleTimeUpdate(setCurrentTime, audioPlayer));

		return destroyAudioPlayer;
	}, [audioPlayer]);

  function handleTimeUpdate(setCurrentTime, audioPlayer) {
    setCurrentTime(audioPlayer.currentTime)
  }

	function playSong() {
		audioPlayer.play();
		setPlayerState("playing");
	}

	function stopSong() {
		audioPlayer.pause();
		setPlayerState("paused");
	}

	function convertDurationToSeconds(timestamp) {
		const [minutes, seconds] = timestamp.split(":");

		return Number(minutes) * 60 + Number(seconds);
	}

  function formatMinutes(time) {Math.floor
    return String(parseInt(Math.floor(time / 60))).padStart(2, "0")
  }

  function formatSeconds(time) {
    return String(parseInt(time % 60)).padStart(2, "0")
  }

	return (
		<div className="w-[60%] max-w-[500px] min-xl:absolute min-xl:left-[50%] min-xl:-translate-x-[50%]">
			<div className="flex gap-3 mb-3 justify-center items-center text-2xl">
				<Link to={`/song/${prevSongId}`} aria-disabled={Boolean(prevSongId)} className={!prevSongId ? "pointer-events-none opacity-60" : ""}>
					<FontAwesomeIcon icon="fa-solid fa-backward-step" className="text-xl max-md:text-3xl" />
				</Link>
				<button onClick={playerIsPaused ? playSong : stopSong}>
					{playerIsPaused ? <FontAwesomeIcon icon="fa-solid fa-circle-play" className="text-2xl max-md:text-4xl" /> : <FontAwesomeIcon icon="fa-solid fa-circle-pause max-md:text-4xl" />}
				</button>
				<Link to={`/song/${nextSongId}`} aria-disabled={Boolean(nextSongId)} className={!nextSongId ? "pointer-events-none opacity-60" : ""}>
					<FontAwesomeIcon icon="fa-solid fa-forward-step" className="text-xl max-md:text-3xl" />
				</Link>
			</div>

			<div className="flex items-center gap-2">
				<span>
					{formatMinutes((currentTime))}:{formatSeconds(currentTime)}
				</span>
				<ProgressBar currentTime={currentTime} durationInSeconds={durationInSeconds} />
				<span>{duration}</span>
			</div>
		</div>
	);
}

function ProgressBar({ currentTime, durationInSeconds }) {
	let currentProgressPercentage = (currentTime / durationInSeconds) * 100 + "%";

	return (
		<div className="h-1 w-full bg-zinc-800">
			<div className={`h-full bg-white`} style={{ width: currentProgressPercentage }}></div>
		</div>
	);
}

SongPlayerControls.propTypes = {
  audio: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  prevSongId: PropTypes.string,
  nextSongId: PropTypes.string,
};

ProgressBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  durationInSeconds: PropTypes.number.isRequired,
};
