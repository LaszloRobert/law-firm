import React from 'react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();
    return (
        <footer className='gradient text-primary p-1 md:p-3 text-xs md:text-sm flex flex-col md:flex-row justify-center items-center'>
            <span>
                {`© ${currentYear} `}
                <span className='font-bold tracking-wider'>
                    Rusa și Asociații
                </span>
            </span>
            <span className='hidden md:flex mx-1'>|</span>
            <span>
                {` ${t('Footer.createdBy')}`}
            </span>
        </footer>
    )
}

export default Footer