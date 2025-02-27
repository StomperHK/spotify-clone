import { useState, useEffect } from "react";
import { api } from "../lib/api.js";

export function useFetchItemsData(pathToFetch) {
	const [itemsData, setItemsData] = useState([]);
  const [path, setPath] = useState(pathToFetch)

	useEffect(() => {
		async function fetchItemsdata() {
      if (!path) return

      const data = (await api.get("/" + path.replaceAll(" ", "%20"))).data

			setItemsData([...itemsData, ...data]);
		}

		fetchItemsdata();
	}, [path]);

	return [itemsData, setPath];
}
