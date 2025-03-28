import { ArrowBigLeft, ArrowBigRight, CircleDot, Circle } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../contexts/ProductsContext";
import { useProducts } from "../../hooks/useProducts";

export const ImageSlider = () => {
  const { products } = useContext(ProductsContext);
  const [index, setIndex] = useState<number>(0);
  const [windowWidth, setWindowWitdth] = useState<number>(window.innerWidth);
  const { getProductsHandler } = useProducts();

  const slideStyle = {
    transform: `translateX(${(windowWidth > 768 ? -33 : -100) * index}%)`,
  };


  useEffect(() => {
    function handleResize() {
      setWindowWitdth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getProductsHandler();
  }, []);

  const buttonStyling =
    "hover:bg-black hover:opacity-50 block absolute top-0 bottom-0 p-1 cursor-pointer text-[#232323] duration-300 ease-in-out";

  const showNextImage = () => {
    if (windowWidth > 768) {
      setIndex((index) => (index === products.length - 3 ? 0 : index + 1));
    } else {
      setIndex((index) => (index === products.length - 1 ? 0 : index + 1));
    }
  };

  const showPreviousImage = () => {
    if (windowWidth > 768) {
      setIndex((index) => (index === 0 ? products.length - 3 : index - 1));
    } else {
      setIndex((index) => (index === 0 ? products.length - 1 : index - 1));
    }
  };

  const showClickedIndex = (i: number) => {
    if (i === index) return;
    setIndex(i);
  };

  return (
    <>
      {products.length > 0 && (
        <div className="h-full relative overflow-hidden">
          {/* Slider Container */}
          <div
            className="flex h-full transition-transform duration-500 ease-in-out md:p-5"
            style={slideStyle}
          >
            {products.map((p, i) => (
              <Link
                key={i}
                to={`/product/${p.id}`}
                className="flex-shrink-0 w-full md:w-1/3 flex justify-center "
              >
                <img
                  src={p.image}
                  alt=""
                  className="object-cover max-w-[90%] h-full duration-200 ease-in-out hover:scale-110 md:hover:scale-120 "
                />
              </Link>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={showPreviousImage}
            className={`${buttonStyling} left-0`}
          >
            <ArrowBigLeft />
          </button>
          <button
            onClick={showNextImage}
            className={`${buttonStyling} right-0`}
          >
            <ArrowBigRight />
          </button>

          {/* Dots Navigation */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {windowWidth > 768
              ? products.slice(0, 3).map((_, i) => (
                  <button
                    className="hover:cursor-pointer duration-200 ease-in-out hover:scale-150"
                    key={i}
                    onClick={() => {
                      showClickedIndex(i);
                    }}
                  >
                    {i === index ? (
                      <CircleDot className="stroke-white fill-black" />
                    ) : (
                      <Circle className="stroke-white fill-black" />
                    )}
                  </button>
                ))
              : products.map((_, i) => (
                  <button
                    className="hover:cursor-pointer duration-200 ease-in-out hover:scale-150"
                    key={i}
                    onClick={() => {
                      showClickedIndex(i);
                    }}
                  >
                    {i === index ? (
                      <CircleDot className="stroke-white fill-black" />
                    ) : (
                      <Circle className="stroke-white fill-black" />
                    )}
                  </button>
                ))}
          </div>
        </div>
      )}
    </>
  );
};
