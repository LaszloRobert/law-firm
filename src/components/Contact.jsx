import { useState } from "react";
import { SectionWrapper } from '../hoc'
import { textVariant, slideIn } from '../utils/motion'
import React from 'react'
import { style } from '../style'
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next";
import LocationSVG from "../assets/location.svg?react"
import EmailSVG from "../assets/email.svg?react"
import PhoneSVG from "../assets/phone.svg?react"
import UploadSVG from "../assets/upload.svg?react"
import BouncingCirclesSVG from "../assets/bouncing-circles.svg?react"
import { uploadFile } from "../services/firebaseService"
import { sendEmail } from "../services/emailServices"
import { toast } from 'react-toastify';


const Contact = () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileName, setFileName] = useState('');
    const [downloadURL, setDownloadURL] = useState('');
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
    const [isHovered, setIsHovered] = useState(false);

    const bounceAnimation = {
        y: [0, -2, 0, 2, 0],
        transition: { duration: .5, ease: 'easeInOut' }
    };
    const handleChange = async (e) => {
        const { name, value, files } = e.target
        if (name === 'attachment' && files.length > 0) {
            handleFileUpload(files[0]);
        } else {
            setForm({ ...form, [name]: value });
        }
    }

    const handleFileUpload = (file) => {
        setFileName(file.name); // Set the file name immediately for UI feedback
        uploadFile(file, setUploadProgress)
            .then((downloadURL) => {
                setDownloadURL(downloadURL); // Update the state with the URL on success
            })
            .catch((error) => {
                toast.error(t("GetInTouch.UploadFileError")); // Display a toast notification for the error
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        sendEmail(form, downloadURL)
            .then(() => {
                setLoading(false)
                toast.success(t("GetInTouch.EmailSent"));
                setForm({
                    name: '',
                    email: '',
                    subject: '',
                    phone: '',
                    comment: '',
                    attachment: ''
                })
            },
                () => {
                    setLoading(false)
                    toast.error(t("GetInTouch.EmailError"));
                })
    }


    return (
        <div className="max-w-7xl mx-auto">
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
                    <form id="contactForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4" >
                        <input className={style.inputsForm} type="text" name="name" placeholder={t("GetInTouch.Name")} value={form.name} onChange={handleChange} required />
                        <input className={`${style.inputsForm}`} type="email" name="email" placeholder={t("GetInTouch.Email")} value={form.email} onChange={handleChange} required />
                        <input className={style.inputsForm} type="text" name="subject" placeholder={t("GetInTouch.Subject")} value={form.subject} onChange={handleChange} required />
                        <input className={`${style.inputsForm} justify-self-end`} type="text" name="phone" placeholder={t("GetInTouch.Phone")} value={form.phone} onChange={handleChange} required />
                        <textarea className="col-span-2 text-[14px] rounded border-1 border-gray-400 outline-none focus:ring-0 focus:border-secondary resize-none" rows="7" name="comment" placeholder={t("GetInTouch.Message")} value={form.comment} onChange={handleChange} required />
                        <label htmlFor="file-upload"
                            className="bg-white text-[14px] flex items-center justify-between cursor-pointer col-span-2 border border-1 border-gray-400 rounded p-2 text-[#7e838f]"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}>
                            {uploadProgress === 100 ? fileName : uploadProgress > 0 ? t("UploadFile.UploadingFile") : t("GetInTouch.UploadFile")}
                            <input id="file-upload" type="file" className="hidden" name="attachment" onChange={handleChange} />
                            {uploadProgress > 0 && uploadProgress < 100 ? (
                                <BouncingCirclesSVG className="w-8 text-secondary" /> // Show spinner when upload is in progress
                            ) : (
                                <motion.div animate={isHovered ? bounceAnimation : {}}>
                                    <UploadSVG />
                                </motion.div>
                            )}
                        </label>
                        {/* Upload progress indicator */}
                        {uploadProgress > 0 && (
                            <motion.div className="relative bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 col-span-2">
                                <motion.div className="bg-secondary h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }} />
                            </motion.div>
                        )}
                        <button className="bg-secondary leading-9 text-[14px] text-white w-[120px] col-start-2 justify-self-end border rounded hover:bg-white hover:text-secondary hover:scale-110 duration-200" type="submit">{t("GetInTouch.SubmitButton")}</button>
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

export default SectionWrapper(Contact, "contact")

