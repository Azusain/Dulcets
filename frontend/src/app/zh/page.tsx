"use client";
import { CreateTranslator } from "@/utils/translator";
import { MainPage } from "@/components/MainPage";
import zh from "../../../public/locales/zh.json";

export default function ZhPage() {
  const t = CreateTranslator(zh);
  return <MainPage t={t} />;
}
