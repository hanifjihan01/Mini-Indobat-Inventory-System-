import { PaymentsOverviewChart } from "./chart";
import { getProducts, ProductType } from "@/api/products.services";

export const dynamic = "force-dynamic"; // supaya fetch API selalu fresh

type PaymentsOverviewProps = {
  className?: string;
  timeFrame?: string;
};

export default async function PaymentsOverview({ className }: PaymentsOverviewProps) {

  const products: ProductType[] = await getProducts();

  // Data untuk chart
  const data = {
    received: products.map(p => ({ x: p.name, y: p.stock })),
    due: products.map(p => ({ x: p.name, y: p.stock * p.price })),
  };

  return (
    <div className={`rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card ${className}`}>
      <h2 className="text-2xl font-bold text-dark dark:text-white mb-4">Products Overview</h2>

      <PaymentsOverviewChart data={data} />
    </div>
  );
}
