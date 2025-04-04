"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className=" z-20 relative overflow-hidden flex justify-center items-center ">
      <Image src="/hero.jpg" alt="Hero Image" width={1500}  height={600}  className="object-cover h-auto" />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="absolute flex justify-center items-center flex-col text-center text-white "
      >
        <h1 className=" text-lg md:text-4xl font-bold text-red-500">MovieZone</h1>
        <p className=" my-1 md:mt-4 sm:text-sm md:text-2xl max-w-80 md:max-w-none text-white">
          Welcome to MovieZone, your go-to place for all things movies.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:mt-6 px-5 py-2 mb-3 bg-red-500 text-white rounded-lg 
                   hover:bg-red-400 active:bg-red-600 
                   focus:outline-none focus:ring focus:ring-red-300 
                   transition-all duration-200"
        >
          Watch
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Hero;
