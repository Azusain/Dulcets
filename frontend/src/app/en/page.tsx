import { CreateTranslator } from "@/utils/translator";
import { MainPage } from "../page";
import en from "../../../public/locales/en.json";

export default function EnPage() {
  return <MainPage t={CreateTranslator(en)} />;
}
