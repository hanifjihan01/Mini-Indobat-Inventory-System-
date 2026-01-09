"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { standardFormat } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import EditProductModal from "../edit-product-modal";
import { deleteProduct } from "@/api";
import { toastSuccess, toastError, confirmDelete } from "@/lib/swalToast";
import { useRouter } from "next/navigation";

type Product = {
  ID: number;
  name: string;
  stock: number;
  price: number;
};

type Props = {
  data: Product[];
  className?: string;
};

export default function ProductsTableClient({ data, className }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();


  return (
    <>
      <div
        className={cn(
          "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark ",
          className
        )}
      >
        <h2 className="mb-4 text-body-2xlg font-bold">Products</h2>

        <Table>
          <TableHeader>
            <TableRow className="uppercase [&>th]:text-center">
              <TableHead>Nama</TableHead>
              <TableHead className="!text-right">Harga</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((product) => (
              <TableRow key={product.ID} className="text-center">
                <TableCell>{product.name}</TableCell>

                <TableCell className="!text-right text-green-600">
                  Rp {standardFormat(product.price)}
                </TableCell>

                <TableCell>{product.stock}</TableCell>

                <TableCell>
                  Rp {standardFormat(product.price * product.stock)}
                </TableCell>

                <TableCell>
                  <div className="flex justify-center gap-2">
                    {/* EDIT */}
                    {/* <button
                      onClick={() => setSelectedProduct(product)}
                      className="rounded-md bg-blue-500 p-2 text-white"
                    >
                      <FiEdit size={16} />
                    </button> */}

                    {/* DELETE */}
                    <button
  onClick={() =>
    confirmDelete(
      async () => {
        try {
          await deleteProduct(product.ID);

          toastSuccess("Product deleted successfully");

          // 🔔 trigger chart & client components refresh
          window.dispatchEvent(new Event("products-updated"));

          router.refresh(); // refresh server components
        } catch (error: any) {
          toastError(error.message || "Failed to delete product");
        }
      },
      {
        title: "Delete Product?",
        text: `Product "${product.name}" will be permanently deleted.`,
        successMessage: "Product has been deleted.",
      }
    )
  }
  className="rounded-md bg-red-500 p-2 text-white"
>
  <FiTrash2 size={16} />
</button>

                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MODAL DI LUAR TABLE */}
      {selectedProduct && (
        <EditProductModal
          product={{
            id: selectedProduct.ID,
            name: selectedProduct.name,
            stock: selectedProduct.stock,
            price: selectedProduct.price,
          }}
          onClose={() => setSelectedProduct(null)}
          onSuccess={(msg) => {
            toastSuccess(msg);
            setSelectedProduct(null); // tutup modal
          }}
          onError={(msg) => {
            toastError(msg);
          }}
        />
      )}
    </>
  );
}
