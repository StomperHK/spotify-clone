import { useState, useEffect } from "react";
import { api } from "../lib/api";

export function useFetchItemData(type, query) {
  const [itemData, setItemData] = useState({})

  useEffect(() => {
    async function fetchItem() {
      const data = (await api.get(`/${type}${query.replaceAll(" ", "%20").replaceAll("&", "%26")}`)).data
      setItemData(data)
    }

    fetchItem()
  }, [type, query])

  return itemData
}