"use client";
import { CreateTranslator } from "@/utils/translator";
import { MainPage } from "@/components/MainPage";
import en from "../../../public/locales/en.json";

export default function EnPage() {
  const t = CreateTranslator(en);
  return <MainPage t={t} />;
}
