"use client";

import { useState } from "react";

type Props = {
  onClose: () => void;
  onSuccess: (message: string) => void; // tambahkan ini
};

export default function AddProductModal({ onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState<number>(0);
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, stock, price: Number(price) }),
      });

      const data = await res.json();

      if (res.ok) {
        // PANGGIL CALLBACK DARI PARENT
        onSuccess("Produk berhasil ditambahkan!");
        setName("");
        setStock(0);
        setPrice("");
      } else {
        alert(data.message || "Gagal menambahkan produk");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menambahkan produk");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tambah Produk</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
            ✕
          </button>
        </div>

        <form className="space-y-3" onSubmit={handleCreateProduct}>
          <div>
            <label className="block text-sm font-medium">Nama Produk</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Harga</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary p-2 text-white hover:bg-primary-dark disabled:opacity-60"
          >
            {loading ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </form>
      </div>
    </div>
  );
}
