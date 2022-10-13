import { motion } from 'framer-motion'
import React from 'react'
import Logo from '../public/favicon.ico'
import Link from 'next/link'

function Navbar() {
  return (
    <div className="absolute flex flex-row w-screen top-0 p-10 items-start justify-between mx-auto z-100 xl:items-center content-center">
        <nav className="flex flex-row w-screen justify-between">
            <Link href={'/'}>
                <motion.img
                initial={{
                    x: -500,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 1.5
                }}
                className="flex flex-row items-center h-[4rem] md:h-[6rem]"
                src={Logo.src}/>
            </Link>
            <motion.div
            initial={{
                x: 500,
                opacity: 0,
            }}
            animate={{
                x: 0,
                opacity: 1,
            }}
                transition={{
                duration: 1.5
            }}
            className="flex flex-row items-center text-white cursor-pointer">
                <Link href={'/nft/collection-1'}>
                    <h1 className='bg-blue-400 px-5 py-3 text-lg 
                    font-bold lg:px-8 lg:py-4 lg:text-xl rounded-full'>Mint NFT</h1>
                </Link>
            </motion.div>
        </nav>
    </div>
  )
}

export default Navbar