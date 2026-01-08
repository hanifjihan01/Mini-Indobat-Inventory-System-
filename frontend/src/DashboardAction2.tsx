"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import AddOrderModal from "./components/add-module-order-modal";

export default function DashboardActions2() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSuccess = (message: string) => {
    toast.success(message);
    handleClose();
  };

  return (
    <>
      {/* Toaster selalu ada di root client */}
      <Toaster position="top-right" />

      <button
        onClick={handleOpen}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition"
      >
        + Tambah Order
      </button>

      {open && (
        <AddOrderModal
          onClose={handleClose}
          onSuccess={handleSuccess} // <- kita kirim callback ke modal
        />
      )}
    </>
  );
}
