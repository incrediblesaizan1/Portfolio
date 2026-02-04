"use client";

import { useRef, useEffect, useState } from "react";
import {
  useScroll,
  useMotionValueEvent,
  useTransform,
  motion,
} from "framer-motion";
import { HashLoader } from "react-spinners";

export default function ScrollyCanvas() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const lastFrameIndex = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Opacity control: fade in canvas when scrolling starts
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      console.log("ScrollAnimation: Starting preload of sequence images...");
      const frameCount = 192;
      const promises = [];

      let loadedCount = 0;

      for (let i = 0; i < frameCount; i++) {
        const filename = `frame_${String(i).padStart(3, "0")}.png`;
        const img = new Image();
        img.src = `/sequence/${filename}`;

        const promise = new Promise((resolve, reject) => {
          img.onload = () => {
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
            resolve(img);
          };
          img.onerror = (e) => {
            console.error(`Failed to load image index ${i}`, e);
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / frameCount) * 100));
            resolve(null);
          };
        });
        promises.push(promise);
      }

      try {
        const loadedImages = await Promise.all(promises);
        setImages(loadedImages.filter((img) => img !== null));
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading sequence images:", error);
      }
    };

    loadImages();
  }, []);

  // Render frame based on scroll
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Store index for resize handling
    lastFrameIndex.current = index;

    const img = images[index];

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Handle Resize & High DPI
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      if (images.length > 0) {
        renderFrame(lastFrameIndex.current);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [images, isLoaded]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded || images.length === 0) return;

    const frameIndex = Math.min(
      Math.floor(latest * (images.length - 1)),
      images.length - 1,
    );

    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  return (
    <div ref={containerRef} className="h-[500vh] relative">
      {isLoaded ? (
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.canvas
            ref={canvasRef}
            className="w-full h-full object-cover block"
            style={{
              width: "100%",
              height: "100%",
              opacity: canvasOpacity,
            }}
          />
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black gap-4">
          <HashLoader color="#0080d8" size={140} />
          <p className="text-white text-xl font-light tracking-widest">
            {loadingProgress}%
          </p>
        </div>
      )}
    </div>
  );
}
