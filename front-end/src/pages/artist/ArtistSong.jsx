import { Link } from "react-router";

export function ArtistSong({ image, name, duration, href }) {
	return (
		<li>
			<Link to={href}className="flex justify-between items-center p-2 rounded-sm transition-colors hover:bg-green-400/20">
				<div className="flex gap-4 items-center">
					<img src={image} alt="" className="w-12 h-12 bg-zinc-800 rounded-md" />
					<h4 className="line-clamp-1">{name}</h4>
				</div>
				<span>{duration}</span>
			</Link>
		</li>
	);
}
