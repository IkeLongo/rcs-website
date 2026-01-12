// app/admin/dashboard/websites/page.tsx
export const dynamic = "force-dynamic";

import {
  getWebsitesWithClientAndHost,
  getWebsiteStatusOptions,
 } from '@/app/utils/mysql_actions'; // adjust to your setup
import WebsitesTable from './websitestables';

export default async function Page() {
  const websites = await getWebsitesWithClientAndHost(); // DB query with joins
  const websiteStatusOptions = await getWebsiteStatusOptions(); // DB query for status options

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-left">Websites</h1>
      </div>

      <WebsitesTable websites={websites} websiteStatusOptions={websiteStatusOptions} />
    </div>
  );
}
