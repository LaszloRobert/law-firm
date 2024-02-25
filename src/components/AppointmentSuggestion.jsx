import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getCalApi } from "@calcom/embed-react";

const AppointmentSuggestion = () => {
    const { t } = useTranslation();

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

    return (
        <div className="absolute -top-6 left-1/2  -translate-x-1/2 max-w-7xl">
            <div className='gradient rounded-lg opacity-90 p-9 w-[1200px]'>
                <div className='flex justify-evenly'>
                    <p className='text-primary text-[27px] font-sembold tracking-wide'>
                        {t("AppointmentSuggestion.text")}
                    </p>
                    <button
                        className='text-white bg-secondary px-3 py-1 text-[1.2rem] hover:bg-white !important'
                    >
                        {t("Appointment.name")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AppointmentSuggestion