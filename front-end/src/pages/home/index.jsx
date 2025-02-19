import { ItemsList } from "../../components/ItemsList";
import { MainCatalogue } from "../../components/MainCatalogue";

export function Home() {
	return (
		<MainCatalogue>
			<ItemsList title="Artistas Populares" type="artists" />
			<ItemsList title="Músicas Populares" type="songs" />
			<div></div>
		</MainCatalogue>
	);
}
