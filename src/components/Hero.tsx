import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGES } from '@/assets';
import { motion } from "motion/react";

export const Hero = () => {
    return (
        <div className="relative w-full bg-rose-gold overflow-hidden">
            {/* Background Image - Responsive positioning */}

            <img
                src={IMAGES.hero1}
                alt="Holiday Collection"
                className=" w-full  mx-auto object-contain object-center"
            />
            {/* Content Container - Responsive Card */}
            <div className="absolute inset-0 flex items-end pointer-events-none">
                
            </div>
        </div>
    );
};