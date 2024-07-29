'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

function PaymentComponent() { 

  const jwt = getCookie('jwt')
  const router = useRouter();


  useEffect(()=> {
    if(!jwt){
        router.replace('/')
    }
}, [])


    
  return (
    <main className="flex justify-center mt-20">
      <div className="flex flex-col items-center gap-6">
        <Image src='/verified.gif' alt='check' width={130} height={130}/>
        <h1 className="text-4xl font-extrabold mb-2">Payment Successfull</h1>
        <Link href='/' className='p-2 text-white font-bold rounded-md bg-green-600'>Go to Home</Link>

      </div>
    </main>
  )
}

export default PaymentComponent