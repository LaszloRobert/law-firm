import React from 'react'
import { team } from "../constants"
import { motion } from 'framer-motion'
import { SectionWrapper } from '../hoc'
import { textVariant, fadeIn } from '../utils/motion'
import { style } from '../style'
import TitleSeparator from "../assets/title-separator-small.svg?react"

const Team = () => {
    return (
        <div>
            <motion.div variants={textVariant(0)}
                className='flex flex-col items-center mb-[60px]'
            >
                <h2 className={`${style.sectionTitles}`}>Echipa</h2>
                <TitleSeparator className="-mt-[145px] -mb-[100px] text-secondary" />

            </motion.div>
            <div className='-z-10 grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-x-hidden'>
                {team.map((person, index) => (
                    <TeamCard key={index} index={index} person={person} />
                ))}
            </div>
        </div>

    )
}

const TeamCard = ({ index, person }) => (
    <motion.div
        class="mb-6 lg:mb-0"
        variants={fadeIn("left", "spring", index * 0.5, 0.75)}
    >

        <div
            class="block  mb-2 rounded-lg bg-[#e1dfd2] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div class="relative overflow-hidden bg-cover bg-no-repeat">
                <img
                    alt="Avocati din Cluj Napoca - Rusa si Asociatii"
                    src={person.icon}
                    class="rounded-t-lg" />
                <svg class="absolute text-[#e1dfd2] left-0 -bottom-1" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320">
                    <path fill="currentColor"
                        d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                    </path>
                </svg>
            </div>
            <div class="-mt-4 p-6 text-center">
                <h5 class="mb-2 text-lg font-bold">{person.title}</h5>
                <p class="text-neutral-500">{person.description}</p>
                <p className='text-secondary'>{person.phone}</p>
                <p className='text-neutral-500'>{person.email}</p>
            </div>
        </div>
    </motion.div>
)




export default SectionWrapper(Team, "team")