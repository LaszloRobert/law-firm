import React, { useState, useEffect } from 'react';
import { team } from "../constants"
import { motion } from 'framer-motion'
import { SectionWrapper } from '../hoc'
import { fadeIn } from '../utils/motion'
import { useTranslation } from 'react-i18next'



const Team = () => {
    return (
        <div>
            <div className='grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-x-hidden'>
                {team.map((person, index) => (
                    <TeamCard key={index} index={index} person={person} />
                ))}
            </div>
        </div>

    )
}

const TeamCard = ({ index, person }) => {
    const { t } = useTranslation();
    const [isLargerThanMd, setIsLargerThanMd] = useState(false);
    const checkScreenSize = () => {
        // Tailwind's 'md' breakpoint is 768px by default
        setIsLargerThanMd(window.innerWidth > 768);
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        // Cleanup listener on component unmount
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);
    return (
        <div
            className="mb-6 lg:mb-0"
            variants={fadeIn("left", "spring", index * 0.5, 0.75)}
        >
            {isLargerThanMd ? (
                <motion.div
                    variants={fadeIn("left", "spring", index * 0.5, 0.75)}
                    className="block mb-2 rounded-lg bg-[#e1dfd2] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                    <div className="relative overflow-hidden bg-cover bg-no-repeat">
                        <img
                            alt="Avocati din Cluj Napoca - Rusa si Asociatii"
                            src={person.icon}
                            className="rounded-t-lg" />
                        <svg className="absolute text-[#e1dfd2] left-0 -bottom-1" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320">
                            <path fill="currentColor"
                                d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                            </path>
                        </svg>
                    </div>
                    <div className="-mt-4 p-6 text-center">
                        <h5 className="mb-2 text-lg font-bold">{person.title}</h5>
                        <p className="text-neutral-500">{t(`${person.description}`)}</p>
                        <p className='text-secondary'>{person.phone}</p>
                        <p className='text-neutral-500'>{person.email}</p>
                    </div>
                </motion.div >
            ) : (
                <div

                    className="block mb-2 rounded-lg bg-[#e1dfd2] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                    <div className="relative overflow-hidden bg-cover bg-no-repeat">
                        <img
                            alt="Avocati din Cluj Napoca - Rusa si Asociatii"
                            src={person.icon}
                            className="rounded-t-lg" />
                        <svg className="absolute text-[#e1dfd2] left-0 -bottom-1" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1440 320">
                            <path fill="currentColor"
                                d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                            </path>
                        </svg>
                    </div>
                    <div className="-mt-4 p-6 text-center">
                        <h5 className="mb-2 text-lg font-bold">{person.title}</h5>
                        <p className="text-neutral-500">{t(`${person.description}`)}</p>
                        <p className='text-secondary'>{person.phone}</p>
                        <p className='text-neutral-500'>{person.email}</p>
                    </div>
                </div >
            )
            }

        </div >
    )
}




export default SectionWrapper(Team, "team")