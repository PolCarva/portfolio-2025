'use client'
import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '@/lib/anim';

interface LinkProps {
    data: {
        title: string;
        href: string;
        index: number;
    };
    isActive: boolean;
    setSelectedIndicator: (href: string) => void;
    onClose: () => void;
}

export default function Link({ data, isActive, setSelectedIndicator, onClose }: LinkProps) {
    const { title, href, index } = data;

    return (
        <motion.div 
            className="relative flex items-center"
            custom={index}
            variants={slide}
            initial="initial"
            animate="enter"
            exit="exit"
        >
            <motion.div 
                variants={scale}
                animate={isActive ? "open" : "closed"}
                className="w-2.5 h-2.5 bg-[#111] rounded-full absolute left-[-30px]"
            />
            <NextLink 
                href={href} 
                className={`text-2xl tracking-widest transition-opacity text-[#111] ${isActive ? 'opacity-100' : 'opacity-70'} hover:opacity-100`}
                onClick={onClose}
                onMouseEnter={() => setSelectedIndicator(href)}
            >
                {title}
            </NextLink>
        </motion.div>
    )
} 