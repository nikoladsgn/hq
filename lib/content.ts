import fs from "fs";
import path from "path";

export type Tier = {
  name: string;
  badge: string;
  qty: string;
  price: string;
  duration: string;
};

export type Category = {
  id: string;
  title: string;
  unit: string;
  notes: string[];
  tiers: Tier[];
};

export type TermSection = {
  id: string;
  title: string;
  items: string[];
};

export type SiteContent = {
  site: {
    brand: string;
    tagline: string;
    owner: string;
    year: string;
    whatsapp: string;
    instagram: string;
    tiktok?: string;
    lynk?: string;
    heroNote: string;
  };
  categories: Category[];
  terms: TermSection[];
};

const CONTENT_PATH = path.join(process.cwd(), "data", "content.json");

// Server-side read. Runs at request/build time from the file bundled with
// the deployment, so it always reflects the latest committed content.json.
export function getContent(): SiteContent {
  const raw = fs.readFileSync(CONTENT_PATH, "utf-8");
  return JSON.parse(raw) as SiteContent;
}
