import { NextResponse, NextRequest } from "next/server";
import { tursoClient } from "@/lib/turso";

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const { urlInput, titleInput } = Object.fromEntries(formData);
	console.log(urlInput, titleInput);
	const addNewUrl = req.nextUrl.clone();
	addNewUrl.pathname = "/dashboard";

	if (!urlInput || !titleInput) {
		NextResponse.redirect(addNewUrl + "?error=Fill in all fields!", {
			status: 422,
		});
	}
	if (
		typeof urlInput === "string" &&
		/^https?:\/\/\w+(\.\w+)*(:\d+)?(\/\S*)?$/.test(urlInput) &&
		typeof titleInput === "string"
	) {
		// Check if table exists, if not create the table
		await tursoClient().execute(`
            CREATE TABLE IF NOT EXISTS urls (
                id INT AUTO_INCREMENT PRIMARY KEY,
                url VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL
            )
        `);
		const add = await tursoClient().execute({
			sql: "INSERT INTO urls (url, title) VALUES (?, ?)",
			args: [urlInput, titleInput],
		});

		return NextResponse.redirect(addNewUrl + "?message=Framework added!", {
			status: 302,
		});
	} else {
		NextResponse.redirect(addNewUrl + "?error=Invalid URL input!", {
			status: 422,
		});
	}
}
