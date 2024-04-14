import { UserButton } from "@clerk/nextjs";
export default function AuthNavbar() {
	return (
		<nav className="sticky top-4 z-50 w-full mx-auto flex max-w-5xl items-center justify-between gap-x-6 p-3 lg:px-8 border-4 border-black bg-inherit/30 backdrop-blur-lg -mb-14">
			<a
				href="/dashboard"
				className="font-bold p-1 text-lg tracking-tight underline hover:no-underline hover:bg-pink"
			>
				Short
			</a>
			<a
				href="/"
				className="text-lg tracking-tight underline  p-1 hover:no-underline hover:bg-pink"
			>
				{" "}
				Docs
			</a>
			<a
				href="/dashboard/links"
				className="text-lg tracking-tight underline  p-1 hover:no-underline hover:bg-pink"
			>
				Your Links
			</a>
			<UserButton></UserButton>
		</nav>
	);
}
