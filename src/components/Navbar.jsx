import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { navLinks } from '../constants'
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from "react-country-flag"
import i18next from 'i18next'
import { style } from '../style'
import { close, menu } from "../assets"


const Navbar = () => {
    const [currentLanguageCode, setCurrentLanguageCode] = useState(
        document.cookie.split("; ").find((row) => row.startsWith("i18next"))?.split("=")[1] ?? "ro")
    const [active, setActive] = useState('');
    const [toggle, setToggle] = useState(false);

    //change nav color when scrolling
    const [color, setColor] = useState(false);

    const { t } = useTranslation();

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

    return (
        <nav className={`${color ? "bg-zinc-900" : "bg-transparent"} w-full top-0 fixed ease-in-out duration-700`}>
            <div className='w-full flex justify-between items-center mx-auto max-w-7xl py-3 px-3'>
                <div className='flex'>
                    <Link
                        to='/'
                        className='text-primary font-medium text-[1.4rem]'
                        onClick={() => { setActive(''); window.scrollTo(0, 0) }}
                    >
                        Rusa si Asociatii
                    </Link>
                </div>

                <ul className='hidden sm:flex items-center gap-[3vw]'>
                    {navLinks.map((link) => (
                        <li
                            key={link.id}
                            className={`${active === link.id ? "text-red-100" : "text-primary"} font-medium text-[1.1rem] cursor-pointer hover:animate-pulse 
                                                                 hover:text-gray-200`}
                            onClick={() => setActive(link.id)}
                        >
                            <a href="#about" className="">{t(link.languageID)}</a>
                        </li>
                    ))}
                    <li>
                        <button id="countryDropdown"
                            data-dropdown-toggle="dropdown"
                            data-dropdown-trigger="click"
                        >
                            <ReactCountryFlag countryCode={currentLanguageCode} svg />
                        </button>
                        {/* Dropdown Menu */}
                        <div id="dropdown" className='hidden'>
                            <ul aria-labelledby="countryDropdown">
                                <li onClick={() => handleLanguageChange(currentLanguageCode === "ro" ? "gb" : "ro")}>
                                    <ReactCountryFlag
                                        countryCode={currentLanguageCode === "ro" ? "gb" : "ro"}
                                        svg
                                    />
                                </li>
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
                                <a href="#about" className="">{t(link.languageID)}</a>
                            </li>
                        ))}
                        <li className='flex gap-3 mt-3 cursor-pointer'>
                            <ReactCountryFlag countryCode='ro' svg onClick={() => handleLanguageChange(currentLanguageCode === "ro" ? "gb" : "ro")} />
                            <ReactCountryFlag countryCode='gb' svg onClick={() => handleLanguageChange(currentLanguageCode === "ro" ? "gb" : "ro")} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Navbar