import React from 'react'

const Footer = () => {


    return (
        <div className='border-t py-4'>
            <div className='text-center text-4xl '>
                <h3> Made By <span className='font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse'>DestinationCoder </span> @{new Date().getFullYear()}</h3>
            </div>
        </div>
    )
}

export default Footer
