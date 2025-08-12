import { CreateTranslator } from "@/utils/translator";
import { MainPage } from "../page";
import zh from "../../../public/locales/zh.json";

export default function ZhPage() {
  return <MainPage t={CreateTranslator(zh)} />;
}
