"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FILTERS } from "./filtersData";

export default function Filters({ videoRef }) {
	const [currentFilter, setCurrentFilter] = useState("none");
	const [selected, setSelected] = useState("none");

	const handleClick = (filter) => {
		setCurrentFilter(filter.value);
		setSelected(filter.name);
	};

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.style.filter = currentFilter;
		}
	}, [videoRef, currentFilter]);

	return (
		<div className="flex flex-row mt-4 gap-8">
			{FILTERS.map((filter) => {
				return (
					<div
						key={filter.name}
						onClick={() => handleClick(filter)}
					>
						<motion.video
							whileHover={{ y: -5 }}
							whileTap={{ scale: 0.9 }}
							key={filter.name}
							style={{ filter: filter.value }}
							className="w-24 h-24 rounded-md object-cover"
							autoPlay
							muted
							playsInline
							ref={(el) => {
								if (el && videoRef.current && videoRef.current.srcObject) {
									if (!el.srcObject) {
										el.srcObject = videoRef.current.srcObject;
									}
								}
							}}
						/>
						<div className={`bottom-0 left-0 right-0 text-center text-sm py-1 rounded-b-md ${selected === filter.name ? "text-amber-400" : "text-white"}`}>
							{filter.name}
						</div>
					</div>
				);
			})}
		</div>
	);
}
