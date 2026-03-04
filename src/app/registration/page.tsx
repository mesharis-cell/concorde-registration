import { Suspense } from "react";
import { DynamicStepForm } from "@/components";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  return (
    <Suspense fallback={null}>
      <DynamicStepForm />
    </Suspense>
  );
}
