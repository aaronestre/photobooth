import "../globals.css";
import {Lora} from "next/font/google";

const lora = Lora({
    variable: "--font-lora",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
    adjustFontFallback: false,

});

export const metadata = {
  title: "SmileStation",
  description: "A virtual photobooth experience",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
