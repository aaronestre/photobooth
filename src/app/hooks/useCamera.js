import { useState } from "react";

export default function useCamera() {
	const [isVideoReady, setIsVideoReady] = useState(false);
	const [isCapturing, setIsCapturing] = useState(false);
	const [capturedImages, setCapturedImages] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [count, setCount] = useState(0);

	return {
		isVideoReady,
		setIsVideoReady,
		isCapturing,
		setIsCapturing,
		capturedImages,
		setCapturedImages,
		isModalOpen,
		setIsModalOpen,
		count,
		setCount
	};
}
