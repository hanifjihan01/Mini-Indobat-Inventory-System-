import { getProducts, ProductType } from "@/api/products.services";
import ProductsTableClient from "../products-table-client";

type Props = {
  className?: string;
};

export default async function TopChannels({ className }: Props) {
  const data: ProductType[] = await getProducts();

  return <ProductsTableClient data={data} className={className} />;
}
