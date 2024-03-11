import { useRef, useState } from "react";
import { SectionWrapper } from '../hoc'
import { textVariant, fadeIn, slideIn } from '../utils/motion'
import React from 'react'
import { style } from '../style'
import { motion } from "framer-motion"
import emailjs from '@emailjs/browser'
import { useTranslation } from "react-i18next";
import LocationSVG from "../assets/location.svg?react"
import EmailSVG from "../assets/email.svg?react"
import PhoneSVG from "../assets/phone.svg?react"
import UploadSVG from "../assets/upload.svg?react"
import BouncingCirclesSVG from "../assets/bouncing-circles.svg?react"
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';

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
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileName, setFileName] = useState('');
    const [downloadURL, setDownloadURL] = useState('');
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Get a reference to the storage service
    const storage = getStorage(app);
    // const analytics = getAnalytics(app);
    const uploadFile = (file) => {
        return new Promise((resolve, reject) => {
            // Create a storage reference
            const storageRef = ref(storage, `uploads/${file.name}`);
            // Start the file upload
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Monitor the upload process
            uploadTask.on('state_changed',
                (snapshot) => {
                    // You can use snapshot to show upload progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    // Handle unsuccessful uploads
                    reject(error);
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    }

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

    const handleChange = async (e) => {
        toast.success('Email sent successfully!');
        const { name, value, files } = e.target
        if (name === 'attachment' && files.length > 0) {
            // Assuming there's a file input for uploading files
            const fileInput = document.querySelector('input[type="file"]');
            const file = fileInput.files[0]; // Get the file from the file inpu
            try {
                setFileName(file.name);
                const url = await uploadFile(file);
                setDownloadURL(url);
                console.log('File available at', downloadURL);
                // Now you can use the download URL for the file, for example, save it in your database or include it in an email
            } catch (error) {
                console.error("Error uploading file: ", error);
            }
        } else {
            setForm({ ...form, [name]: value });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        emailjs.send("service_kz9zjuf", "template_wzop37d",
            {
                from_name: form.name,
                phone: form.phone,
                email_address: form.email,
                subject: form.subject,
                message: form.comment,
                attachment: downloadURL
            },
            't2e_a-G-kHSqg2qF8')
            .then(() => {
                setLoading(false)
                toast.success('Email sent successfully!');
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
    const [isHovered, setIsHovered] = useState(false);

    const bounceAnimation = {
        y: [0, -2, 0, 2, 0],
        transition: { duration: .5, ease: 'easeInOut' }
    };
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

export default SectionWrapper(Contact, "contact")

