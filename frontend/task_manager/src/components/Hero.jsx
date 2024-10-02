import React, { useEffect, useState } from 'react'
import SignUp from './SignUp';
import LogIn from './LogIn';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const openSignUpModal = () => setShowSignUpModal(true);

    const closeSignUpModal = (e) => {
        if (e.target === e.currentTarget) {
            setShowSignUpModal(false);
        }
    };

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
                    <div>
                        <LogIn openSignUpModal={openSignUpModal} />
                        <div className="mt-6 text-center flex justify-center items-center space-x-2">
                        </div>
                        {showSignUpModal && (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                                onClick={closeSignUpModal}
                            >
                                <div className="bg-red-200 p-6 rounded-lg shadow-md w-1/3 relative">
                                    <SignUp closeModal={closeSignUpModal} />
                                </div>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </section>
    );
};
export default Hero;