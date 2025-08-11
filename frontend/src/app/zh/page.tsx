import zh from "../../../public/locales/zh.json";
import { createTranslator, I18nPage } from "../page";

export default function ZhPage() {
  return <I18nPage t={createTranslator(zh)} />;
}
