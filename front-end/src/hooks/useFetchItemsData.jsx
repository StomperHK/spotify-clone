import { useState, useEffect } from "react";
import { api } from "../lib/api.js";

export function useFetchItemsData(type, query="") {
	const [itemsData, setItemsData] = useState(null);

	useEffect(() => {
		async function fetchItemsdata() {
      const data = (await api.get(`/${type}${query.replaceAll(" ", "%20").replaceAll("&", "%26")}`)).data
      
			setItemsData(data);
		}

		fetchItemsdata();
	}, [type, query]);

	return itemsData;
}
