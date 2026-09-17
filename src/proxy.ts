import { clerkMiddleware } from "@clerk/nextjs/server";

// Resource-based auth (Clerk Core 3): no path checks here, 
// clerkMiddleware only provides auth context. Currently every route
// (/, /sign-in, /sign-up) is public. When /dashboard lands, protect
// each server resource with `await auth.protect()` and handle the
// signed-out UX with <Show>/<RedirectToSignIn>, per
// https://clerk.com/docs/guides/development/upgrading/upgrade-guides/migrate-from-create-route-matcher
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
