type ProductInfoProps = {
  id: number;
  name: string;
  price: number;
  available: boolean;
  weight?: number;
  options?: {
    color?: string[];
    quantity?: number;
    storage?: string[];
    power: number[];
  }[];
};

const Product = (props: ProductInfoProps) => {
  return <></>;
};

export default Product;
