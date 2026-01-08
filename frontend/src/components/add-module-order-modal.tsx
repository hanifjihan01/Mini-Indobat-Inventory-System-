"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Product = {
  id: number;
  name: string;
  price: number;
};

type AddOrderModalProps = {
  onClose: () => void;
  onSuccess: (message: string) => void;
};

export default function AddOrderModal({ onClose, onSuccess }: AddOrderModalProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [estimasiHarga, setEstimasiHarga] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch products dari API
  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then(res => res.json())
      .then(data => {
        // Pastikan data array
        const productsArray = Array.isArray(data) ? data : data.data;
        if (!Array.isArray(productsArray)) {
          toast.error("Format data produk salah");
          return;
        }
        setProducts(productsArray);
        if (productsArray.length > 0) setSelectedProductId(productsArray[0].id);
      })
      .catch(err => {
        console.error(err);
        toast.error("Gagal load data produk");
      });
  }, []);

  // Update estimasi harga real-time
  useEffect(() => {
    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;
    const total = product.price * quantity * (1 - discount / 100);
    setEstimasiHarga(total);
  }, [selectedProductId, quantity, discount, products]);

  const handleSubmit = async () => {
    if (!selectedProductId) return toast.error("Pilih produk dulu");
    if (quantity <= 0) return toast.error("Qty harus lebih dari 0");
    if (discount < 0 || discount > 100) return toast.error("Diskon harus antara 0-100%");

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
      // reset form
      setQuantity(1);
      setDiscount(0);
      setSelectedProductId(products.length > 0 ? products[0].id : null);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Tambah Order</h2>

        {/* Produk Dropdown */}
        <label className="block mb-2 font-medium">Pilih Obat</label>
        <select
          className="mb-4 w-full rounded border px-3 py-2"
          value={selectedProductId ?? ""}
          onChange={e => setSelectedProductId(Number(e.target.value))}
        >
          {products.map(product => (
            <option key={product.id} value={product.id}>
              {product.name} - Rp {product.price.toLocaleString()}
            </option>
          ))}
        </select>

        {/* Quantity */}
        <label className="block mb-2 font-medium">Qty</label>
        <input
          type="number"
          min={1}
          className="mb-4 w-full rounded border px-3 py-2"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
        />

        {/* Discount */}
        <label className="block mb-2 font-medium">Diskon (%)</label>
        <input
          type="number"
          min={0}
          max={100}
          className="mb-4 w-full rounded border px-3 py-2"
          value={discount}
          onChange={e => setDiscount(Number(e.target.value))}
        />

        {/* Estimasi Harga */}
        <div className="mb-4 text-right font-semibold">
          Estimasi Harga: Rp {estimasiHarga.toLocaleString()}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-100"
            onClick={onClose}
            disabled={loading}
          >
            Batal
          </button>
          <button
            className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
