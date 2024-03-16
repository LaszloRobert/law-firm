import React, { useState, useEffect, useRef } from 'react';
import { SectionWrapper } from '../hoc'
import { motion, useAnimate, AnimatePresence } from 'framer-motion'
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

    const [isOpen, setIsOpen] = useState(false);
    const [scope, animate] = useAnimate();

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

    const handleClose = () => {
        setIsOpen(false);
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
    const frontRef = useRef();
    const backRef = useRef();
    const [height, setHeight] = useState('auto');
    const [isFlipped, setIsFlipped] = useState(false);
    const [showFront, setShowFront] = useState(true);
    useEffect(() => {
        // Adjust the height based on the flipped state
        const frontHeight = frontRef.current.offsetHeight;
        const backHeight = backRef.current.offsetHeight;

        // Set height based on whether the card is flipped or not
        if (isFlipped) {
            setHeight(backHeight);
        } else {
            setHeight(frontHeight);
        }
    }, [isFlipped]); // Re-run this effect when isFlipped changes



    const cardVariants = {
        front: { rotateY: 0, height: "70px" },
        back: { rotateY: 180, height: height },
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    return (
        <>
            <motion.div
                onMouseEnter={(e) => {
                    handleMouseEnter(e);
                }}
                onMouseLeave={(e) => {
                    handleMouseLeave(e);
                }}
                variants={fadeIn("up", "spring", index * 0.2, 0.75)}
                className='relative w-[21rem] cursor-pointer m-2'
                onClick={handleFlip}>

                <motion.div
                    className="relative"
                    style={{ transformStyle: "preserve-3d" }} // Set the dynamic height here
                    variants={cardVariants}
                    animate={isFlipped ? "back" : "front"}
                    transition={{ duration: 0.8 }}
                >
                    {/* Front side of the card */}
                    <motion.div
                        className=" px-5 py-6 rounded-md shadow-md shadow-secondary overflow-hidden"
                        style={{ backfaceVisibility: "hidden" }}
                        ref={frontRef} // Reference for measuring height
                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                    >
                        <h2 className='font-bold text-center mx-auto text-tertiary'>{title}</h2>
                    </motion.div>

                    {/* Front side of the card */}
                    <div
                        className=" h-[72px] absolute inset-0 px-5 py-6 rounded-md shadow-md bg-secondary  overflow-hidden"
                        style={{
                            clipPath: BOTTOM_RIGHT_CLIP,
                        }}
                        ref={scope} // Reference for measuring height
                    >
                        <h2 className='font-bold text-center mx-auto text-tertiary'>{title}</h2>
                    </div>

                    {/* Back side of the card */}
                    <motion.div
                        className={`${isFlipped ? "relative -mt-20" : "absolute"} px-5 py-6 rounded-md bg-secondary text-white inset-0`}
                        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                        ref={backRef} // Reference for measuring height
                    >

                        <p className='leading-relaxed tracking-wide whitespace-pre-line'>{description}</p>
                    </motion.div>
                </motion.div>

            </motion.div>
            {/* <motion.div
                onMouseEnter={(e) => {
                    handleMouseEnter(e);
                }}
                onMouseLeave={(e) => {
                    handleMouseLeave(e);
                }}
                className='relative'
                variants={fadeIn("up", "spring", index * 0.2, 0.75)}
                onClick={() => { setIsOpen(!isOpen) }}
                whileHover={{ scale: 1.05 }}
            >
                <div className='px-5 py-6 m-2 rounded-md shadow-md shadow-secondary w-[21rem] cursor-pointer relative overflow-hidden'>
                    <h2 className='font-bold text-center mx-auto text-tertiary'>
                        {title}
                    </h2>
                </div>
                <div
                    ref={scope}
                    style={{
                        clipPath: BOTTOM_RIGHT_CLIP,
                    }}
                    className="absolute inset-0 px-5 py-6 m-2 rounded-md bg-secondary text-white w-[21rem] cursor-pointer overflow-hidden"
                >
                    <h2 className='font-bold text-center mx-auto'>
                        {title}
                    </h2>
                </div>
            </motion.div>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <Overlay onClick={handleClose} />
                        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30'>
                            <motion.div
                                className='w-[20rem] bg-[#DCC080] p-6 shadow-lg border-2 border-secondary'
                                initial={{ scale: 0.1, opacity: 0 }}
                                animate={{
                                    opacity: [0.3, 0.5, 0.7, 0.9, 1],
                                    scale: [0.3, 0.5, 0.7, 0.9, 1],
                                    borderRadius: "10%",
                                }}
                                exit={{
                                    opacity: [1, 0.9, , 0.7, 0.5, 0.3, 0],
                                    y: [0, 50, 100, 150, 200, 250, 300],
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className='font-medium text-center mb-2'>{title}</h2>
                                <p className='leading-relaxed tracking-wide whitespace-pre-line'>{description}</p>
                            </motion.div>

                        </div>
                    </>
                )
                }
            </AnimatePresence> */}
        </>
    );
}

const Modal = ({ isOpen, title, description, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg max-w-md w-full">
                <button onClick={onClose}>Close</button>
                <h2 className="font-bold text-center mx-auto">{title}</h2>
                <p className="text-black">{description}</p>
            </div>
        </div>
    );
};

const Overlay = ({ onClick }) => {
    return (
        <motion.div
            className='fixed inset-0 bg-black opacity-50 z-20'
            onClick={onClick}
        />
    );
}

export default SectionWrapper(Services, 'services');