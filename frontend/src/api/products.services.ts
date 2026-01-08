// src/services/products.services.ts
export type ProductType = {
    ID: number;
    name: string;
    stock: number;
    price: number;
  };
  
  export async function getProducts(): Promise<ProductType[]> {
    const res = await fetch("http://localhost:8080/products");
    const data = await res.json();
    return data.data; // sesuai struktur API yang kamu kasih
  }
  