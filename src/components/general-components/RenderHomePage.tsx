import { ImageSlider } from "./ImageSlider";


export const RenderHomePage = () => {


  return (
    <>
      <div className="flex flex-col  h-120 ">
        <div className="w-full h-1/2 flex bg-gradient-to-b from-black via-black to-white">
          <h1 className="text-6xl text-[#b3b3b3] ml-3">Ready to make some noise?</h1>
        </div>
        <div className=" h-1/2">
            <ImageSlider></ImageSlider>
        </div>
      </div>
    </>
  );
};
