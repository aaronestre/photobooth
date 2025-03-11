"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Filters from "./filters";
import CapturedModal from "./capturedModal";
import useCamera from "../hooks/useCamera";

export default function PhotoCamera() {
	const videoRef = useRef(null);
	const {
		isVideoReady,
		setIsVideoReady,
		isCapturing,
		setIsCapturing,
		capturedImages,
		setCapturedImages,
		isModalOpen,
		setIsModalOpen,
		count,
		setCount,
        error,
        setError,
        currentFilter,
        setCurrentFilter
	} = useCamera();

	const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
    };

	const handleCapture = async () => {
        if (isCapturing) return;
		setIsCapturing(true);

		for (let i = 0; i < 3; i++) {
			for (let j = 3; j >= 1; j--) {
				setCount(j);
				console.log(j);
				await wait(1000);
			}

			setCount(0);
			await wait(100);
			setCount("");
			await wait(300);

			console.log("Captured");
			const video = videoRef.current;
			const canvas = document.createElement("canvas");
			canvas.width = 800;
			canvas.height = 600;
			const ctx = canvas.getContext("2d");
            ctx.filter = currentFilter;
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

	useEffect(() => {
        navigator.mediaDevices
			.getUserMedia({
				video: {
					width: 800,
					height: 600
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
                setError("Unable to access the camera. Please check your camera settings and permissions.")
			});
	}, [setError, setIsVideoReady]);

	return (
		<div className="flex flex-col items-center px-4">
			<div className="relative object-cover w-full max-w-[800px] h-[450px] sm:h-[600px]">
                {error && <div className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-bold text-red">{error}</div>}
                {!isVideoReady && <div className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-bold text-(--primary-dark)">Loading...</div>}
				<video
					className="scale-x-[-1] relative object-cover w-full h-full rounded-md"
					ref={videoRef}
				/>
				{isCapturing && (
					<div className="absolute inset-0 flex items-center justify-center text-5xl sm:text-7xl font-bold text-white">
						{count}
					</div>
				)}
				{isCapturing && count === 0 && (
					<div className="absolute inset-0 bg-white z-10 opacity-50"></div>
				)}
			</div>

			{isVideoReady && <Filters videoRef={videoRef} currentFilter={currentFilter} handleFilterChange={handleFilterChange}/>}
			{isVideoReady && (
				<motion.button
					onClick={handleCapture}
					whileTap={{ scale: 0.9 }}
					disabled={isCapturing}
					className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${
						isCapturing ? "bg-(--accent-pink)" : "bg-(--accent-pink)/60"
					} hover:bg-(--accent-pink) border-4 border-(--primary-dark) transition-all duration-300 ease-in-out mt-12`}
				></motion.button>
			)}

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
