import React from 'react'
import { team } from "../constants"
import { motion } from 'framer-motion'
import { SectionWrapper } from '../hoc'
import { textVariant, fadeIn } from '../utils/motion'
import { style } from '../style'

const Team = () => {
    return (
        <>
            <motion.div variants={textVariant(0)} >
                <h2 className={`${style.sectionTitles} section-title-underline`}>Echipa</h2>
            </motion.div>
            <div className='grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-x-hidden'>
                {team.map((person, index) => (
                    <TeamCard key={index} index={index} person={person} />
                ))}
            </div>
        </>

    )
}

const TeamCard = ({ index, person }) => (
    <motion.div
        className='flex flex-col rounded-lg p-5 m-4 text-center text-secondary'
        variants={fadeIn("left", "spring", index * 0.5, 0.75)}
    >
        <img
            src={person.icon}
            alt="avocat"
            className='w-36 h-36 rounded-full mx-auto grayscale hover:grayscale-0 hover:scale-110 transform transition-all ease-out duration-700'
        />
        <div className='py-2'>
            <h3
                className='mb-1 text-xl font-semibold tracking-tighter text-gray-900'
            >
                {person.title}
            </h3>
            <p className='text-black'>
                {person.description}
            </p>
            <p>
                {person.phone}
            </p>
            <p className='text-sm text-gray-600'>
                {person.email}
            </p>
        </div>
    </motion.div>
)




export default SectionWrapper(Team, "team")