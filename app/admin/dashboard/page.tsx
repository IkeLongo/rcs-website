// app/admin/dashboard/page.tsx
'use client';

import { Card, CardBody, Tabs, Tab} from "@heroui/react";
import { Button } from "@heroui/react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import PieChartCard from "@/app/ui/charts/pie-chart-card";

// Dummy data for pie chart
const data = [
  { name: "Free", value: 40 },
  { name: "Hosting", value: 35 },
  { name: "Full Plan", value: 25 },
];

export default function Page() {
  return (
    <main className="space-y-8">
      <h1 className="mb-4 text-xl md:text-2xl font-bold">Admin Dashboard</h1>

      {/* Current Plan */}
      <Card>
        <CardBody className="p-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Current Plan: Free</h2>
            <p className="text-sm text-gray-600">Upgrade to unlock full features</p>
          </div>
          <Button>Upgrade Plan</Button>
        </CardBody>
      </Card>

      {/* Analytics Pie Chart */}
      <Card>
        <CardBody className="p-4">
          <h2 className="text-lg font-semibold mb-4">Website Analytics</h2>
          <PieChartCard />
        </CardBody>
      </Card>

      {/* Quick Actions and Activity Log */}
      <div className="flex w-full flex-col">
      <Tabs aria-label="Dashboard Tabs">
        <Tab key="quick-actions" title="Quick Actions">
          <Card>
            <CardBody>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <Button variant="bordered">Edit Homepage Text</Button>
                <Button variant="bordered">Upload New Blog</Button>
                <Button variant="bordered">Submit Work Request</Button>
                <Button variant="bordered">View Invoices</Button>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="activity-log" title="Activity Log">
          <Card>
            <CardBody>
              <ul className="space-y-2 text-sm">
                <li>✅ Edited About Us page - 2 days ago</li>
                <li>🔔 Hosting plan expires in 10 days</li>
                <li>📥 Submitted a ticket for new gallery images</li>
              </ul>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>

      {/* Locked Feature Notice */}
      <Card>
        <CardBody className="p-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              SEO Tools <LockClosedIcon />
            </h2>
            <p className="text-sm text-gray-600">
              Upgrade to unlock SEO insights and reports.
            </p>
          </div>
          <Button variant="bordered">Learn More</Button>
        </CardBody>
      </Card>
    </main>
  );
}
