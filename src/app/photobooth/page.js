import Camera from "../components/camera";
export default function Home() {
  return (
    <div className="bg-(--primary-light) text-(--primary-dark) h-screen w-screen flex flex-col items-center justify-center">
      <Camera />
    </div>
  );
}