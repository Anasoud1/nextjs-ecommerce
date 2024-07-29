'use client';
import GlobaApi from '../../../app/_utils/GlobaApi';
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { useToast } from '../../../components/ui/use-toast';
import { LoaderIcon } from 'lucide-react';
import { setCookie } from 'cookies-next';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function SignUpComponent() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast()

  function signUp(){
    setLoading(true)

    GlobaApi.register(username, email, password).then(res => {
      setCookie('user', JSON.stringify(res.data.user))
      setCookie('jwt', res.data.jwt)
      toast({title: "Account Created Successfully"})
      router.push('/')
      setLoading(false)
    }).catch(error =>{
      toast({variant: "destructive", title: error?.response?.data?.error?.message})
      console.log(error)
      setLoading(false)
    })
  }
  function handleEnter(e){
    if (e.key === 'Enter'){
      signUp()
    }
  }

  return (
    <div className='flex justify-center pt-32'>
        <div className='p-10 flex flex-col items-center bg-slate-100 border border-gray-200 rounded-lg'>
          <h2 className='font-bold text-3xl'>Create an Account</h2>
          <h3 className='text-gray-500 mb-8'>Enter your Email and Password to create an account</h3>
          <div className='w-full flex flex-col gap-3'>
            <Input onChange={e=>{setUsername(e.target.value)}} placeholder='Username'/>
            <Input onChange={e=>{setEmail(e.target.value)}} type='email' placeholder='name@example.com'/>
            <Input type='password' onChange={e=>{setPassword(e.target.value)}} onKeyDown={handleEnter} placeholder='Password'/>
            <Button onClick={signUp}
              disabled={!(username && email && password)}
              >{loading? <LoaderIcon className='animate-spin'/>: 'Sign Up'}</Button>

            <p className='text-center'>Already have an account
              <Link href='/signin' className='text-blue-500 pl-2'> Sign In</Link>
            </p>
          </div>

        </div>
    </div>
  )
}

export default SignUpComponent