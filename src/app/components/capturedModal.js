"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import { motion } from "motion/react";
import Backgrounds from "./backgrounds";

export default function CapturedModal({ isOpen, handleClose, capturedImages }) {
	const downloadRef = useRef(null);
	const [selectedBackground, setSelectedBackground] = useState("#F0FFFF");

	const handleBackgroundChange = (color) => {
		setSelectedBackground(color);
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isOpen]);

	const handleDownload = async () => {
		const element = downloadRef.current;
		const canvas = await html2canvas(element);
		const dataUrl = canvas.toDataURL("image/png");
		downloadjs(dataUrl, "captured-images.png", "image/png");
	};

	const modalVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 }
	};

	const photostripVariants = {
		hidden: { opacity: 0, y: -30 },
		visible: { opacity: 1, y: 0 }
	};
	return (
		<motion.div
			initial="hidden"
			animate={isOpen ? "visible" : "hidden"}
			variants={modalVariants}
			transition={{ duration: 0.5, ease: "easeInOut" }}
			className="max-w-lg sm:max-w-2xl flex flex-col sm:flex-row items-center justify-around fixed w-3/5 h-auto top-1/2 left-1/2 transform -translate-x-1/2 transform -translate-y-1/2 bg-(--primary-light) border-(--primary-dark) border-2 p-8 rounded-2xl"
		>
			<motion.div
				ref={downloadRef}
				initial="hidden"
				animate={isOpen ? "visible" : "hidden"}
				variants={photostripVariants}
				transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
				className="w-auto h-auto bg-white flex flex-col items-center justify-center rounded-sm"
				style={{ backgroundColor: selectedBackground }}
			>
				<div className="sm:w-1/2 flex flex-col gap-4 justify-center items-center p-4 last:mb-14">
					{capturedImages.map((image, index) => (
						<div
							key={index}
							className="w-[200px] h-[150px] relative"
						>
							<img
								src={image}
								alt={`Captured ${index}`}
								className="w-full h-full object-contain rounded"
							/>
						</div>
					))}
				</div>
			</motion.div>
			<div className="flex h-full flex-col w-full sm:w-1/2 items-center justify-center p-4">
				<div className="flex flex-col items-center justify-center">
					<h1 className="text-2xl text-(--primary-dark) font-bold mb-4">Your Photos</h1>
					<Backgrounds handleBackgroundChange={handleBackgroundChange} />
				</div>
				<div className="mt-4 flex flex-col items-center w-full">
					<motion.button
						className="bg-(--accent-green) text-white font-bold py-2 px-4 rounded-lg mt-4 w-4/5"
						whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
						onClick={handleDownload}
					>
						Download Photos
					</motion.button>
					<motion.button
						className="bg-(--accent-pink) text-white font-bold py-2 px-4 rounded-lg mt-4 w-4/5"
						whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
						onClick={handleClose}
					>
						Close
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
}
