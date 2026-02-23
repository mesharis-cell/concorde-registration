import { Suspense } from "react";
import { DynamicStepForm } from "@/components";

export default function Home() {
  return (
    <Suspense fallback={null}>
      <DynamicStepForm />
    </Suspense>
  );
}
