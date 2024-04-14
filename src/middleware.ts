import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
	publicRoutes: ["/", "/home", "/api"],
	ignoredRoutes: ["/favicon.ico"],
	afterAuth(auth, req, evt) {
		// Handle users who aren't authenticated
		if (!auth.userId && !auth.isPublicRoute) {
			return redirectToSignIn({ returnBackUrl: req.url });
		}

		// If the user is signed in and trying to access a protected route, allow them to access route
		if (auth.userId && !auth.isPublicRoute) {
			return NextResponse.next();
		}
		// Allow users visiting public routes to access them
		return NextResponse.next();
	},
});

export const config = {
	matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
