import React from 'react'
import { SectionWrapper } from '../hoc'
import { useTranslation } from 'react-i18next'
import { aboutus } from '../assets'
import { style } from '../style'
import { motion } from 'framer-motion'
import { slideIn } from '../utils/motion'

const About = () => {
    const { t } = useTranslation();
    return (
        <div className='max-w-7xl mx-auto'>
            <h1 className={`${style.sectionTitles} section-title-underline`}>{t("SectionTitles.aboutTitle")}</h1>
            <div className='sm:flex-row flex-col flex justify-center items-center overflow-hidden'>
                <motion.div
                    variants={slideIn("left", "tween", 0.2, 1)}
                >
                    <h2 className='text-[30px] mb-3'>Welcome to out website</h2>
                    <p
                        className='text-[20px] leading-8 text-[#666]'
                    >
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia omnis temporibus sint accusamus, recusandae a magnam, eligendi molestias adipisci quibusdam quos. Ullam saepe nisi reiciendis? Architecto dolore nam tenetur modi!
                    </p>
                </motion.div>
                <motion.div
                    className=''
                    variants={slideIn("right", "tween", 0.2, 1)}
                >
                    <img
                        src={aboutus}
                        alt="aboutImage"
                        className='w-full h-auto rounded-xl shadow-lg ml-10'
                    />
                </motion.div>
            </div>
        </div>
    )

}

export default SectionWrapper(About, 'about')

