import { ProductItemType } from "../App";

export const fetchItems = async (): Promise<ProductItemType[]> => {
  const fetchedObject = await (
    await fetch("products.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
  ).json();

  return fetchedObject.items;
};
