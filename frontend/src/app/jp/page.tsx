import { createTranslator, I18nPage } from "../page";
import jp from "../../../public/locales/jp.json";

export default function JpPage() {
  return <I18nPage t={createTranslator(jp)} />;
}
