// src/fetch/index.ts
import { getProducts, ProductType } from "./products.services";

export async function getOverviewData() {
  const products: ProductType[] = await getProducts();

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalPrice = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const totalProducts = products.length;

  return {
    views: { value: totalPrice },
    profit: { value: totalStock },
    products: { value: totalProducts },
  };
}
