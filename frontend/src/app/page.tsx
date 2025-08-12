import { redirect } from "next/navigation";
import "../app/global.css";

export interface HomePageInterface {
  t: (key: string) => string;
}

export default function HomePage() {
  redirect("/jp");
}

export function MainPage({ t }: HomePageInterface) {
  return <div></div>;
}
