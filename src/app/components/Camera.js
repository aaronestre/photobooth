"use client";
import { useEffect, useRef, useState } from "react";
import Filters from "./filters";

export default function Camera() {
	const videoRef = useRef(null);
	const [isVideoReady, setIsVideoReady] = useState(false);

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
			<video
				className="object-cover w-[800px] h-[600px] rounded-md"
				ref={videoRef}
			/>

			{isVideoReady && <Filters videoRef={videoRef} />}
		</div>
	);
}
