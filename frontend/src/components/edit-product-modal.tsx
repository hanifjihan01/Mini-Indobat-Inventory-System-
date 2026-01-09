"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  stock: number;
  price: number;
};

type Props = {
  product: Product;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void; 
};

export default function EditProductModal({
  product,
  onClose,
  onSuccess,
  onError,
}: Props) {
  const router = useRouter();

  const [name, setName] = useState(product.name);
  const [stock, setStock] = useState<number>(product.stock);
  const [price, setPrice] = useState<string>(String(product.price));
  const [loading, setLoading] = useState(false);

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8080/products/${product.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            stock,
            price: Number(price),
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        onSuccess("Produk berhasil diperbarui!");
        window.dispatchEvent(new Event("products-updated"));
        router.refresh();
        onClose();
      } else {
        onError(data.message || "Gagal mengupdate produk");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengupdate produk");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-blue/20">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Edit Produk
          </h3>
          <button
            onClick={onClose}
            className="text-xl font-bold text-black/80 hover:text-black/50 dark:text-white"
          >
            ✕
          </button>
        </div>

        <form className="space-y-3" onSubmit={handleUpdateProduct}>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">
              Nama Produk
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-md border p-2 text-black/90 dark:bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white">
              Stock
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
              className="mt-1 w-full rounded-md border p-2 text-black/90 dark:bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white">
              Harga
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 w-full rounded-md border p-2 text-black/90 dark:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary p-2 font-bold tracking-wide
                       text-black/80 hover:bg-primary-dark
                       disabled:opacity-60 dark:text-white"
          >
            {loading ? "Menyimpan..." : "Update Produk"}
          </button>
        </form>
      </div>
    </div>
  );
}
