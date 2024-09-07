import Image from 'next/image'
import React from 'react'

function Footer() {
  return (
    <div className='bg-gray-100 rounder-2xl flex flex-col items-center text-center py-6 px-4 gap-8 mb-6'>
        <h1 className='text-2xl font-black'>GStore</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt consequuntur amet culpa cum itaque neque.</p>
        <div className='flex flex-wrap justify-center gap-6'>
            <Image src={'/facebook.png'} alt='facebook' width={20} height={20}/>
            <Image src={'/instagram.png'} alt='instagram' width={20} height={20}/>
            <Image src={'/twitter.png'} alt='twitter' width={20} height={20}/>
            <Image src={'/linkedin.png'} alt='linkedin' width={20} height={20}/>
        </div>
    </div>
  )
}

export default Footer