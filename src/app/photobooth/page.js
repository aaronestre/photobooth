import PhotoCamera from "../components/PhotoCamera";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="bg-(--primary-light) text-(--primary-dark) h-screen w-screen flex flex-col items-center justify-center">
			<Link href="/">
				<Image
					src="/back_arrow.svg"
					alt="Back arrow"
					width={50}
					height={50}
                    className="absolute top-4 left-4 hover:scale-110 transition ease-in-out duration-300"
				/>
			</Link>

			<PhotoCamera />
		</div>
	);
}
