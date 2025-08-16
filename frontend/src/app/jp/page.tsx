import { MainPage } from "@/components/MainPage";

const jp = require("../../../public/locales/jp.json");

export default function JpPage() {
  return <MainPage translations={jp} />;
}
