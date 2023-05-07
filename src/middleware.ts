import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.REDIS_URL as string,
  token: process.env.REDIS_SECRET as string,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "1 h"),
});

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const pathname = req.nextUrl.pathname; // relative path

    // Manage rate limiting
    if (pathname.startsWith("/api")) {
      const ip = req.ip ?? "127.0.0.1";
      try {
        const { success } = await ratelimit.limit(ip);

        if (!success) return NextResponse.json({ error: "Too Many Requests" });
        return NextResponse.next();
      } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" });
      }
    }

    // Manage route protection
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = pathname.startsWith("/login");

    // If user is authenticated and accessing login page, redirect to dashboard
    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }

      return null;
    }

    // If user is not authenticated and accessing sensitive page, redirect to login
    const sensitiveRoutes = ["/dashboard"];
    if (
      !isAuth &&
      sensitiveRoutes.some((route) => pathname.startsWith(route))
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages. 
        // We return true here so that the middleware function above
        // is always called.
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/api/:path*"],
};
