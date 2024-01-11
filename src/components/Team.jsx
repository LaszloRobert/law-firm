import React from 'react'
import { team } from "../constants"
import { motion } from 'framer-motion'
import { SectionWrapper } from '../hoc'
import { textVariant, fadeIn } from '../utils/motion'

const Team = () => {
    return (
        <>
            <motion.div variants={textVariant(0)} >
                <h2 className='mb-8 text-center text-4xl tracking-tight font-extrabold text-gray-900'>Echipa</h2>
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
        className='text-center text-gray-500'
        variants={fadeIn("left", "spring", index * 0.5, 0.75)}
    >
        <img
            src={person.icon}
            alt="avocat"
            className='w-36 h-36 rounded-full mx-auto grayscale hover:grayscale-0 ease-out duration-700'
        />
        <h3
            className='mb-1 text-2xl font-bold tracking-tighter text-gray-900'
        >
            {person.title}
        </h3>
        <p>
            {person.phone}
        </p>
        <p>
            {person.email}
        </p>
    </motion.div>
)




export default SectionWrapper(Team, "team")