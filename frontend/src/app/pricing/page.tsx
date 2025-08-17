import PricingPage from "@/components/PricingPage";
import jp from "../../../public/locales/jp.json";

export default function Pricing() {
  return <PricingPage translations={jp} showTitle={false} />;
}
