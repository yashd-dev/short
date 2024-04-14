import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

const inter = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Short",
	description: "A Simple URL Shortner",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider
			appearance={{
				baseTheme: neobrutalism,
				variables: {
					colorPrimary: "rgb(243, 139, 163)",
				},
			}}
		>
			<html lang="en">
				<body
					className={`${inter.className} bg-background text-text w-full min-h-screen px-3 md:px-0`}
				>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
