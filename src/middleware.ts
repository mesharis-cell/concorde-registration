import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function middleware(_req: NextRequest) {
  // Registration-only app - no protection needed since confirmation page is static
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"]
};
