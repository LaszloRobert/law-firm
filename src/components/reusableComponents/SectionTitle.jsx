import React from 'react'
import { textVariant } from "../../utils/motion"
import { motion } from 'framer-motion'
import { style } from '../../style'
import { useTranslation } from "react-i18next";
import TitleSeparator from "../../assets/title-separator-small.svg?react"

const SectionTitle = ({ title }) => {
    const { t } = useTranslation();

    return (
        <motion.div
            variants={textVariant()}
            className='-mt-14'
        >
            <h2 className={`${style.sectionTitles} section-title-underline`}>{t(title)}</h2>
            <TitleSeparator className="-mt-[145px] -mb-[100px] w-full text-secondary" />
        </motion.div>
    )
}

export default SectionTitle