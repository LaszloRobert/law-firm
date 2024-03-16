import React from 'react'
import { useTranslation } from 'react-i18next'
import AppointmentButton from './reusableComponents/AppointmentButton';

const AppointmentSuggestion = () => {
    const { t } = useTranslation();

    return (
        <div className="relative -top-8 left-1/2 -translate-x-1/2 w-full sm:w-[80%] md:w-[1200px] -mb-8 z-[2]">
            <div className='gradient sm:rounded-lg opacity-90 p-6 md:p-9 flex flex-col md:flex-row justify-evenly'>

                <p className='text-primary text-[27px] tracking-wide mx-auto md:mx-0'>
                    {t("AppointmentSuggestion.text")}
                </p>
                <AppointmentButton className={'text-white bg-secondary py-2 text-[1.2rem] tracking-wide hover:bg-white hover:text-secondary hover:scale-110 duration-200 w-[50%] sm:w-[25%] md:w-[15%] mx-auto md:mx-0 rounded-md mt-5 md:mt-0'} />

            </div>
        </div>
    )
}

export default AppointmentSuggestion