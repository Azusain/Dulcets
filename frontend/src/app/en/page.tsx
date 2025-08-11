import en from "../../../public/locales/en.json";
import { createTranslator, I18nPage } from "../page";

export default function EnPage() {
  return <I18nPage t={createTranslator(en)} />;
}
