"use client";
import { colorOptions } from "./backgroundsData";
import { useState } from "react";
import {motion} from "motion/react";

export default function Backgrounds({ handleBackgroundChange }) {
	const [selected, setSelected] = useState("#F0FFFF");

	return (
		<div className="m-4 mt-4">
			<p className="mb-2 text-sm sm:text-base">Select Photostrip Color:</p>
			<div className="flex flex-row flex-wrap gap-2 sm:gap-4">
				{colorOptions.map((color) => {
					return (
						<motion.div
							key={color}
                            whileHover={{scale: 1.1}}
							className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full shadow-sm cursor-pointer ${
								selected === color ? "border-2 border-(--primary-dark)" : ""
							}`}
							style={{ backgroundColor: color }}
							onClick={() => {
								handleBackgroundChange(color);
								setSelected(color);
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}
