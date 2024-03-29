export const staggerContainer = (staggerChildren, delayChildren) => {
    return {
        hidden: {},
        show: {
            transition: {
                staggerChildren: staggerChildren,
                delayChildren: delayChildren || 0,
            },
        },
    };
};

export const textVariant = (delay) => {
    return {
        hidden: {
            y: -50,
            opacity: 0
        },

        show: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                duration: 1.25,
                delay: delay
            }
        }
    }
}

export const fadeIn = (direction, type, delay, duration) => {
    return {
        hidden: {
            x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
            y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
            opacity: 0,
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type: type,
                delay: delay,
                duration: duration,
                ease: "easeOut",
            },
        },
    }
}

export const slideIn = (direction, type, delay, duration) => {
    return {
        hidden: {
            x: direction === "left" ? "-150%" : direction === "right" ? "200%" : 0,
            y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
        },
        show: {
            x: 0,
            y: 0,
            transition: {
                type: type,
                delay: delay,
                duration: duration,
                ease: "easeOut",
            },
        },
    };
};

export const navbarMobileVariants = {
    closed: {
        clipPath: 'circle(0.5% at 100% 0)',
        transition: {
            duration: 0.4
        },
        opacity: 0
    },
    opened: {
        clipPath: 'circle(141.2% at 100% 0)',
        transition: {
            duration: 0.5
        },
        opacity: 1
    }
}


export const mobileUlVariant = {
    opened: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    },
    closed: {
        opacity: 0
    }
}

export const liVariants = {
    opened: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 },
};