import "./globals.css";
import { Playfair } from "next/font/google";

const playfair = Playfair({
	variable: "--font-playfair",
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
    display: "swap",
    adjustFontFallback: false,
});

export const metadata = {
	title: "SmileStation",
	description: "A virtual photobooth experience"
};

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body className={`${playfair.variable}`}>{children}</body>
		</html>
	);
}
