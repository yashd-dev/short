import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import AuthNavbar from "@/compnents/auth-nav";
export default async function Page() {
	const { userId } = auth();

	if (!userId) {
		redirect("/");
	}

	const user = await clerkClient.users.getUser(userId);

	return (
		<div>
			<AuthNavbar></AuthNavbar>
			<main className="flex flex-col justify-center items-center h-screen w-full text-center max-w-3xl mx-auto px-4 md:px-0 overflow-hidden mt-5 ">
				<h2>Hello {user.firstName} </h2>
			</main>
		</div>
	);
}
