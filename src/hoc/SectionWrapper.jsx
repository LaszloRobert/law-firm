import { motion } from 'framer-motion'
import { staggerContainer } from '../utils/motion'
import { style } from "../style"

const SectionWrapper = (Component, idName) =>
    function HOC() {
        return (
            <motion.section
                variants={staggerContainer()}
                initial="hidden"
                whileInView="show"
                viewport={{ twice: true, amount: 0.25 }}
                className={`${style.padding} relative z-0`}
            >
                <span className='hash-span' id={idName}>
                    &nbsp;
                </span>
                <Component />
            </motion.section>
        )
    }

export default SectionWrapper