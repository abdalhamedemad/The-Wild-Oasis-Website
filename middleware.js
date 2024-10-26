/* 
// redirect code
import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.redirect(new URL("/about", request.url));
}

export const config = {
  // this middleware will be applied those specified
  // routes only
  matcher: ["/account"],
};
*/
import { auth } from "@/app/_lib/auth";
export const middleware = auth;
export const config = {
  // this middleware will be applied those specified
  // routes only
  matcher: ["/account"],
};
