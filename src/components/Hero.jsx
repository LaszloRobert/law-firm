import React from 'react'
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
    return (
        <section className='h-screen w-full flex items-center justify-center mx-auto -top-[40px]'>
            <div>
                <TypeAnimation
                    sequence={[
                        "Testa1", "Test2", 'Test3'
                    ]}
                    speed={300}
                    repeat={Infinity}
                    className='text-white'
                />
            </div>


        </section>
    )
}

export default Hero