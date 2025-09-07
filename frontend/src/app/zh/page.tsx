import { MainPage } from "@/components/MainPage";
import TitleUpdater from "@/components/TitleUpdater";
import zh from "../../../public/locales/zh.json";

export default function ZhPage() {
  return (
    <>
      <TitleUpdater page="home" />
      <MainPage translations={zh} />
    </>
  );
}
