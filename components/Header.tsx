import { getAreas, getResources, getServices } from "@/lib/queries";
import { HeaderClient, type NavArea, type NavResource, type NavService } from "./HeaderClient";

const GROUPS: Record<string, string> = {
  "grey-structure": "Construction",
  turnkey: "Construction",
  "semi-finished": "Construction",
  "luxury-homes": "Construction",
  renovation: "Construction",
  "smart-sustainable": "Construction",
  "design-engineering": "Design & Engineering",
  "property-management": "Property Support",
};

export function Header() {
  const services: NavService[] = getServices().map((s) => ({
    slug: s.slug,
    title: s.title,
    group: GROUPS[s.slug] ?? "Construction",
  }));

  const areas: NavArea[] = getAreas().map((a) => ({
    slug: a.slug,
    name: a.name,
    city: a.city,
  }));

  const resources: NavResource[] = getResources().map((r) => ({
    slug: r.slug,
    title: r.title,
    category: r.category,
  }));

  return <HeaderClient services={services} areas={areas} resources={resources} />;
}
