"use client";

import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

/* ===== Toast Helpers ===== */

export const toastSuccess = (message: string) => {
  Toast.fire({
    icon: "success",
    title: message,
  });
};

export const toastError = (message: string) => {
  Toast.fire({
    icon: "error",
    title: message,
  });
};

export const toastWarning = (message: string) => {
  Toast.fire({
    icon: "warning",
    title: message,
  });
};

export const toastInfo = (message: string) => {
  Toast.fire({
    icon: "info",
    title: message,
  });
};

/* ===== Delete Confirmation ===== */

export const confirmDelete = async (
  onConfirm: () => Promise<void> | void,
  options?: {
    title?: string;
    text?: string;
    successMessage?: string;
  }
) => {
  const result = await Swal.fire({
    title: options?.title ?? "Are you sure?",
    text: options?.text ?? "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    await onConfirm();

    Swal.fire({
      title: "Deleted!",
      text: options?.successMessage ?? "Your data has been deleted.",
      icon: "success",
    });
  }
};
