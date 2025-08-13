import { CreateTranslator } from "@/utils/translator";
import { MainPage } from "@/components/MainPage";
import zh from "../../../public/locales/zh.json";

export default function ZhPage() {
  return <MainPage translations={zh} />;
}
