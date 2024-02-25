import React from 'react'
import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from "react-i18next";

const Hero = () => {
    const { t, ready } = useTranslation();
    if (!ready) return

    const words = t("HeroWords", { returnObjects: true });
    return (
        <section className='h-screen w-full flex items-center justify-center mx-auto -top-[40px]'>
            <div>
                <TypeAnimation
                    sequence={words}
                    speed={200}
                    repeat={Infinity}
                    className='text-primary text-[40px]'
                />
            </div>


        </section>
    )
}

export default Hero

// import React, { useState, useEffect } from 'react'
// import { motion, AnimatedPresence } from 'framer-motion'

// const words = ["Profesionalism", "Eficienta", 'Integritate'];

// const Hero = () => {
//     const [index, setIndex] = useState(0);

//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             setIndex((index) => index + 1);
//         }, 2500);

//         return () => clearInterval(intervalId);
//     })
// }