import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "rgb(238, 238, 225)",
				card: "rgb(238, 238, 225)",
				text: "#111",
				subtle: "#33",
				border: "rgba(63,63,70,.4)",
				pink: "rgb(243, 139, 163)",
				blue: "rgb(18, 181, 229)",
				lav: "rgb(204, 153, 255)",
				peach: "rgb(255, 204, 153)",
				green: "rgb(181, 229, 196)",
			},
			fontFamily: {
				sans: ["Outfit", "sans-serif"],
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
export default config;
