import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";

const Hero = () => {
    const [index, setIndex] = useState(0);
    const { t, ready } = useTranslation();

    const words = t("HeroWords", { returnObjects: true });

    const wordVariants = {
        initial: { x: 400, opacity: 0 },
        animate: { x: 0, opacity: 1, transition: { duration: 1 } },
        exit: { x: -400, opacity: 0, transition: { duration: 1 } }
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((index) => (index + 1) % words.length); // Ensure looping
        }, 2500);

        return () => clearInterval(intervalId);
    }, [words.length]); // Add words.length to dependency array if words can change

    if (!ready) return null; // Or a loading indicator

    return (
        <div className="flex justify-center items-center h-screen">
            <AnimatePresence>
                <motion.div
                    key={index}
                    variants={wordVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className=" text-primary absolute text-4xl"
                >
                    {words[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Hero;