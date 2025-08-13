import { CreateTranslator } from "@/utils/translator";
import { MainPage } from "@/components/MainPage";
import en from "../../../public/locales/en.json";

export default function EnPage() {
  return <MainPage translations={en} />;
}
