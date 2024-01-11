import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from "react-country-flag"
import i18next from 'i18next'
import { languages } from '../constants'
import { close, menu } from "../assets"
import { getCalApi } from "@calcom/embed-react";


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

    return (
        <nav className={`${color ? "bg-zinc-900" : "bg-navBarBg"} w-full top-0 fixed ease-in-out duration-700 z-20`}>
            <div className='w-full flex justify-between items-center mx-auto max-w-7xl py-3 px-3'>
                <div className='flex'>
                    <Link
                        to='/'
                        className='text-primary font-medium text-[1.4rem] relative'
                        onClick={() => { setActive(''); window.scrollTo(0, 0) }}
                    >
                        Rusa si Asociatii
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
                    <li key="appointment">
                        <button
                            data-cal-link="robert-laszlo/programare"
                            data-cal-config='{"layout":"month_view"}'
                            className=' text-secondary font-medium border border-secondary px-3 py-1  text-[1.2rem] cursor-pointer hover:bg-secondary hover:text-primary transition-colors duration-200'
                        >
                            {t("Appointment.name")}
                        </button>
                    </li>
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
                            <ul aria-labelledby="countryDropdown">
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
        </nav >
    )
}

export default Navbar