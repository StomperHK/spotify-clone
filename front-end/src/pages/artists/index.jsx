import { MainCatalogue } from "../../components/MainCatalogue";
import { ItemsList } from "../../components/ItemsList";

export function Artists() {
	return (
		<MainCatalogue>
			<ItemsList title="Artistas Populares" type="artists" layout="column" />
		</MainCatalogue>
	);
}
