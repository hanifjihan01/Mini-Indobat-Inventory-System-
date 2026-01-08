"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import AddModuleModal from "./add-module-modal";

export default function AddModuleButton() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleSuccess = (message: string) => {
    toast.success(message); // tampilkan toast
    handleClose(); // tutup modal setelah sukses
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
          w-full
          flex items-center justify-center gap-2
          rounded-xl
          bg-primary
          px-6 py-3
          text-sm font-semibold text-white
          shadow-sm
          hover:bg-primary/90
          transition
        "
      >
        + Tambah Order
      </button>

      {open && (
        <AddModuleModal
          onClose={handleClose}
          onSuccess={handleSuccess} // ← kirim callback ke modal
        />
      )}
    </>
  );
}
