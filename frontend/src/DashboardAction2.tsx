"use client";

import { useState } from "react";
import { toastSuccess, toastError } from "@/lib/swalToast";
import AddOrderModal from "./components/add-module-order-modal";

export default function DashboardActions() {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    toastSuccess("Produk berhasil ditambahkan!");
  };
  
  const handleFailed = () => {
    toastError("Gagal menambahkan produk!");
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white"
      >
        + Tambah Order
      </button>

      {open && (
        <AddOrderModal
          onClose={() => setOpen(false)}
          onSuccess={handleSuccess}
          onError={handleFailed}
        />
      )}
    </>
  );
}
