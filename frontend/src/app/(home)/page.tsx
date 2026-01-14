


import PaymentsOverview from "@/components/Charts/payments-overview";
import WeeksProfit from "@/components/Charts/weeks-profit";
import TopChannels from "@/components/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/Tables/top-channels/skeleton";
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { Suspense } from "react";
import DashboardActions from "@/DashboardAction";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import DashboardActions2 from "@/DashboardAction2";
import RecentOrdersTable from "@/components/Tables/recents-order/recents-order-table";


type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Home({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  return (
    <>
      {/* Toaster selalu ada di page root */}
    

      <Suspense fallback={<OverviewCardsSkeleton />}>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 xl:col-span-8">
            <OverviewCardsGroup />
          </div>

          {/* AREA YANG DILINGKARI */}
          <div className="col-span-12 xl:col-span-2 flex items-start justify-end">
      <DashboardActions /> {/* <- komponen client wrapper */}
    </div>
    <div className="col-span-12 xl:col-span-2 flex items-start justify-end">
      <DashboardActions2 /> {/* <- komponen client wrapper */}
    </div>

        </div>
      </Suspense>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
  {/* BARIS 1 */}
  <PaymentsOverview
    className="col-span-12 xl:col-span-7"
    key={extractTimeFrame("payments_overview")}
    timeFrame={extractTimeFrame("payments_overview")?.split(":")[1]}
  />

  <WeeksProfit
    key={extractTimeFrame("weeks_profit")}
    timeFrame={extractTimeFrame("weeks_profit")?.split(":")[1]}
    className="col-span-12 xl:col-span-5"
  />

  {/* BARIS 2 */}
{/* BARIS 2 */}
<div className="col-span-12 xl:col-span-7 flex">
  <Suspense fallback={<TopChannelsSkeleton />}>
    <TopChannels className="h-full w-full" />
  </Suspense>
</div>

<div className="col-span-12 xl:col-span-5 flex">
  <RecentOrdersTable className="h-full w-full" />
</div>

</div>

    </>
  );
}
