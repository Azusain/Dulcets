import { MainPage } from "@/components/MainPage";
import DynamicTitle from "@/components/DynamicTitle";
import jp from "../../public/locales/jp.json";

export default function HomePage() {
  return (
    <>
      <DynamicTitle page="home" />
      <MainPage translations={jp} />
    </>
  );
}
