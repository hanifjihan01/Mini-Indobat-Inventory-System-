"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
type Product = {
  id: number;
  name: string;
  price: number;
};

type AddOrderModalProps = {
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
};

export default function AddOrderModal({
  onClose,
  onSuccess,
  onError,
}: AddOrderModalProps) {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [estimasiHarga, setEstimasiHarga] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch products
  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => {
        const productsArray = Array.isArray(data) ? data : data.data;

        const mapped = productsArray.map((p: any) => ({
          id: p.ID,
          name: p.name,
          price: p.price,
        }));

        setProducts(mapped);
        if (mapped.length > 0) {
          setSelectedProductId(mapped[0].id);
        }
      })
      .catch(() => onError("Gagal load data produk"));
  }, []);

  // Estimasi harga
  useEffect(() => {
    const product = products.find((p) => p.id === selectedProductId);
    if (!product) return;

    const total = product.price * quantity * (1 - discount / 100);
    setEstimasiHarga(total);
  }, [selectedProductId, quantity, discount, products]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProductId) return onError("Pilih produk dulu");
    if (quantity <= 0) return onError("Qty harus lebih dari 0");
    if (discount < 0 || discount > 100)
      return onError("Diskon harus antara 0–100%");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: selectedProductId,
          quantity,
          discount_percent: discount,
        }),
      });

      if (!res.ok) throw new Error("Gagal menambah order");

      onSuccess("Order berhasil ditambahkan!");
      window.dispatchEvent(new Event("products-updated"));
      router.refresh();
      onClose();
      setQuantity(1);
      setDiscount(0);
    } catch (err: any) {
      onError(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl dark:bg-blue/20 p-6 shadow-lg bg-white">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold dark:text-white text-black">Tambah Order</h3>
          <button
            onClick={onClose}
            className="text-black/80 dark:text-white hover:text-black/50 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Produk */}
          <div>
            <label className="block text-sm font-medium dark:text-white text-black">Pilih Obat</label>
            <select
              className="mt-1 w-full rounded-md border p-2 dark:bg-white text-black/90"
              value={selectedProductId ?? ""}
              onChange={(e) => setSelectedProductId(Number(e.target.value))}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - Rp {product.price.toLocaleString()}
                </option>
              ))}
            </select>
          </div>

          {/* Qty */}
          <div>
            <label className="block text-sm font-medium dark:text-white text-black">Qty</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 w-full rounded-md border p-2 dark:bg-white text-black/90"
            />
          </div>

          {/* Diskon */}
          <div>
            <label className="block text-sm font-medium dark:text-white text-black">Diskon (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="t-1 w-full rounded-md border p-2 dark:bg-white text-black/90"
            />
          </div>

          {/* Estimasi */}
          <div className="block text-sm font-medium dark:text-white text-black">
            Estimasi Harga: Rp {estimasiHarga.toLocaleString()}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary p-2 text-black/80 dark:text-white 
             font-bold tracking-wide hover:bg-primary-dark 
             disabled:opacity-60"
          >
            {loading ? "Menyimpan..." : "Simpan Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
