import React, { useRef, useState, useEffect } from 'react'
import { SectionWrapper } from '../hoc'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useTranslation } from "react-i18next";
import { style } from '../style'
import { textVariant, fadeIn, slideIn } from "../utils/motion"

const Services = () => {
    const { t, i18n, ready } = useTranslation();

    if (!ready) return
    const services = t("Services", { returnObjects: true });
    return (
        <>
            <div className="bg-sectionBg absolute bg-cover w-full h-auto inset-0 z-[-1]"></div>
            <motion.div variants={textVariant()}>
                <h2 className={style.sectionTitles}>{t("SectionTitles.servicesTitle")}</h2>
            </motion.div>
            <div className="max-w-7xl mx-auto">
                <div className='flex flex-wrap gap-8 justify-center align-center'>
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

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <motion.div
                className='px-5 py-6 border-2 border-tertiary rounded-xl shadow-lg w-[21rem] cursor-pointer'
                onClick={() => setIsOpen(!isOpen)}
                variants={fadeIn("up", "spring", index * 0.2, 0.5)}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1, backgroundColor: "#DFE0DF" }}
                transition={{ duration: 0.75, type: "spring" }}
            >
                <h2 className='font-bold text-center mx-auto text-secondary'>
                    {title}
                </h2>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <Overlay onClick={handleClose} />
                        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                            <motion.div
                                className='w-[20rem] bg-white p-6 rounded-xl shadow-lg'
                                initial={{ scale: 0.2, opacity: 0, rotate: -15 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                exit={{ scale: 0.2, opacity: 0, rotate: 15 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className='font-medium'>{title}</h2>
                                <p className='leading-relaxed whitespace-pre-line'>{description}</p>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
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