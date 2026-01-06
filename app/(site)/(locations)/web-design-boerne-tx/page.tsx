// app/(site)/(locations)/web-design-boerne-tx/page.tsx
import LocationTemplate from "../_locations/location-template";
import { getLocationPage } from "../_locations/locations.data";

export const dynamic = "force-static";

export default function Page() {
  const page = getLocationPage("web-design-boerne-tx");
  return <LocationTemplate page={page} />;
}

export const metadata = (() => {
  const page = getLocationPage("web-design-boerne-tx");
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.slug },
  };
})();
