'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const Homepage = () => {
  const router = useRouter();
  const handleClick = (path) => {
    router.push(path);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen px-5 bg-animated-gradient text-white"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-4xl sm:text-5xl font-bold text-center mb-4 text-shadow-lg"
      >
        Welcome to <span className="text-[#98DED9]">Flashcard Maker</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        className="text-lg sm:text-xl text-center mb-8"
      >
        Discover the amazing features and benefits of our app. Get started now and explore what we have to offer!
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.1, backgroundColor: "#98DED9", boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleClick('/flashPage')}
        className="bg-gradient-to-r from-[#98DED9] to-[#687EFF] text-white py-2 px-6 rounded-lg shadow-lg mb-8 transition duration-300 ease-in-out transform"
      >
        Get Started
      </motion.button>
      <motion.div
        className="flex space-x-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
          className="relative bg-[#f5f5f5] text-black p-5 rounded-lg shadow-lg w-72 h-40 transition duration-300 ease-in-out transform"
        >
          <h3 className="text-xl font-semibold mb-3">Create an account to get started</h3>
          <button className="bg-[#687EFF] text-white py-2 px-4 rounded-lg hover:bg-[#161D6F] transition duration-300 ease-in-out flex items-center"
          onClick={() => handleClick('/signup')}>
            Sign Up <FaArrowRight className="ml-2" />
          </button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
          className="relative bg-[#e3f2fd] text-black p-5 rounded-lg shadow-lg w-72 h-40 transition duration-300 ease-in-out transform"
        >
          <h3 className="text-xl font-semibold mb-2">Join Premium</h3>
          <p className="text-sm mb-3">Unlock exclusive features with our premium plan.</p>
          <button
            onClick={() => handleClick('/checkout')}
            className="bg-[#687EFF] text-white py-2 px-4 rounded-lg hover:bg-[#161D6F] transition duration-300 ease-in-out flex items-center"
          >
            Join Premium <FaArrowRight className="ml-2" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Homepage;
