import React from 'react'
import SignUp from './SignUp';
import LogIn from './LogIn';

const Hero = () => {
    return (
        <section className="bg-red-100 py-20 mb-4">
            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center"
            >
                <div className="text-center">
                    <h1
                        className="text-4xl font-extrabold text-black sm:text-5xl md:text-6xl"
                    >
                        Task Management Tool
                    </h1>
                    <p className="my-4 text-xl text-black mb-20">
                        Create tasks and track its completion to stay up to date with your goals.
                    </p>
                </div>
            </div>
            <div className="flex justify-center items-start mt-0"> {/* Removed the extra margin */}
                <div className="w-1/3 mr-5">
                    <LogIn />
                </div>
                <div className="w-1/3 ml-5">
                    <SignUp />
                </div>
            </div>
        </section>
    )
}

export default Hero;