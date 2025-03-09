"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

export default function CapturedModal({ isOpen, handleClose, capturedImages }) {
	const downloadRef = useRef(null);

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

	return (
		<div className="flex flex-col items-center justify-center fixed w-3/5 h-auto top-1/2 left-1/2 transform -translate-x-1/2 transform -translate-y-1/2 bg-black p-8 rounded-2xl">
			<div
				ref={downloadRef}
				className="w-auto h-auto bg-white flex flex-col items-center justify-center rounded-sm"
			>
				<div className="flex flex-col gap-4 justify-center items-center p-4">
					{capturedImages.map((image, index) => (
						<img
							key={index}
							src={image}
							alt={`Captured ${index}`}
							className="w-[200px] h-auto"
						/>
					))}
				</div>
			</div>
			<button
				className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl mt-4"
				onClick={handleDownload}
			>
				Download Photos
			</button>
			<button
				className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl mt-4"
				onClick={handleClose}
			>
				Close
			</button>
		</div>
	);
}
