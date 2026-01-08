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

import { getProducts, ProductType } from "@/api/products.services";

export default async function TopChannels({ className }: { className?: string }) {
  const data: ProductType[] = await getProducts();

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Products
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            <TableHead>Nama Product</TableHead>
            <TableHead className="!text-right">Harga</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Total Harga</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((product) => (
            <TableRow
              className="text-center text-base font-medium text-dark dark:text-white"
              key={product.ID}
            >
              <TableCell>{product.name}</TableCell>
              <TableCell className="!text-right text-green-light-1">
                Rp {standardFormat(product.price)}
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                Rp {standardFormat(product.price * product.stock)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
