import React from 'react'
import AutismHeart from '../assets/AutismHeart.png'

function Main() {
  return (
    <div className='flex flex-row text-white h-screen'>
        <div className='w-[45%] pl-[5%] place-self-center'>
            <h1 className='text-5xl pb-4'><span className='underline'>NFT4ASD</span>{" "}is a non-profit organization that advocates for people with autism spectrum disorder.</h1>
            <h2 className='text-3xl'>We aim to fundraise money through sellings NFTs, and the profits will be directly sent to{" "}<span className='underline'>Autism Speaks</span>.</h2>
        </div>
        <div className='w-[50%]'>
            <img src={AutismHeart.src} alt="" />
        </div>
    </div>
  )
}

export default Main