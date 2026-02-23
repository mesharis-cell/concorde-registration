import Link from "next/link";
import { classNames } from "@/utils";
import { Container } from "@/components";

export default function NotFound() {
  return (
    <Container>
      <div className="flex h-dvh flex-col items-center justify-center">
        <p className="text-4xl font-extrabold">404</p>
        <h1 className={classNames("mt-3 text-3xl uppercase")}>Page not found</h1>
        <div className="mt-5 flex items-center gap-3">
          <Link href="/">
            <button className="rounded-lg py-1 font-bold capitalize">
              <span>Go back home</span>
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
