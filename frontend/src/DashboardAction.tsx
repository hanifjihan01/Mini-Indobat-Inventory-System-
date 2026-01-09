"use client";

import { useState } from "react";
import { Toast } from "@/lib/swalToast";
import AddProductModal from "./components/add-module-modal";

export default function DashboardActions() {
  const [open, setOpen] = useState(false);

  const handleSuccess = (message: string) => {
    Toast.fire({
      icon: "success",
      title: message,
    });
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-300 px-6 py-3 text-sm font-bold text-dark dark:text-white  "
      >
        + Tambah Product
      </button>

      {open && (
        <AddProductModal
          onClose={() => setOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}
