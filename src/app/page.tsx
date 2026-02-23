import { Suspense } from "react";
import { chivasLoudMedium, chivasLuxRegular } from "@/fonts";
import { Container, Footer, MicroLogo, Landing } from "@/components";

export default function Home() {
  return (
    <Container>
      <div className="relative flex min-h-screen flex-col py-2 md:py-4">
        <div className="mt-auto flex flex-col items-center justify-center">
          <div className="mx-auto flex w-full flex-col items-center justify-center py-4">
            <MicroLogo dark />
            <div className="pt-14 text-center">
              <h1 className={`text-5xl uppercase ${chivasLuxRegular.className}`}>WELCOME</h1>
            </div>
          </div>
          <Suspense fallback={null}>
            <Landing />
          </Suspense>
        </div>
        <Footer className="mt-auto" />
      </div>
    </Container>
  );
}
