import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { tursoClient } from "@/lib/turso";

export const runtime = "edge";

export async function POST(req: Request) {
	// You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
	const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

	if (!WEBHOOK_SECRET) {
		throw new Error(
			"Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
		);
	}

	// Get the headers
	const headerPayload = headers();
	const svix_id = headerPayload.get("svix-id");
	const svix_timestamp = headerPayload.get("svix-timestamp");
	const svix_signature = headerPayload.get("svix-signature");

	// If there are no headers, error out
	if (!svix_id || !svix_timestamp || !svix_signature) {
		return new Response("Error occured -- no svix headers", {
			status: 400,
		});
	}

	// Get the body
	const payload = await req.json();
	const body = JSON.stringify(payload);

	// Create a new Svix instance with your secret.
	const wh = new Webhook(WEBHOOK_SECRET);

	let evt: WebhookEvent;

	// Verify the payload with the headers
	try {
		evt = wh.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as WebhookEvent;
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error occured", {
			status: 400,
		});
	}

	// Get the ID and type
	const { id } = evt.data;
	const eventType = evt.type;

	console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
	console.log("Webhook body:", body);

	const obj = {
		data: {
			birthday: "",
			created_at: 1654012591514,
			email_addresses: [
				{
					email_address: "example@example.org",
					id: "idn_29w83yL7CwVlJXylYLxcslromF1",
					linked_to: [],
					object: "email_address",
					reserved: true,
					verification: {
						attempts: null,
						expire_at: null,
						status: "verified",
						strategy: "admin",
					},
				},
			],
			external_accounts: [],
			external_id: null,
			first_name: "Example",
			gender: "",
			id: "user_29w83sxmDNGwOuEthce5gg56FcC",
			image_url: "https://img.clerk.com/xxxxxx",
			last_name: null,
			last_sign_in_at: null,
			object: "user",
			password_enabled: true,
			phone_numbers: [],
			primary_email_address_id: "idn_29w83yL7CwVlJXylYLxcslromF1",
			primary_phone_number_id: null,
			primary_web3_wallet_id: null,
			private_metadata: {},
			profile_image_url: "https://www.gravatar.com/avatar?d=mp",
			public_metadata: {},
			two_factor_enabled: false,
			unsafe_metadata: {},
			updated_INTat: 1654012824306,
			username: null,
			web3_wallets: [],
		},
		object: "event",
		type: "user.updated",
	};

	if (eventType === "user.created") {
		const { username, id, email_addresses } = evt.data;
		const email = email_addresses[0].email_address;
		console.log(username, id, email);

		await tursoClient().execute({
			sql: "INSERT INTO users (id, username, email) VALUES (?, ?, ?)",
			args: [String(id), String(username), String(email)],
		});
		return new Response("User created", {
			status: 200,
		});
	}
}
