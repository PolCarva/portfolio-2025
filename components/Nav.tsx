'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '@/lib/anim';
import Link from './Link';
import Curve from './Curve';

const navItems = [
    {
        title: "home",
        href: "/",
    },
    {
        title: "curriculum",
        href: "/curriculum",
    },
    {
        title: "projects",
        href: "/projects",
    },
    {
        title: "contact",
        href: "/contact",
    },
]

interface NavProps {
    onClose: () => void;
}

export default function Nav({onClose}: NavProps) {

    const pathname = usePathname();
    const [selectedIndicator, setSelectedIndicator] = useState(pathname);

    return (
        <motion.div 
            variants={menuSlide} 
            initial="initial" 
            animate="enter" 
            exit="exit" 
            className="fixed top-0 right-0 h-screen w-full sm:max-w-[350px] bg-[#fafafa] z-40 shadow-2xl"
        >
           <div className="box-border h-full p-[100px] flex flex-col justify-between">
                <div 
                    onMouseLeave={() => {setSelectedIndicator(pathname)}}
                    className="flex flex-col text-5xl gap-3 mt-20"
                >
                    <div className="text-gray border-b border-gray text-lg mb-10">
                        <p>navigation</p>
                    </div>
                    {
                        navItems.map( (data, index) => {
                            return <Link 
                                key={index} 
                                data={{...data, index}} 
                                isActive={selectedIndicator == data.href} 
                                setSelectedIndicator={setSelectedIndicator}
                                onClose={onClose}
                            />
                        })
                    }
                </div>
                {/* Footer can be added here if needed */}
            </div>
            <Curve />
        </motion.div>
    )
} 