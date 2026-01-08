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

/* ===== Helper Functions ===== */

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
