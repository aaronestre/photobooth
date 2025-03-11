"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FILTERS } from "./filtersData";

export default function Filters({ videoRef, currentFilter, handleFilterChange }) {
	//const [currentFilter, setCurrentFilter] = useState("none");
	const [selected, setSelected] = useState("Normal");

	const handleClick = (filter) => {
		handleFilterChange(filter.value);
		setSelected(filter.name);
	};

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.style.filter = currentFilter;
		}
	}, [videoRef, currentFilter]);

	return (
		<div className="flex flex-wrap justify-center mt-4 gap-4 sm:gap-8">
			{FILTERS.map((filter) => {
				return (
					<div
						key={filter.name}
						onClick={() => handleClick(filter)}
						className="w-20 sm:w-24 h-20 sm:h-24"
					>
						<motion.video
							whileHover={{ y: -5 }}
							whileTap={{ scale: 0.9 }}
							key={filter.name}
							style={{ filter: filter.value }}
							className="scale-x-[-1] w-full h-full rounded-md object-cover"
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
						<div
							className={`bottom-0 left-0 right-0 text-center text-xs sm:text-sm py-1 rounded-b-md ${
								selected === filter.name
									? "text-(--accent-pink)"
									: "text-(--primary-dark)"
							}`}
						>
							{filter.name}
						</div>
					</div>
				);
			})}
		</div>
	);
}
