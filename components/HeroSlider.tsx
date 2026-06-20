"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SLIDE_DATA = [
  {
    id: 1,
    image: "/pic4.jpg",
    subtitle: "-- NEW ITEMS",
    title: "Summer Sale",
    description:
      "Explore premium quality summer outfits, soft cotton & comfortable.",
    // link: "/search?collection=summer",
  },
  {
    id: 2,
    image: "/pic5.jpg",
    subtitle: "-- ESSENTIALS",
    title: "Studio Core",
    description:
      "Lightweight silhouettes crafted for modern foundational wardrobes.",
    // link: "/search?collection=essentials",
  },
  {
    id: 3,
    image: "/pic7.jpg",
    subtitle: "-- MINIMALIST",
    title: "Stitch Modern",
    description: "Clean bright linen sweatshirts.",
    // link: "/search?collection=modern",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === SLIDE_DATA.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDE_DATA.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === SLIDE_DATA.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[85vh] bg-black overflow-hidden select-none">
      {SLIDE_DATA.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-black/40 z-20" />

          <div className="absolute inset-0 z-30 flex items-center max-w-7xl mx-auto px-5 sm:px-7 lg:px-9">
            <div className="max-w-xl bg-black/20 backdrop-blur-md p-7 md:p-9 rounded-lg border border-white/10 text-white space-y-3">
              <span className="text-xs md:text-sm font-semibold tracking-widest text-red-500 uppercase">
                {slide.subtitle}
              </span>
              <h2 className="text-3xl md:text-3xl font-extrabold tracking-tight">
                {slide.title}
              </h2>
              <p className="text-sm md:text-base text-gray-200 font-light max-w-sm">
                {slide.description}
              </p>
              <div className="pt-2">
                <Link
                  href="#"
                  className="inline-block text-xs md:text-sm font-bold tracking-wider border-b-2 border-red-500 pb-1 hover:text-red-400 transition-colors"
                >
                  Discover More
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2 text-white/50 hover:text-white transition-colors text-2xl md:text-3xl focus:outline-none"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2 text-white/50 hover:text-white transition-colors text-2xl md:text-3xl focus:outline-none"
      >
        &#10095;
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex space-x-3">
        {SLIDE_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current ? "w-6 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
