"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function RechartsPie({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <div className="w-[250px] h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" outerRadius={80}>
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={["#8884d8", "#82ca9d", "#ffc658"][index]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
