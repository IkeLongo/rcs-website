"use client";

import dynamic from "next/dynamic";
import { Card, CardBody } from "@heroui/react";

const RechartsPie = dynamic(() => import("./recharts-pie"), {
  ssr: false,
  loading: () => (
    <div className="h-[200px] w-[250px] flex items-center justify-center text-sm opacity-70">
      Loading chart…
    </div>
  ),
});

const data = [
  { name: "Free", value: 40 },
  { name: "Hosting", value: 35 },
  { name: "Full Plan", value: 25 },
];

export default function PieChartCard() {
  return (
    <Card>
      <CardBody className="p-4">
        <h2 className="text-lg font-semibold mb-4">Website Analytics</h2>
        <RechartsPie data={data} />
      </CardBody>
    </Card>
  );
}
