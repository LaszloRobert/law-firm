import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { getCalApi } from "@calcom/embed-react";


const AppointmentButton = ({ className }) => {
    const { t } = useTranslation();
    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", { "theme": "dark", "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, [])

    return (
        <button
            data-cal-namespace=""
            data-cal-link="rusasiasociatii/30min"
            data-cal-config='{"layout":"month_view"}'
            className={`${className}`}
        >
            {t("Appointment.name")}
        </button>
    );
};

export default AppointmentButton;