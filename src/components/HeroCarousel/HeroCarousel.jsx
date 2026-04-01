"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";


// usage
// const slides = [
//   {
//     image:
//       "https://storage.googleapis.com/uxpilot-auth.appspot.com/3e425a459b-733ddb1f886d42169401.png",
//     title: "Slide 1",
//     subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam fugit laboriosam animi molestias doloremque sapiente doloribus velit nisi necessitatibus modi.",
//     buttonText: "Button Text 1",
//     buttonLink: "#",
//   },
//   {
//     image:
//       "https://storage.googleapis.com/uxpilot-auth.appspot.com/3e425a459b-733ddb1f886d42169401.png",
//     title: "Slide 2",
//     subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam fugit laboriosam animi molestias doloremque sapiente doloribus velit nisi necessitatibus modi.",
//     buttonText: "Button Text 2",
//     buttonLink: "#",
//   },
//   {
//     image:
//       "https://storage.googleapis.com/uxpilot-auth.appspot.com/3e425a459b-733ddb1f886d42169401.png",
//     title: "Slide 3",
//     subtitle: "Subtitle 3",
//   },
// ];
//
// <HeroCarousel slides={slides}
// interval={2000}
// pauseOnHover={false}
// />

export default function HeroCarousel({
  slides = [],
  interval = 3000,
  pauseOnHover = false,
  pauseOnBtnHover = false,
  className,
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-rotate logic
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [paused, slides.length, interval]);

  if (!slides.length) return null;

  // Slide animation variants
    const variants = {
      enter: (dir) => ({ x: dir > 0 ? 100 : -100 }),
      center: { x: 0 },
      exit: (dir) => ({ x: dir > 0 ? -100 : 100 }),
    };

  return (
    <div
      className={cn("relative w-full h-[500px] overflow-hidden", className)}
      onMouseEnter={() => setPaused(pauseOnHover && true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={current}
          className="absolute inset-0"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = offset.x + velocity.x * 0.2;
            if (swipe < -100) nextSlide();
            else if (swipe > 100) prevSlide();
          }}
        >
          {/* Image */}
          <motion.img
            key={`image-${current}`}
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover absolute inset-0"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 flex flex-col justify-center text-primary-foreground px-8 md:px-20">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.3,
              }}
              className="max-w-4xl"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-3">
                {slides[current].title}
              </h2>
              {slides[current].subtitle && (
                <p className="text-lg md:text-xl mb-6 max-w-2xl text-primary-foreground-light">
                  {slides[current].subtitle}
                </p>
              )}
              {slides[current].buttonText && (
                <a
                  href={slides[current].buttonLink}
                  className="bg-primary px-6 py-3 rounded-lg w-fit text-primary-foreground font-semibold hover:bg-primary-dark transition"
                >
                  {slides[current].buttonText}
                </a>
              )}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setPaused(pauseOnBtnHover && true)}
        onMouseLeave={() => setPaused(false)}
        className="absolute left-2 top-1/2 -translate-y-1/2  hover:bg-black/70 text-white p-1 aspect-1/2 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        onMouseEnter={() => setPaused(pauseOnBtnHover && true)}
        onMouseLeave={() => setPaused(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2  hover:bg-black/70 text-white p-1 aspect-1/2 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i === current
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </div>
  );
}