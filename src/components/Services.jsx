import React, { useRef, useState, useEffect } from 'react'
import { SectionWrapper } from '../hoc'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useTranslation } from "react-i18next";
import { style } from '../style'
import { textVariant, fadeIn, slideIn } from "../utils/motion"


const Services = () => {
    const { t, i18n, ready } = useTranslation();

    if (!ready) return
    const services = t("ServicesSection", { returnObjects: true });
    return (
        <>
            <div className="bg-services-bg bg-fixed bg-cover absolute top-0 left-0 right-0 bottom-0 z-[-1] "> </div>
            <div className="bg-contactOverlay w-full h-full absolute top-0 right-0 bottom-0 left-0  z-[-1]"></div>
            <div className="max-w-7xl mx-auto">
                <motion.div variants={textVariant()}>
                    <h2 className={`${style.sectionTitles} section-title-underline`}>{t("SectionTitles.servicesTitle")}</h2>
                </motion.div>
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

//create a function

const ServiceCard = ({ index, title, description }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <motion.div
                className='px-5 py-6 m-2 rounded-md shadow-md shadow-secondary w-[21rem] cursor-pointer'
                variants={fadeIn("up", "spring", index * 0.2, 0.75)}
                onClick={() => { setIsOpen(!isOpen) }}
            // onClick={() => { setIsOpen(!isOpen); if (!hasAnimated) setHasAnimated(true); }}
            // {...(hasAnimated ? {} : { variants: fadeIn("up", "spring", index * 0.2, 0.5) })}
            // initial={{ scale: 1 }}
            // whileHover={{ scale: 1.1, backgroundColor: "#af7f42" }}
            // transition={{ duration: 0.75, type: "spring" }}
            >
                <h2 className='font-bold text-center mx-auto text-tertiary'>
                    {title}
                </h2>
            </motion.div>


            {isOpen && (
                <>
                    <Overlay onClick={handleClose} />
                    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        <motion.div
                            className='w-[20rem] bg-[#DCC080] p-6 rounded-xl shadow-lg border-2 border-secondary'
                            initial={{ scale: 0.2, opacity: 0, rotate: -15 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.2, opacity: 0, rotate: 15 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className='font-medium text-center mb-2'>{title}</h2>
                            <p className='leading-relaxed whitespace-pre-line'>{description}</p>
                        </motion.div>
                    </div>
                </>
            )}

        </>
    );
}

const Overlay = ({ onClick }) => {
    return (
        <motion.div
            className='fixed top-0 left-0 w-full h-full bg-black opacity-50'
            onClick={onClick}
        />
    );
}


export default SectionWrapper(Services, '#services');