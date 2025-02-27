import PropTypes from "prop-types";
import { Link, useLocation } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useFetchItemsData } from "../hooks/useFetchItemsData";
import { Card } from "./Card";
import { Spinner}  from "./Spinner";

export function ItemsList({ title, type, layout="row" }) {
	const isInHome = useLocation().pathname === "/";
	const [itemsData] = useFetchItemsData(`${type}${isInHome ? "?limit=6" : ""}`);
	const itemsDataLoaded = itemsData !== null;

	return (
		<section className="mb-12 custom-scrollbar">
			<div className="flex justify-between items-center mb-8">
				<h2>
					{title}
					{type === "artists" ? (
						<FontAwesomeIcon icon="fa-solid fa-microphone" className="ml-1.5" />
					) : (
						<FontAwesomeIcon icon="fa-solid fa-music" className="ml-1.5 text-" />
					)}
				</h2>

				{isInHome && (
					<Link to={type === "artists" ? "/artists" : "/songs"} className="text-zinc-300 cursor-pointer hover:text-white hover:underline">
						mostrar tudo
					</Link>
				)}
			</div>

			{itemsDataLoaded ? (
				<ul className={`${layout === "row" ? "flex [&>*]:w-full" : "grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"} gap-2.5 py-2 custom-scrollbar overflow-auto ${isInHome ? "overflow-auto [scroll-snap-type:x_mandatory]" : "flex-wrap"} max-md:grid-cols-[repeat(auto-fit,minmax(140px,1fr))]`}>
					{itemsData.map(({ _id, image, name }) => (
						<Card
							key={_id}
							image={image}
							name={name}
							label={type === "artists" ? "Artista" : "Música"}
							href={type === "artists" ? `/artist/${_id}` : `/song/${_id}`}
						/>
					))}
				</ul>
			) : (
				<div className="flex justify-center items-center h-[var(--items-list--height)]">
					<Spinner />
				</div>
			)}
		</section>
	);
}

ItemsList.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  layout: PropTypes.string,
};