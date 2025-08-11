import { redirect } from "next/navigation";

interface HomePageInterface {
  t: (key: string) => string;
}

export default function HomePage() {
  redirect("/jp");
}

export function I18nPage({ t }: HomePageInterface) {
  return (
    <div>
      <h1>{t("about")}</h1>
    </div>
  );
}

export function createTranslator(translations: Record<string, string>) {
  return (key: string) => translations[key] || key;
}
