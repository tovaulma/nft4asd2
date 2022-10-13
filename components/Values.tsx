import React from 'react'

function Values() {
  return (
    <div className='text-white flex flex-col'>
        <h1 className='text-5xl text-center pb-[50px]'>Our Mission</h1>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center px-4 text-center pb-[100px]'>
            <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 m-4 p-4 rounded-tr-3xl rounded-bl-3xl border border-white cursor-pointer'>
                <h1 className='text-3xl pb-6'>Excellence</h1>
                <h2>
                Collaborating with agencies and partners to embrace diversity in our society.
                </h2>
            </div>
            <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 m-4 p-4 rounded-tr-3xl rounded-bl-3xl border border-white cursor-pointer'>
                <h1 className='text-3xl pb-6'>Awareness</h1>
                <h2>
                Educating people on challenges autism brings and advocating for those in need.
                </h2>
            </div>
            <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 m-4 p-4 rounded-tr-3xl rounded-bl-3xl border border-white cursor-pointer'>
                <h1 className='text-3xl pb-6'>Innovation</h1>
                <h2>
                Using blockchain technology to promote our project to the global community.
                </h2>
            </div>
            <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 m-4 p-4 rounded-tr-3xl rounded-bl-3xl border border-white cursor-pointer'>
                <h1 className='text-3xl pb-6'>Excellence</h1>
                <h2>
                Building in the community through transparency in our processes
                </h2>
            </div>
        </div>
    </div>
  )
}

export default Values