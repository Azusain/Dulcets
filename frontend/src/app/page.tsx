import DsNavigation from "@/components/navigation";
import { redirect } from "next/navigation";
import "../app/global.css";

interface HomePageInterface {
  t: (key: string) => string;
}

export default function HomePage() {
  redirect("/jp");
}

export function I18nPage({ t }: HomePageInterface) {
  return (
    <div>
      <DsNavigation />
    </div>
  );
}

export function createTranslator(translations: Record<string, string>) {
  return (key: string) => translations[key] || key;
}
