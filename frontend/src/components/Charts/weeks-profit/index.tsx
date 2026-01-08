"use client";

import { cn } from "@/lib/utils";
import { getProducts, ProductType } from "@/api/products.services";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

type PropsType = {
  className?: string;
  timeFrame?: string;
};

const WeeksProfitChart = dynamic(() => import("./chart"), { ssr: false });

export default function WeeksProfit({ className, timeFrame }: PropsType) {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const chartData = {
    stock: products.map(p => ({ x: p.name, y: p.stock })),
    price: products.map(p => ({ x: p.name, y: p.price })),
  };

  return (
    <div
      className={cn(
        "rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
          Stock vs Price per Product {timeFrame ? `(${timeFrame})` : ""}
        </h2>
      </div>

      <WeeksProfitChart data={chartData} />
    </div>
  );
}
