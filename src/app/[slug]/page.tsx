import { tursoClient } from "@/lib/turso";
import { redirect } from "next/navigation";

export const runtime = "edge";
export interface URL {
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

export default async function Page({ params }: { params: { slug: string } }) {
	const { urls } = await getData();

	const matchedUrl = urls.find((url) => url.title === params.slug);
	console.log(urls[0].url, params.slug);
	if (matchedUrl) {
		redirect(matchedUrl.url);
	}

	return <div>My Post: {params.slug}</div>;
}
