import React from 'react'
import { SectionWrapper } from '../hoc'
import { useTranslation } from 'react-i18next'
import { style } from '../style'
import { motion } from 'framer-motion'
import { slideIn } from '../utils/motion'
import { aboutus } from "../assets"

const About = () => {
    const { t } = useTranslation();
    return (
        <div className='max-w-7xl mx-auto'>
            {/* <div className="bg-aboutus-bg bg-fixed bg-cover absolute top-0 left-0 right-0 bottom-0 z-[-1] "> </div>
            <div className="bg-contactOverlay w-[60%] h-full absolute top-0 right-0 bottom-0 left-0  z-[-1]"></div> */}
            {/* <div className="bg-contactOverlay absolute top-0 right-0 bottom-[85%] left-[60%]  z-[-1]"></div> */}
            <h1 className={`${style.sectionTitles} section-title-underline -mt-14`}>{t("SectionTitles.aboutTitle")}</h1>
            <div className='flex justify-between'>
                <motion.div
                    variants={slideIn("left", "tween", 0.2, 1)}
                    className='w-[50%] ml-5 mb-20'
                >
                    <p
                        className='text-[20px] text-[#3a3a3a] text-justify'
                    >
                        {t("AboutSection.text")}
                    </p>
                </motion.div>
                <motion.div
                    className=''
                    variants={slideIn("right", "tween", 0.2, 1)}
                >
                    <img
                        src={aboutus}
                        alt="aboutImage"
                        className='w-[400px] h-[400px] rounded-full object-cover b-2 shadow-2xl shadow-secondary hover:shadow-2xl  ease-out duration-700 hover:scale-110'
                    />
                </motion.div>
            </div>
        </div>
    )

}

export default SectionWrapper(About, 'about')

