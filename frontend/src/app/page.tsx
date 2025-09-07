import { MainPage } from "@/components/MainPage";
import TitleUpdater from "@/components/TitleUpdater";
import jp from "../../public/locales/jp.json";

export default function HomePage() {
  return (
    <>
      <TitleUpdater page="home" />
      <MainPage translations={jp} />
    </>
  );
}
