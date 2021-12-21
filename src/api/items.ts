import { ProductItemType } from "../App";

export const fetchItems = async (): Promise<ProductItemType[]> => {
  const fetchedObject = await fetch("products.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const objectToJson = await fetchedObject.json();

  return objectToJson.items;
};
