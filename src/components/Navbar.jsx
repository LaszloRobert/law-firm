import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from "react-country-flag"
import i18next from 'i18next'
import { languages } from '../constants'
import { close, menu } from "../assets"
import Phone from "../assets/phoneNavbar.svg?react"
import { AnimatePresence, motion } from 'framer-motion';
import AppointmentButton from './reusableComponents/AppointmentButton'
import { style } from '../style'

const sidebarVariants = {
    closed: {
        clipPath: 'circle(0.5% at 100% 0)',
        transition: {
            duration: 0.4
        },
        opacity: 0
    },
    opened: {
        clipPath: 'circle(141.2% at 100% 0)',
        transition: {
            duration: 0.5
        },
        opacity: 1
    }
}

const mobileUlVariant = {
    opened: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2
        }
    },
    closed: {
        opacity: 0
    }
}

const liVariants = {
    opened: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
};

const Navbar = () => {
    const { t, ready } = useTranslation();
    const [currentLanguageCode, setCurrentLanguageCode] = useState(
        document.cookie.split("; ").find((row) => row.startsWith("i18next"))?.split("=")[1] ?? "ro")
    const [active, setActive] = useState('');
    const [toggle, setToggle] = useState(false);
    //change nav color when scrolling
    const [color, setColor] = useState(false);

    const navLinks = t("Navbar", { returnObjects: true })

    const handleLanguageChange = (language) => {
        setCurrentLanguageCode(language);
        i18next.changeLanguage(language);
        const theDropdown = FlowbiteInstances.getInstance('Dropdown', 'dropdown');
        theDropdown.hide();
    }

    const changeColor = () => {
        if (window.scrollY >= 40)
            setColor(true);
        else
            setColor(false);
    }

    window.addEventListener('scroll', changeColor);

    while (!ready) {
        return null;
    }

    return (
        <nav
            className={`${color ? "bg-zinc-900" : "bg-navBarBg"} bg-navBarBg w-full top-0 fixed ease-in-out duration-700 z-20`}
        >

            <div
                className='max-w-7xl mx-auto'
            >
                <AnimatePresence>
                    {!color && (
                        <motion.div className='hidden sm:block'
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20, transition: { duration: 0.5 } }}
                        >
                            <ul className='flex gap-3 items-center justify-end py-2 relative'>
                                <li>
                                    <Phone className='w-[1.5rem] text-secondary h-auto object-contain' />
                                </li>
                                <li>
                                    <a href="tel:+40744851882" className='text-white text-[0.9rem] no-underline'>+40 744 851 882</a>
                                </li>
                                <li>
                                    <div className='w-[2px] h-[40px] separator-bg'></div>
                                </li>
                                <li key="appointment">
                                    <AppointmentButton className={style.navbarProgrammingButton} />
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className='w-full flex justify-between items-center  py-3 px-3'>
                    <div className='flex'>
                        <Link
                            to='/'
                            // className='text-primary font-medium text-[1.4rem] relative'
                            className='font-dance relative text-[1.4rem] text-primary'
                            onClick={() => { setActive(''); window.scrollTo(0, 0) }}
                        >
                            RUSA și Asociații
                        </Link>
                    </div>

                    <ul id="navList" className='hidden sm:flex items-center gap-[3vw]'>
                        {navLinks.map((link) => (
                            <li
                                key={link.id}
                                className={`${active === link.id ? "text-secondary" : "text-primary"} text-[1rem] cursor-pointer hover:text-secondary transition-colors duration-200`}
                                onClick={() => setActive(link.id)}
                            >
                                <a href={`#${link.id}`} className='relative'>{t(link.name)}</a>
                            </li>
                        ))}

                        {/* country flags */}
                        <li key="countries">
                            <button id="countryDropdown"
                                data-dropdown-toggle="dropdown"
                                data-dropdown-trigger="click"
                            >
                                <ReactCountryFlag countryCode={currentLanguageCode} svg />
                            </button>
                            {/* Dropdown Menu */}
                            <div id="dropdown" className='hidden'>
                                <ul
                                    aria-labelledby="countryDropdown"
                                    className='-mt-2'>
                                    {languages.filter(language => language.code !== currentLanguageCode).map((language) => (
                                        <li key={language.code}
                                            onClick={() => handleLanguageChange(language.code)}

                                        >
                                            <ReactCountryFlag
                                                countryCode={language.code}
                                                svg
                                            />
                                        </li>
                                    )
                                    )}
                                </ul>

                            </div>

                        </li>
                    </ul>

                    {/* blur background when mobile menu is opened */}
                    <div className={toggle ? 'fixed inset-0 backdrop-filter backdrop-blur-sm' : "hidden"}>
                    </div>
                    {/* mobile */}
                    <div className='sm:hidden flex'>
                        <img
                            src={menu}
                            alt="menu"
                            className='w-[20px]  object-contain cursor-pointer'
                            onClick={() => { setToggle(!toggle) }}
                        />
                    </div>

                    <motion.div
                        variants={sidebarVariants}
                        initial={false}
                        animate={toggle ? "opened" : "closed"}
                        className={` fixed flex-col top-0 right-0 bg-[#333333] w-[50%] h-full items-center ease-in-out duration-500 `}>

                        <img
                            src={close}
                            alt="close"
                            className='w-[20px] h-auto mt-2 ml-auto mr-2 object-contain cursor-pointer '
                            onClick={() => { setToggle(!toggle) }}
                        />

                        <motion.ul
                            variants={mobileUlVariant}
                            initial="closed"
                            animate={toggle ? "opened" : "closed"}
                            className='w-full px-4 py-3'>

                            {navLinks.map((link) => (
                                <motion.li
                                    variants={liVariants}
                                    key={link.id}
                                    className="py-3 border-b border-b-[#4b4b4b] text-[#c69c67]"
                                >
                                    <a href={`#${link.id}`} className='relative'>{t(link.name)}</a>
                                </motion.li>
                            ))}
                            <motion.li
                                variants={liVariants}
                                key="appointmentMobile"
                                className='text-center py-3'
                            >
                                <AppointmentButton className={style.navbarProgrammingButton} />
                            </motion.li>
                            <motion.li
                                variants={liVariants}
                                className='flex items-center justify-center gap-2 p-2'>
                                <Phone className='w-[1.5rem] text-secondary h-auto object-contain' />
                                <span className='text-white text-[0.9rem]'>+40 744 851 882</span>
                            </motion.li>
                            <motion.li
                                variants={liVariants}
                                className='flex items-center justify-center gap-3 p-2'>
                                {languages.map((language) => (
                                    <ReactCountryFlag
                                        countryCode={language.code}
                                        onClick={() => handleLanguageChange(language.code)}
                                        svg
                                    />
                                )
                                )}
                            </motion.li>

                        </motion.ul>
                    </motion.div>
                </div>
            </div>

        </nav >
    )
}

export default Navbar