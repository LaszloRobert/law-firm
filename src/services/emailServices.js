import emailjs from '@emailjs/browser'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const userId = import.meta.env.VITE_EMAILJS_USER_ID

export const sendEmail = (formData, attachmentURL) => {
    const templateParams = {
        from_name: formData.name,
        phone: formData.phone,
        email_address: formData.email,
        subject: formData.subject,
        message: formData.comment,
        attachment: attachmentURL
    }

    return emailjs.send(serviceId, templateId, templateParams, userId)
}