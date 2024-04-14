import Navbar from "@/compnents/nav";
export default function Home() {
	return (
		<>
			<nav className="sticky top-4 z-50 w-full mx-auto flex max-w-xl items-center justify-between gap-x-6 p-3 lg:px-8 border-4 border-black bg-inherit/30 backdrop-blur-lg -mb-14 ">
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
			</nav>
			<main className="flex flex-col justify-center items-center h-screen w-full text-center max-w-3xl mx-auto px-4 md:px-0 overflow-hidden">
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
					Welcome to Short, A URL Shortner
				</h1>
				<p className="mt-6 text-lg leading-8 text-subtle max-w-xl">
					URL`&apos`s are too long, we`&apos`ll make it short. This
					site is desigined to be self hosted on your domain. I
					provide Docker Image and Code for you to deploy on your own
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/sign-in"
						className="bg-green p-3  font-bold text-black hover:bg-lav"
					>
						Login Now
					</a>
					<a
						className="underline transition hover:no-underline font-semibold"
						href="/sign-up"
					>
						Sign Up Now!
					</a>
				</div>
			</main>{" "}
		</>
	);
}
