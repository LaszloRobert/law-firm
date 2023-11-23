import React from 'react'

const Contact = () => {
    return (
        <section id="Contact" className='bg-gray-300 h-full w-full'>
            <div id='text'>
                <h1>H2</h1>
                <div>
                    <h2>Mail</h2>
                    <span>robertolaszlo@yahoo.com</span>
                </div>
                <div>
                    <h2>Mail</h2>
                    <span>robertolaszlo@yahoo.com</span>
                </div>
                <div>
                    <h2>Mail</h2>
                    <span>robertolaszlo@yahoo.com</span>
                </div>
            </div>

            <div id='form'>
                <form>
                    <input type='text' requ placeholder='Name' />
                    <input type='email' required placeholder='Email' />
                    <textarea rows={8} placeholder='Message' />
                    <button>Submit</button>
                </form>
            </div>
        </section>
    )
}

export default Contact