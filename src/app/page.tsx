import { ITStorefront } from "@/components/ITStorefront";
import { categories } from "@/data/categories";
import { recentOrders } from "@/data/recentOrders";
import { quickActions } from "@/data/quickActions";
import { eligibilityData } from "@/data/eligibilityData";
import { hardwareData } from "@/data/hardwareData";

export default function Home() {
  return (
    <ITStorefront
      categories={categories}
      products={hardwareData}
      recentOrders={recentOrders}
      quickActions={quickActions}
      eligibilityData={eligibilityData}
    />
  );
} 