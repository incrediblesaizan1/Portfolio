'use client';

import ScrollIndicator from '@/components/ScrollIndicator';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function OverlayText() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax transforms
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
    const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);

    const y3 = useTransform(scrollYProgress, [0.5, 0.8], [100, -100]);
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">
            {/* Section 1 */}
            <motion.div
                style={{ y: y1, opacity: opacity1 }}
                className="sticky top-0 h-screen flex flex-col items-center justify-center text-center p-8"
            >
                <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-4 mix-blend-difference text-white">
                    Saizan Khan
                </h1>
                <p className="text-xl md:text-2xl font-light tracking-[0.2em] text-gray-300 mix-blend-difference">
                    CREATIVE DEVELOPER
                </p>
                <ScrollIndicator />
            </motion.div>

            {/* Section 2 */}
            <motion.div
                style={{ y: y2, opacity: opacity2 }}
                className="sticky top-0 h-screen flex flex-col items-start justify-center p-8 md:pl-24"
            >
                <h2 className="text-5xl md:text-8xl font-bold max-w-4xl leading-[0.9] mix-blend-difference text-white">
                    I build digital <br />
                    <span className="text-gray-400">experiences.</span>
                </h2>
            </motion.div>

            {/* Section 3 */}
            <motion.div
                style={{ y: y3, opacity: opacity3 }}
                className="sticky top-0 h-screen flex flex-col items-end justify-center p-8 md:pr-24 text-right"
            >
                <h2 className="text-5xl md:text-8xl font-bold max-w-4xl leading-[0.9] mix-blend-difference text-white">
                    Bridging design <br />
                    <span className="text-gray-400">& engineering.</span>
                </h2>
            </motion.div>
        </div>
    );
}
