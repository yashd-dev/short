import { NextResponse, NextRequest } from "next/server";
import { tursoClient } from "@/lib/turso";
import { currentUser } from "@clerk/nextjs";

export const runtime = "edge";

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
	const user = await currentUser();
	if (
		typeof urlInput === "string" &&
		/^https?:\/\/\w+(\.\w+)*(:\d+)?(\/\S*)?$/.test(urlInput) &&
		typeof titleInput === "string" &&
		typeof user?.id === "string"
	) {
		// Check if table exists, if not create the table
		console.log(user?.id);
		await tursoClient().execute(`
					DROP TABLE IF EXISTS url
				`);
		await tursoClient().execute(`
					DROP TABLE IF EXISTS urls
				`);
		await tursoClient().execute(`
            CREATE TABLE IF NOT EXISTS url (
                id VARCHAR(255) PRIMARY KEY,
                url VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
    			FOREIGN KEY (id) REFERENCES users(id)
            )
        `);
		const add = await tursoClient().execute({
			sql: "INSERT INTO url (url, title, id ) VALUES (?, ?, ?)",
			args: [urlInput, titleInput, user.id],
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
