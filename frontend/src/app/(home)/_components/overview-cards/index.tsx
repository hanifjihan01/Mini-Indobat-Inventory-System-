// src/components/OverviewCards/index.tsx
import { formatRupiah } from "@/lib/format-number";
import { getOverviewData } from "@/api/index";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export async function OverviewCardsGroup() {
  const { views, profit, products } = await getOverviewData();

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <OverviewCard
        label="Total Harga"
        data={{ value: formatRupiah(views.value) }}
        Icon={icons.Views}
      />

      <OverviewCard
        label="Total Stock"
        data={profit}
        Icon={icons.Profit}
      />
      <OverviewCard
        label="Total Products"
        data={products}
        Icon={icons.Product}
      />
    </div>
  );
}
