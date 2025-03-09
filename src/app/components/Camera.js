"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Filters from "./filters";
import CapturedModal from "./capturedModal";

export default function Camera() {
	const videoRef = useRef(null);
	const [isVideoReady, setIsVideoReady] = useState(false);
	const [isCapturing, setIsCapturing] = useState(false);
	const [capturedImages, setCapturedImages] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [count, setCount] = useState(0);

	const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const handleCapture = async () => {
		setIsCapturing(true);

		for (let i = 0; i < 3; i++) {
			for (let j = 1; j <= 3; j++) {
				setCount(j);
				console.log(j);
				await wait(1000);
			}

			setCount(4);
            await wait(100);
            setCount("");
			await wait(500);

			console.log("Captured");
			const video = videoRef.current;
			const canvas = document.createElement("canvas");
			canvas.width = 400;
			canvas.height = 300;
			const ctx = canvas.getContext("2d");
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			const image = canvas.toDataURL("image/png");
			setCapturedImages((prevImgs) => [...prevImgs, image]);

			if (i === 2) {
				setIsCapturing(false);
				setIsModalOpen(true);
			}

			await wait(1000);
		}
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setCapturedImages([]);
	};

	const getVideo = () => {
		navigator.mediaDevices
			.getUserMedia({
				video: {
					width: 810,
					height: 270
				}
			})
			.then((stream) => {
				let video = videoRef.current;
				video.srcObject = stream;
				video.play();

				setIsVideoReady(true);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getVideo();
	}, []);

	return (
		<div className="flex flex-col items-center">
			<div className="relative object-cover w-[800px] h-[600px]">
				<video
					className="relative object-cover w-[800px] h-[600px] rounded-md"
					ref={videoRef}
				/>
                {isCapturing && <div className="absolute inset-0 top-1/2 left-1/2 text-7xl font-bold text-white">{count}</div>}
				{isCapturing && count === 4 && (
					<div className="absolute inset-0 bg-white z-10 opacity-50"></div>
				)}
			</div>

			{isVideoReady && <Filters videoRef={videoRef} />}

			<motion.button
				onClick={handleCapture}
				whileTap={{ scale: 0.9 }}
				disabled={isCapturing}
				className="w-20 h-20 rounded-[50%] bg-(--capture-button) hover:bg-(--capture-button-hover) border-4 border-white transition-all duration-300 ease-in-out"
			></motion.button>
			{isModalOpen && (
				<CapturedModal
					isOpen={isModalOpen}
					handleClose={handleCloseModal}
					capturedImages={capturedImages}
				/>
			)}
		</div>
	);
}
