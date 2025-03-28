import { ImageSlider } from "./ImageSlider";

export const RenderHomePage = () => {
  return (
    <>
      <div className="flex flex-col h-dvh ">
        <div className="w-full h-2/3 flex bg-gradient-to-b from-[#1b1b1b] via-[#1b1b1b] to-white">
          <h1 className="font-bebas text-6xl text-[#b3b3b3] ml-3 mt-4">
            Ready to make some noise?
          </h1>
        </div>
        <div className=" h-1/2">
          <ImageSlider></ImageSlider>
        </div>
      </div>
    </>
  );
};
