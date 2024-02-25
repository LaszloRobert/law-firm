import React from 'react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();
    return (
        <section id="Footer">
            <div className='gradient text-primary  sm:p-2 p-1 text-[12px] flex justify-center'>
                <p className=''>{t('Footer.character')}</p>
                <p className='ml-1 mr-2'>{currentYear}</p>
                <p className='font-bold mr-2 tracking-wider'>{t('Footer.main')}</p>
                <p className=''>{t('Footer.createdBy')}</p>
            </div>
        </section>

    )
}

export default Footer