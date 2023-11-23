import { useRef, useState } from "react";
import React from 'react'
import { style } from '../style'
import { motion, useInView } from "framer-motion"

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

    const ref = useRef()
    const isInView = useInView(ref, { margin: "-100px" });
    return (
        <motion.section ref={ref} id="Contact" className='bg-[#ebd2ba] h-full w-full' initial="initial" whileInView="animate" variants={variants}>
            <motion.div className='flex items-center justify-around mx-auto max-w-7xl' variants={variants}>
                <motion.div id='text' className='flex flex-col gap-3'>
                    <motion.div variants={variants}>
                        <h2>Mail</h2>
                        <span className={style.span}>robertolaszlo@yahoo.com</span>
                    </motion.div>
                    <motion.div variants={variants} >
                        <h2>Mail</h2>
                        <span>robertolaszlo@yahoo.com</span>
                    </motion.div>
                    <motion.div variants={variants}>
                        <h2>Mail</h2>
                        <span>robertolaszlo@yahoo.com</span>
                    </motion.div>
                </motion.div>

                <div id='form' className="mt-10">
                    <motion.div
                        className='absolute mx-auto  stroke-primary'
                        initial={{ opacity: 1 }}
                        whileInView={{ opacity: 0 }}
                        transition={{ delay: 3, duration: 1 }}
                    >
                        {/* <img src={phone} alt="contact-phone" className='stroke-red-200' /> */}
                        <svg width="450px" height="450px" viewBox="-2 -1 33.666 32.666" xmlns="http://www.w3.org/2000/svg">
                            {/* <motion.path
                                strokeWidth={0.2}
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={isInView && { pathLength: 0.6 }}
                                transition={{ duration: 3 }}
                                d="M5.73268 2.043C6.95002 0.832583 8.95439 1.04804 9.9737 2.40962L11.2347 4.09402C12.0641 5.20191 11.9909 6.75032 11.0064 7.72923L10.7676 7.96665C10.7572 7.99694 10.7319 8.09215 10.76 8.2731C10.8232 8.6806 11.1635 9.545 12.592 10.9654C14.02 12.3853 14.8905 12.7253 15.3038 12.7887C15.4911 12.8174 15.5891 12.7906 15.6194 12.78L16.0274 12.3743C16.9026 11.5041 18.2475 11.3414 19.3311 11.9305L21.2416 12.9691C22.8775 13.8584 23.2909 16.0821 21.9505 17.4148L20.53 18.8273C20.0824 19.2723 19.4805 19.6434 18.7459 19.7119C16.9369 19.8806 12.7187 19.6654 8.28659 15.2584C4.14868 11.144 3.35462 7.556 3.25415 5.78817L4.00294 5.74562L3.25415 5.78817C3.20335 4.89426 3.62576 4.13796 4.16308 3.60369L5.73268 2.043ZM8.77291 3.30856C8.26628 2.63182 7.322 2.57801 6.79032 3.10668L5.22072 4.66737C4.8908 4.99542 4.73206 5.35695 4.75173 5.70307C4.83156 7.10766 5.47286 10.3453 9.34423 14.1947C13.4057 18.2331 17.1569 18.3536 18.6067 18.2184C18.9029 18.1908 19.1975 18.0369 19.4724 17.7636L20.8929 16.3511C21.4704 15.777 21.343 14.7315 20.5252 14.2869L18.6147 13.2484C18.0871 12.9616 17.469 13.0562 17.085 13.438L16.6296 13.8909L16.1008 13.359C16.6296 13.8909 16.6289 13.8916 16.6282 13.8923L16.6267 13.8937L16.6236 13.8967L16.6171 13.903L16.6025 13.9166C16.592 13.9262 16.5799 13.9367 16.5664 13.948C16.5392 13.9705 16.5058 13.9959 16.4659 14.0227C16.3858 14.0763 16.2801 14.1347 16.1472 14.1841C15.8764 14.285 15.5192 14.3392 15.0764 14.2713C14.2096 14.1384 13.0614 13.5474 11.5344 12.0291C10.0079 10.5113 9.41194 9.36834 9.2777 8.50306C9.20906 8.06061 9.26381 7.70331 9.36594 7.43225C9.41599 7.29941 9.47497 7.19378 9.5291 7.11389C9.5561 7.07405 9.58179 7.04074 9.60446 7.01368C9.6158 7.00015 9.6264 6.98817 9.63604 6.9777L9.64977 6.96312L9.65606 6.95666L9.65905 6.95363L9.66051 6.95217C9.66122 6.95146 9.66194 6.95075 10.1908 7.48258L9.66194 6.95075L9.94875 6.66556C10.3774 6.23939 10.4374 5.53194 10.0339 4.99297L8.77291 3.30856Z" >
                            </motion.path> */}

                            <motion.path
                                strokeWidth={0.4}
                                fill="none"
                                initial={{ pathLength: 0 }}
                                animate={isInView && { pathLength: 1 }}
                                transition={{ duration: 3 }}
                                d="M14.5 6.5C15.2372 6.64382 15.9689 6.96892 16.5 7.5C17.0311 8.03108 17.3562 8.76284 17.5 9.5M15 3C16.5315 3.17014 17.9097 3.91107 19 5C20.0903 6.08893 20.8279 7.46869 21 9M20.9995 16.4767V19.1864C21.0037 20.2223 20.0723 21.0873 19.0265 20.9929C10.0001 21 3.00006 13.935 3.00713 4.96919C2.91294 3.92895 3.77364 3.00106 4.80817 3.00009H7.52331C7.96253 2.99577 8.38835 3.151 8.72138 3.43684C9.66819 4.24949 10.2772 7.00777 10.0429 8.10428C9.85994 8.96036 8.99696 9.55929 8.41026 10.1448C9.69864 12.4062 11.5747 14.2785 13.8405 15.5644C14.4272 14.9788 15.0274 14.1176 15.8851 13.935C16.9855 13.7008 19.7615 14.3106 20.5709 15.264C20.858 15.6021 21.0105 16.0337 20.9995 16.4767Z">

                            </motion.path>
                        </svg>
                    </motion.div>
                    <motion.form
                        className='flex flex-col gap-5'
                        initial={{ opacity: 0 }}
                        animate={isInView && { opacity: 1 }}
                        transition={{ delay: 4, duration: 1 }}
                    >
                        <input type='text' required placeholder='Name' className={style.input} />
                        <input type='email' required placeholder='Email' className={style.input} />
                        <textarea rows={8} placeholder='Message' className={style.input} />
                        <button className='p-3 bg-primary border-none cursor-pointer font-medium'>Submit</button>
                    </motion.form>
                </div>
            </motion.div>
        </motion.section>
    )
}

export default Contact

