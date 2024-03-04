import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { getCalApi } from "@calcom/embed-react";

const AppointmentSuggestion = () => {
    const { t } = useTranslation();

    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", { "theme": "dark", "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, [])

    return (
        <div className="relative -top-8 left-1/2 -translate-x-1/2 w-full sm:w-[80%] md:w-[1200px]">
            <div className='gradient sm:rounded-lg opacity-90 p-6 md:p-9 flex flex-col md:flex-row justify-evenly'>

                <p className='text-primary text-[27px] tracking-wide mx-auto md:mx-0'>
                    {t("AppointmentSuggestion.text")}
                </p>
                <button
                    data-cal-namespace=""
                    data-cal-link="rusasiasociatii/30min"
                    data-cal-config='{"layout":"month_view"}'
                    className='text-white bg-secondary py-2 text-[1.2rem] hover:bg-white hover:text-secondary w-[50%] sm:w-[25%] md:w-[15%] mx-auto md:mx-0 rounded-md mt-5 md:mt-0'
                >
                    {t("Appointment.name")}
                </button>
            </div>
        </div>
    )
}

export default AppointmentSuggestion