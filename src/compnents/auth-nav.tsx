import { UserButton } from "@clerk/nextjs";
export default function AuthNavbar() {
	return (
		<nav className="sticky top-4 z-50 w-full mx-auto flex max-w-xl items-center justify-between gap-x-6 p-3 lg:px-8 border-4 border-black bg-inherit/30 backdrop-blur-lg -mb-14 bg-black">
			<a
				href="/"
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
			<UserButton></UserButton>
		</nav>
	);
}
