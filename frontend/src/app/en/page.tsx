import { MainPage } from "@/components/MainPage";
import TitleUpdater from "@/components/TitleUpdater";
import en from "../../../public/locales/en.json";

export default function EnPage() {
  return (
    <>
      <TitleUpdater page="home" />
      <MainPage translations={en} />
    </>
  );
}
