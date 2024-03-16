import React, { useState, useEffect, useRef } from 'react';
import { SectionWrapper } from '../hoc'
import { motion, useAnimate } from 'framer-motion'
import { useTranslation } from "react-i18next";
import { fadeIn } from "../utils/motion"

const Services = () => {
    const { t, ready } = useTranslation();
    if (!ready) return
    const services = t("ServicesSection", { returnObjects: true });
    return (
        <>
            <div className="bg-services-bg bg-fixed bg-cover absolute top-0 left-0 right-0 bottom-0 z-[-1] "> </div>
            <div className="bg-contactOverlay w-full h-full absolute top-0 right-0 bottom-0 left-0  z-[-1]"></div>
            <div className="max-w-7xl mx-auto">
                <div
                    className='flex flex-wrap gap-8 justify-center align-center'
                >
                    {services.map((service, index) => (
                        <ServiceCard key={service.id} index={index} title={service.title} description={service.description} />
                    ))}
                </div>
            </div>
        </>

    )
}

const ServiceCard = ({ index, title, description }) => {

    const [scope, animate] = useAnimate();

    const backRef = useRef();
    const [height, setHeight] = useState('auto');
    const [isFlipped, setIsFlipped] = useState(false);
    useEffect(() => {
        // Adjust the height based on the flipped state
        const backHeight = backRef.current.offsetHeight;
        setHeight(backHeight);

    }, [isFlipped]); // Re-run this effect when isFlipped changes

    const cardVariants = {
        front: { rotateY: 0, height: "70px" },
        back: { rotateY: 180, height: height },
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
    const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
    const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
    const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
    const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

    const ENTRANCE_KEYFRAMES = {
        left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
        bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
        top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
        right: [TOP_LEFT_CLIP, NO_CLIP],
    };

    const EXIT_KEYFRAMES = {
        left: [NO_CLIP, TOP_RIGHT_CLIP],
        bottom: [NO_CLIP, TOP_RIGHT_CLIP],
        top: [NO_CLIP, TOP_RIGHT_CLIP],
        right: [NO_CLIP, BOTTOM_LEFT_CLIP],
    };

    const getNearestSide = (e) => {
        const box = e.target.getBoundingClientRect();

        const proximityToLeft = {
            proximity: Math.abs(box.left - e.clientX),
            side: "left",
        };
        const proximityToRight = {
            proximity: Math.abs(box.right - e.clientX),
            side: "right",
        };
        const proximityToTop = {
            proximity: Math.abs(box.top - e.clientY),
            side: "top",
        };
        const proximityToBottom = {
            proximity: Math.abs(box.bottom - e.clientY),
            side: "bottom",
        };

        const sortedProximity = [
            proximityToLeft,
            proximityToRight,
            proximityToTop,
            proximityToBottom,
        ].sort((a, b) => a.proximity - b.proximity);

        return sortedProximity[0].side;
    };

    const handleMouseEnter = (e) => {
        const side = getNearestSide(e);

        animate(scope.current, {
            clipPath: ENTRANCE_KEYFRAMES[side],
        });
    };

    const handleMouseLeave = (e) => {
        const side = getNearestSide(e);

        animate(scope.current, {
            clipPath: EXIT_KEYFRAMES[side],
        });
    };


    return (
        <motion.div
            onMouseEnter={(e) => {
                handleMouseEnter(e);
            }}
            onMouseLeave={(e) => {
                handleMouseLeave(e);
            }}
            variants={fadeIn("up", "spring", index * 0.2, 0.75)}
            className='relative w-[23rem] cursor-pointer m-2'
            onClick={handleFlip}>

            <motion.div
                style={{ transformStyle: "preserve-3d" }}
                variants={cardVariants}
                animate={isFlipped ? "back" : "front"}
                transition={{ duration: 0.8 }}
            >
                {/* Front side of the card */}
                <motion.div
                    className={`${isFlipped ? "hidden" : "relative"} px-5 py-6 rounded-md shadow-md shadow-secondary overflow-hidden`}
                >
                    <h2 className='font-bold text-center mx-auto text-tertiary'>{title}</h2>
                </motion.div>

                {/* Hover front side */}
                <div
                    className="h-max absolute inset-0 px-5 py-6 rounded-md shadow-md bg-secondary  overflow-hidden"
                    style={{
                        clipPath: BOTTOM_RIGHT_CLIP,
                    }}
                    ref={scope} // Reference for measuring height
                >
                    <h2 className='font-bold text-center mx-auto text-tertiary'>{title}</h2>
                </div>

                {/* Back side of the card */}
                <motion.div
                    className={`${isFlipped ? "relative" : "absolute"} px-5 py-6 rounded-md bg-secondary text-white inset-0`}
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    ref={backRef} // Reference for measuring height
                >
                    <p className='leading-relaxed tracking-wide whitespace-pre-line'>{description}</p>
                </motion.div>
            </motion.div>
        </motion.div >
    );
}

export default SectionWrapper(Services, 'services');