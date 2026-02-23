import { Suspense } from "react";
import CheckInScanner from "@/components/section/check-in-scanner";

export default function ScannerPage() {
  return (
    <Suspense fallback={null}>
      <CheckInScanner />
    </Suspense>
  );
}
