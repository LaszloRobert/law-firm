import { motion } from 'framer-motion'
import { staggerContainer } from '../utils/motion'
import { style } from "../style"
import { useTranslation } from 'react-i18next'
import { slideIn, textVariant } from '../utils/motion'
import TitleSeparator from "../assets/title-separator-small.svg?react"

const SectionWrapper = (Component, idName) =>
    function HOC() {
        const { t } = useTranslation();
        return (
            <motion.section
                variants={staggerContainer()}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className={`${style.padding} relative`}
            >
                <span className='hash-span' id={idName}>
                    &nbsp;
                </span>
                <motion.div variants={textVariant()}>
                    <h1 className={`${style.sectionTitles} -mt-14`}>{t(`SectionTitles.${idName}`)}</h1>
                    <TitleSeparator className="-mt-[145px] -mb-[100px] w-full text-secondary" />
                </motion.div>
                <Component />
            </motion.section>

        )
    }

export default SectionWrapper