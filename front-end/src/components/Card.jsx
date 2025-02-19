import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export function Card({ image, name, label, href }) {
	return (
		<li className="cursor-pointer max-w-[300px] min-w-[180px] p-4 group/card transition-colors rounded-lg pointer [scroll-snap-align:start] hover:bg-green-300/15 max-sm:min-w-[150px]">
			<figure>
				<div className="relative">
					<Link to={href}>
						<img
							src={image}
							alt={name + " imagem"}
							loading="lazy"
							className="mb-3 w-full aspect-square rounded-full object-cover"
						/>
					</Link>
					<div className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-green-500 absolute right-0 -bottom-0 translate-y-4  opacity-0 transition-opacity-transform group-hover/card:-translate-y-6 group-hover/card:opacity-100 group-active/card:-translate-y-6 group-active/card:opacity-100">
						<FontAwesomeIcon icon="fa-solid fa-play" className="text-2xl translate-x-0.5" />
					</div>
				</div>

				<figcaption>
					<Link to={href}>
						<h2 className="mb-1 text-ellipsis line-clamp-2 group-hover/card:line-clamp-none ">{name}</h2>
					</Link>
					{Boolean(label) && <p className="text-gray-300">{label}</p>}
				</figcaption>
			</figure>
		</li>
	);
}
