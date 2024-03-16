import React from 'react'
import { SectionWrapper } from '../hoc'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { slideIn } from '../utils/motion'
import { aboutus } from "../assets"

const About = () => {
    const { t } = useTranslation();
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='flex sm:flex-row flex-col justify-between'>
                <motion.div
                    variants={slideIn("left", "tween", 0.2, 1)}
                    className='md:w-[50%] w-full md:ml-5'>
                    <p
                        className='text-[17px] md:text-[20px] text-[#645858] text-justify'
                    >
                        {t("AboutSection.text")}
                    </p>
                </motion.div>
                <motion.div
                    className='-mt-7 hidden md:flex'
                    variants={slideIn("right", "tween", 0.2, 1)}
                >
                    <img
                        src={aboutus}
                        alt="Despre societatea de avocatura Rusa si Asociatii"
                        className='w-[400px] h-[400px] rounded-full object-cover b-2 shadow-2xl shadow-secondary hover:shadow-2xl  ease-out duration-700 hover:scale-110'
                    />
                </motion.div>
            </div>
        </div >
    )

}

export default SectionWrapper(About, 'about')

