import { SignUp } from "@clerk/nextjs";
import Navbar from "@/compnents/nav";
export default function Page() {
	return (
		<>
			<Navbar></Navbar>
			<main className="flex flex-col justify-center items-center min-h-[120vh] w-full text-center max-w-3xl mx-auto px-4 md:px-0 overflow-hidden mt-20 !text-white ">
				<SignUp />
			</main>{" "}
		</>
	);
}
