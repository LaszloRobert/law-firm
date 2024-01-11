import { useRef, useState } from "react";
import React from 'react'
import { style } from '../style'
import { motion, useInView } from "framer-motion"
import { location, phone, email } from "../assets"
import emailjs from '@emailjs/browser'
import { useTranslation } from "react-i18next";

const variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1
        }
    }
}

const Contact = () => {
    const { t } = useTranslation();
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {

        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        emailjs.send("service_7uw4dh8", "template_4ebf4wm",
            {
                from_name: form.name,
                email: form.email,
                message: form.message
            },
            'zgKOkvUsUNGWwXH2z')
            .then(() => {
                setLoading(false)
                alert("I'll back to you as soon as posibil")
                setForm({
                    name: '',
                    email: '',
                    message: '',
                })
            },
                (error) => {
                    setLoading(false)
                    alert(error)
                    alert("Something went wrong");
                })
    }

    const ref = useRef()
    const isInView = useInView(ref, { margin: "-100px" });
    return (
        <motion.section ref={ref} id="Contact" className='bg-sectionBg h-full w-full relative pt-4' initial="initial" whileInView="animate" variants={variants}>
            <h1 className="text-center text-[40px]">Contact</h1>
            <div className='flex justify-center gap-10 mt-7 h-[35vh]' variants={variants}>
                <div id="map" className="w-[50%]">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.6488675658197!2d23.59955504136335!3d46.771817271245716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490e9e5df8df25%3A0xe3ece6f1e96e166a!2sRusa%20Victor!5e0!3m2!1sen!2sro!4v1701012504918!5m2!1sen!2sro"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                    >
                    </iframe>
                </div>
                <div id='info' className="flex flex-col justify-evenly">
                    <div id="location">
                        <div className="flex items-center gap-3">
                            <img
                                src={location}
                                alt="location"
                                className="w-7 h-7"
                            />
                            <h1 className={style.contactInfoTitles}>Sediu</h1>
                        </div>
                        <div className={style.contactInfoText}>
                            <p>Rusa si Asociatii</p>
                            <p>Calea Dorobantiilor 22</p>
                            <p>Cluj-Napoca, Romania</p>
                        </div>
                    </div>
                    <div id="Email">
                        <div className="flex items-center gap-3">
                            <img
                                src={email}
                                alt="location"
                                className="w-7 h-7"
                            />
                            <h1 className={style.contactInfoTitles}>Email</h1>
                        </div>
                        <div className={style.contactInfoText}>
                            <p>robertolaszlo@yahoo.com</p>
                        </div>
                    </div>
                    <div id="Phone">
                        <div className="flex items-center gap-3">
                            <img
                                src={phone}
                                alt="location"
                                className="w-7 h-7"
                            />
                            <h1 className={style.contactInfoTitles}>Telefon</h1>
                        </div>
                        <div className={style.contactInfoText}>
                            <p>+40.736116983</p>

                        </div>
                    </div>
                </div>
            </div>

            <div id='form' className="mt-10 flex justify-center items-center">
                {/* <motion.div
                    className='absolute mx-auto  stroke-primary'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0 }}
                    transition={{ delay: 3, duration: 1 }}
                >
                    <svg width="450px" height="450px" viewBox="-2 -1 33.666 32.666" xmlns="http://www.w3.org/2000/svg">
                        <motion.path
                            strokeWidth={0.4}
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={isInView && { pathLength: 1 }}
                            transition={{ duration: 3 }}
                            d="M14.5 6.5C15.2372 6.64382 15.9689 6.96892 16.5 7.5C17.0311 8.03108 17.3562 8.76284 17.5 9.5M15 3C16.5315 3.17014 17.9097 3.91107 19 5C20.0903 6.08893 20.8279 7.46869 21 9M20.9995 16.4767V19.1864C21.0037 20.2223 20.0723 21.0873 19.0265 20.9929C10.0001 21 3.00006 13.935 3.00713 4.96919C2.91294 3.92895 3.77364 3.00106 4.80817 3.00009H7.52331C7.96253 2.99577 8.38835 3.151 8.72138 3.43684C9.66819 4.24949 10.2772 7.00777 10.0429 8.10428C9.85994 8.96036 8.99696 9.55929 8.41026 10.1448C9.69864 12.4062 11.5747 14.2785 13.8405 15.5644C14.4272 14.9788 15.0274 14.1176 15.8851 13.935C16.9855 13.7008 19.7615 14.3106 20.5709 15.264C20.858 15.6021 21.0105 16.0337 20.9995 16.4767Z">

                        </motion.path>
                    </svg>
                </motion.div> */}
                <motion.form
                    className='flex flex-col gap-5 w-[450px]'
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    animate={isInView && { opacity: 1 }}
                    transition={{ delay: 4, duration: 1 }}
                >
                    <input
                        type='text'
                        name="name"
                        value={form.name}
                        placeholder={t('Contact.Name')}
                        className={style.input}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type='email'
                        name="email"
                        value={form.email}
                        placeholder={t('Contact.Email')}
                        className={style.input}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        rows={8}
                        name="message"
                        value={form.message}
                        placeholder={t('Contact.Message')}
                        className={style.input}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className='p-3 bg-primary border-none cursor-pointer font-medium'>
                        {loading ? "Seding..." : "Send"}
                    </button>
                </motion.form>
            </div>
        </motion.section >
    )
}

export default Contact

