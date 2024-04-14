import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import AuthNavbar from "@/compnents/auth-nav";
export default async function Page(request: { searchParams: any }) {
	const { error, message } = request.searchParams;
	const { userId } = auth();

	if (!userId) {
		redirect("/");
	}

	const user = await clerkClient.users.getUser(userId);

	return (
		<div>
			<AuthNavbar></AuthNavbar>
			<main className="flex flex-col justify-center items-start h-screen w-full max-w-5xl px-4 md:px-0 mx-auto overflow-hidden mt-5 ">
				{message && (
					<div className="bg-green-200 text-green-800 p-2 w-full">
						{message}
					</div>
				)}
				{error && (
					<div className="bg-red-200 text-red-800 p-2 w-full">
						{error}
					</div>
				)}
				<h2 className="text-4xl font-bold tracking-tight sm:text-5xl my-3">
					Hello {user.firstName}, Let&apos;s Create Short URL&apos;s !
				</h2>
				<form action="/api/add-url" method="post">
					<div className=" my-4 flex flex-col gap-2">
						<label htmlFor="urlInput" className=" font-sem">
							URL:
						</label>
						<input
							id="urlInput"
							name="urlInput"
							type="text"
							placeholder="Enter URL"
							className="w-full md:w-80 border-b-4 border-r-4 border-black"
						/>
					</div>
					<div className=" my-4 flex flex-col gap-2">
						<label htmlFor="titleInput">Title:</label>
						<input
							id="titleInput"
							name="titleInput"
							type="text"
							placeholder="Enter Title"
							className="w-full md:w-80 border-b-4 border-r-4 border-black"
						/>
					</div>
					<button
						className=" p-3 bg-green hover:bg-peach font-semibold mt-4 hover:underline"
						type="submit"
					>
						Submit
					</button>{" "}
				</form>
			</main>
		</div>
	);
}
