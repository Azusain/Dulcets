"use client";
import { MainPage } from "@/components/MainPage";
import { CreateTranslator } from "@/utils/translator";
import jp from "../../../public/locales/jp.json";

export default function JpPage() {
  const t = CreateTranslator(jp);
  return <MainPage t={t} />;
}
