import { tursoClient } from "@/lib/turso";
import { redirect } from "next/navigation";
export interface URL {
	url: string;
	title: string;
}

async function getData() {
	try {
		const res = await tursoClient().execute("select * from urls;");
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
