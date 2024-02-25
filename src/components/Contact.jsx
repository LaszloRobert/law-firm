import { useRef, useState } from "react";
import { SectionWrapper } from '../hoc'
import { textVariant, fadeIn } from '../utils/motion'
import React from 'react'
import { style } from '../style'
import { motion, useInView } from "framer-motion"
import { location, phone, email } from "../assets"
import emailjs from '@emailjs/browser'
import { useTranslation } from "react-i18next";
import LocationSVG from "../assets/location.svg?react"
import EmailSVG from "../assets/email.svg?react"
import PhoneSVG from "../assets/phone.svg?react"


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
        phone: '',
        comment: ''
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
        <div className="max-w-7xl mx-auto">
            {/* <div className="bg-sectionBg absolute bg-cover w-full h-auto inset-0 z-[-1]"></div> */}
            <div className="bg-contact-bg bg-cover absolute top-0 left-0 right-0 bottom-0 z-[-1] "> </div>
            <div className="bg-contactOverlay w-full h-full absolute top-0 right-0 bottom-0 left-0  z-[-1]"></div>
            <motion.div variants={textVariant()}>
                <h2 className={`${style.sectionTitles} section-title-underline`}>{t("SectionTitles.contactTitle")}</h2>
            </motion.div>
            <div className="flex justify-center gap-1">
                <div id="form" className="w-1/2">
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 grid-rows- gap-4" >
                        <input className={style.inputsForm} type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                        <input className={`${style.inputsForm} justify-self-end`} type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
                        <input className={style.inputsForm} type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
                        <input className={`${style.inputsForm} justify-self-end`} type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
                        <textarea className="col-span-2 text-[14px] rounded border-1 border-gray-400 outline-none focus:ring-0 focus:border-secondary resize-none" rows="7" name="comment" placeholder="Comment" value={form.comment} onChange={handleChange} required />
                        <input type="file" />
                        <button className="bg-secondary leading-9 text-[14px] text-white w-[120px] col-start-2 justify-self-end border rounded hover:bg-white hover:text-secondary hover:scale-110 duration-200" type="submit">SUBMIT</button>
                    </form>
                </div>

                <div id="cards"
                    className="flex  sm:flex-col gap-4 w-1/2 flex-row sm:gap-8 justify-center items-center overflow-x-hidden"
                >
                    <Card Icon={LocationSVG} title={t("GetInTouch.Address")} text={"Calea Dorobanților 22, Cluj-Napoca 400121"} />
                    <Card Icon={PhoneSVG} title={t("GetInTouch.Phone")} text={"+40 744 851 882"} />
                    <Card Icon={EmailSVG} title={t("GetInTouch.Email")} text={"rusa.office@yahoo.com"} />
                </div>
            </div >

            <div className="bg-title-separator-big bg-cover h-[10px] mt-20 mb-10 "></div>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.6488675780297!2d23.59954431224158!3d46.77181727100507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490e9e5df8df25%3A0xe3ece6f1e96e166a!2sRusa%20Victor!5e0!3m2!1sro!2sro!4v1708861556769!5m2!1sro!2sro4"
                className="w-full h-[400px] rounded-lg"
                allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div >

    )
}

const Card = ({ Icon, title, text }) => (
    <div className="flex shadow-md shadow-secondary rounded justify-around items-center h-[100px] w-[60%] p-6 duration-200 card">
        <Icon
            className="w-10 h-10  text-secondary icon"
        />
        <div className="w-[200px] p-2 ml-2">
            <h2 className="font-bold mb-2 mx-auto w-full">{title}</h2>
            <p>{text}</p>
        </div>

    </div>
)

export default SectionWrapper(Contact, "#contact")

