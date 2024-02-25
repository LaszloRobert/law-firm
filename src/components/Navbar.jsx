import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from "react-country-flag"
import i18next from 'i18next'
import { languages } from '../constants'
import { close, menu } from "../assets"
import { getCalApi } from "@calcom/embed-react";
import Phone from "../assets/phoneNavbar.svg?react"
import { motion } from 'framer-motion';

const Navbar = () => {
    const { t, ready } = useTranslation();

    const [currentLanguageCode, setCurrentLanguageCode] = useState(
        document.cookie.split("; ").find((row) => row.startsWith("i18next"))?.split("=")[1] ?? "ro")
    const [active, setActive] = useState('');
    const [toggle, setToggle] = useState(false);
    //change nav color when scrolling
    const [color, setColor] = useState(false);

    const navLinks = t("Navbar", { returnObjects: true })
    console.log(navLinks)
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

    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                theme: "dark",
                styles: {
                    branding: { brandColor: "#000000" }
                }
            });
        })();
    }, []);

    while (!ready) {
        return null;
    }

    const containerVariants = {
        initial: {
            opacity: 1,
            y: 0,
        },
        scrolled: {
            opacity: 0.5, // Example transformation, adjust as needed
            y: -50, // Moves the container up by 50px, adjust as needed
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.nav
            className={`${color ? "bg-zinc-900" : "bg-navBarBg"} bg-navBarBg w-full top-0 fixed ease-in-out duration-700 z-20`}
        >
            <motion.div
                className='max-w-7xl mx-auto'
                variants={containerVariants}
            >
                <motion.ul
                    className={` flex gap-3 items-center justify-end py-2 ${color ? "hidden" : "relative"}`}

                >
                    <li className=''>
                        <Phone
                            className='w-[1.5rem] text-secondary h-auto object-contain'
                        />
                    </li>
                    <li>
                        <span className='text-white text-[0.9rem]'>+40 744 851 882</span>
                    </li>
                    <li>
                        <div className='w-[2px] h-[40px] separator-bg'></div>
                    </li>
                    <li key="appointment">
                        <button
                            data-cal-link="robert-laszlo/programare"
                            data-cal-config='{"layout":"month_view"}'
                            className=' text-primary bg-secondary rounded-sm px-3 py-2 text-[0.9rem] font-thin tracking-wider cursor-pointer hover:bg-white hover:text-secondary hover:scale-110  duration-200'
                        >
                            {t("Appointment.name")}
                        </button>
                    </li>
                </motion.ul>
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

                    <ul className='hidden sm:flex items-center gap-[3vw]'>
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
                    <div className={toggle ? 'fixed top-0 right-0 left-0 bottom-0 backdrop-filter backdrop-blur-sm' : "hidden"}>
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

                    <div className={`${toggle ? 'translate-x-0' : 'translate-x-full'} fixed flex-col top-0 right-0 bg-[#333333] w-[50%] h-full items-center ease-in-out duration-500 `}>

                        <img
                            src={close}
                            alt="close"
                            className='w-[20px] h-auto mt-2 ml-auto mr-2 object-contain cursor-pointer '
                            onClick={() => { setToggle(!toggle) }}
                        />

                        <ul className='w-full px-4 py-3'>

                            {navLinks.map((link) => (
                                <li
                                    key={link.id}
                                    className="py-3 border-b border-b-[#4b4b4b] text-[#c69c67]"
                                >
                                    <a href={`#${link.id}`} className='relative'>{t(link.name)}</a>
                                </li>
                            ))}
                            <li className='flex gap-3 mt-3 cursor-pointer outline-none'>
                                {languages.map((language) => (
                                    <ReactCountryFlag
                                        countryCode={language.code}
                                        onClick={() => handleLanguageChange(language.code)}
                                        svg
                                    />
                                )
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </motion.nav >
    )
}

export default Navbar