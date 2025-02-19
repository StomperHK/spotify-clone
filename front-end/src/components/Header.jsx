import { Link } from "react-router";

import spotifyLogo from "/spotify-logo.png";

export function Header() {
	return (
		<header className="flex mb-8 justify-between items-center">
			<Link to="/">
				<img src={spotifyLogo} alt="spotify logo" />
			</Link>

			<h1 className="text-2xl font-semibold">Spotify</h1>
		</header>
	);
}
