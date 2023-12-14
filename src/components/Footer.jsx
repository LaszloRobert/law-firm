import React from 'react'
import { useTranslation } from 'react-i18next'

const Footer = () => {
    const { t } = useTranslation();

    return (
        <section id="Footer">
            <div className='bg-black text-primary text-center sm:p-2 p-1 text-[12px] '>
                <p className=''>{t('Footer.Developed')}</p>
            </div>
        </section>

    )
}

export default Footer