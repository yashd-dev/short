import AuthNavbar from "@/compnents/auth-nav";
import { tursoClient } from "@/lib/turso";
import { currentUser } from "@clerk/nextjs";

export const runtime = "edge";
export interface URL {
	id: string;
	url: string;
	title: string;
}

async function getData() {
	try {
		const res = await tursoClient().execute("select * from url;");
		return {
			urls: res.rows as unknown as URL[],
		};
	} catch (error) {
		console.error(error);
		return {
			urls: [],
		};
	}
}

export default async function Link() {
	const { urls } = await getData();
	const user = await currentUser();
	console.log(urls);
	const filteredUrls = urls.filter((url) => url.id === user?.id);

	return (
		<div>
			<AuthNavbar></AuthNavbar>
			<main className="flex flex-col justify-center items-start h-screen w-full max-w-5xl px-4 md:px-0 mx-auto overflow-hidden mt-5 ">
				<h2 className="text-4xl font-bold tracking-tight sm:text-5xl my-8">
					Here Are Your Custom Links!
				</h2>

				<table className="w-[90%] border-collapse border border-black text-md">
					<thead className="bg-gray-200">
						<tr>
							<th className="border border-black px-4 py-2">
								Your Domain/Shortened URL
							</th>
							<th className="border border-black px-4 py-2">
								The URL
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredUrls.map((url, index) => (
							<tr
								key={index}
								className={index % 2 === 0 ? "bg-gray-100" : ""}
							>
								<td className="border border-black px-4 py-2">
									{process.env.NEXT_PRODUCTION_URL}/
									{url.title}
									<a
										href={`${process.env.NEXT_PRODUCTION_URL}/${url.title}`}
										target="_blank"
									>
										🔗
									</a>
								</td>
								<td className="border border-black px-4 py-2">
									{url.url}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</main>
		</div>
	);
}
