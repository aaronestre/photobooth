import Camera from "./components/Camera";
export default function Home() {
  return (
    <div className="bg-black h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white">Hello</h1>
      <Camera />
    </div>
  );
}
