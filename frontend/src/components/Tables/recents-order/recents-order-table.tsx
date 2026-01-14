"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

/* =====================
   TYPES
===================== */

type OrderStatus = "Success" | "Pending" | "Diproses";

type RecentOrder = {
  order_code: string;
  product: string;
  status: OrderStatus;
  tanggal: string;
  total_price: number;
};

/* =====================
   STATUS STYLING
===================== */

const statusStyle: Record<OrderStatus, string> = {
  Success: "bg-green-100 text-green-700",
  Diproses: "bg-yellow-100 text-yellow-700",
  Pending: "bg-red-100 text-red-700",
};

/* =====================
   COMPONENT
===================== */

export default function RecentOrdersTable({
  className,
}: {
  className?: string;
}) {
  const [orders, setOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* =====================
     FETCH DATA
  ===================== */

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        setLoading(true);
  
        const res = await fetch("http://localhost:8080/orders/recent", {
          cache: "no-store",
        });
  
        if (!res.ok) throw new Error();
  
        const data: RecentOrder[] = await res.json();
        setOrders(data);
        setError(null);
      } catch {
        setError("Gagal mengambil data order");
      } finally {
        setLoading(false);
      }
    };
  
    // fetch pertama
    fetchRecentOrders();
  
    // listen dari modal
    const handleOrdersUpdated = () => {
      fetchRecentOrders();
    };
  
    window.addEventListener("orders-updated", handleOrdersUpdated);
  
    return () => {
      window.removeEventListener("orders-updated", handleOrdersUpdated);
    };
  }, []);
  

  /* =====================
     RENDER
  ===================== */

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark",
        className
      )}
    >
      <h2 className="text-body-2xlg font-bold mb-4">Recent Orders</h2>

      {/* SCROLL WRAPPER */}
      <div
        className={cn(
          "relative max-h-[360px] overflow-y-auto",
          "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
          "dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 "
        )}
      >
        <Table>
          {/* STICKY HEADER */}
          <TableHeader className="sticky top-0 z-10 bg-white dark:bg-gray-dark">
            <TableRow className="uppercase [&>th]:text-center">
              <TableHead>Order</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tanggal</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Loading */}
            {loading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {/* Error */}
            {!loading && error && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-red-500 py-6"
                >
                  {error}
                </TableCell>
              </TableRow>
            )}

            {/* Empty */}
            {!loading && !error && orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Tidak ada order
                </TableCell>
              </TableRow>
            )}

            {/* Data */}
            {!loading &&
              !error &&
              orders.map((order) => (
                <TableRow
                  key={order.order_code}
                  className="text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <TableCell className="font-medium">
                    {order.order_code}
                  </TableCell>

                  <TableCell>{order.product || "-"}</TableCell>

                  <TableCell>
                    <span
                      className={cn(
                        "inline-block rounded-full px-6 py-1 text-xs font-semibold",
                        statusStyle[order.status]
                      )}
                    >
                      {order.status}
                    </span>
                  </TableCell>

                  <TableCell>{order.tanggal}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
