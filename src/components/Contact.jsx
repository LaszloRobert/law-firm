import { useRef, useState } from "react";
import { SectionWrapper } from '../hoc'
import { textVariant, fadeIn, slideIn } from '../utils/motion'
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
        subject: '',
        phone: '',
        comment: '',
        attachment: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target
        if (name === 'attachment') {
            // console.log(e.target)
            // const file = e.target.files[0];
            // const reader = new FileReader();
            // reader.onloadend = () => {
            //     setForm({ ...form, [name]: reader.result });
            // };
            // reader.readAsDataURL(file);
            const file = e.target.files[0];
            const result = file.toDataURL();
        } else {
            setForm({ ...form, [name]: value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(form)

        emailjs.send("service_kz9zjuf", "template_wzop37d",
            {
                from_name: form.name,
                phone: form.phone,
                email_address: form.email,
                subject: form.subject,
                message: form.comment,
                attachment: form.attachment.split(",")[1]
            },
            't2e_a-G-kHSqg2qF8')
            .then(() => {
                setLoading(false)
                alert("I'll back to you as soon as posibil")
                setForm({
                    name: '',
                    email: '',
                    subject: '',
                    phone: '',
                    comment: '',
                    attachment: ''
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
            <div className="flex md:flex-row flex-col-reverse justify-around">
                <motion.div
                    id="form"
                    variants={slideIn("left", "tween", 0.4, 1)}
                >
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 auto-rows-min gap-4" >
                        <input className={style.inputsForm} type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                        <input className={`${style.inputsForm} justify-self-end`} type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
                        <input className={style.inputsForm} type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
                        <input className={`${style.inputsForm} justify-self-end`} type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
                        <textarea className="col-span-2 text-[14px] rounded border-1 border-gray-400 outline-none focus:ring-0 focus:border-secondary resize-none" rows="7" name="comment" placeholder="Comment" value={form.comment} onChange={handleChange} required />
                        <input type="file" className="" name="attachment" onChange={handleChange} />
                        {/* <label className="col-span-2 w-full bg-primary text-secondary rounded-md px-4 py-2 cursor-pointer inline-block">
                            <span>Upload a file</span>
                            <input type="file" className="hidden" name="attachment" />
                        </label> */}
                        <button className="bg-secondary leading-9 text-[14px] text-white w-[120px] col-start-2 justify-self-end border rounded hover:bg-white hover:text-secondary hover:scale-110 duration-200" type="submit">SUBMIT</button>
                    </form>
                </motion.div>

                <motion.div id="cards"
                    className="flex flex-col space-y-4 md:space-y-10 md:w-[30%] w-full mb-4 overflow-x-hidden"
                    variants={slideIn("right", "tween", 0.4, 1)}
                >
                    <Card Icon={LocationSVG} title={t("GetInTouch.Address")} text={"Calea Dorobanților 22, Cluj-Napoca 400121"} />
                    <Card Icon={PhoneSVG} title={t("GetInTouch.Phone")} text={"+40 744 851 882"} />
                    <Card Icon={EmailSVG} title={t("GetInTouch.Email")} text={"rusa.office@yahoo.com"} />
                </motion.div>
            </div >

            <div className="bg-title-separator-big bg-cover h-[10px] mt-20 mb-10 "></div>

            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2732.6488675780297!2d23.59954431224158!3d46.77181727100507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490e9e5df8df25%3A0xe3ece6f1e96e166a!2sRusa%20Victor!5e0!3m2!1sro!2sro!4v1708861556769!5m2!1sro!2sro4"
                className="w-full h-[400px] rounded-lg"
                allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div >

    )
}

const Card = ({ Icon, title, text }) => (
    <div className="flex  shadow-md shadow-secondary border border-secondary rounded justify-around items-center h-[100px] p-6 duration-200 card">
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

