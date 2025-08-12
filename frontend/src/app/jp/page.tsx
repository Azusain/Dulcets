import { MainPage } from "../page";
import { CreateTranslator } from "@/utils/translator";
import jp from "../../../public/locales/jp.json";

export default function JpPage() {
  return <MainPage t={CreateTranslator(jp)} />;
}
