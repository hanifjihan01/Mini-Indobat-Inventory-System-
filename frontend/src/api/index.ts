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

export async function deleteProduct(id: number) {
  const res = await fetch(`http://localhost:8080/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete product");
  }

  return res.json();
}
