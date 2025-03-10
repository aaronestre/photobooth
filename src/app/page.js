"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="bg-(--primary-light) text-(--primary-dark) h-screen w-screen flex flex-col items-center justify-center">
			<h1 className="text-8xl font-bold font-[family-name:var(--font-playfair)]">
				SmileStation
			</h1>
			<p className="text-2xl font-[family-name:var(--font-playfair)]">
				A virtual photobooth experience
			</p>
			<Link href="/photobooth">
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					className="w-50 h-12 bg-(--accent-pink) rounded-lg mt-12 text-(--primary-light) font-bold text-lg px-4"
				>
					Enter photobooth
				</motion.button>
			</Link>
		</div>
	);
}
