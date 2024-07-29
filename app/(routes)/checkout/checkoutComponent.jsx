'use client'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import convertToSubCurrency from '../../../lib/convertToSubCurrency';
import CheckoutPage from './CheckoutPage';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import GlobaApi from '../../_utils/GlobaApi';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function App() {

  const [cartItems, setCartItems] = useState([])
  const query = useSearchParams()
  const amount = query.get('amount')

  const user = getCookie('user')? JSON.parse(getCookie('user')): null;
  const jwt = getCookie('jwt')


  useEffect(()=>{
    if (user){
      async function getCartItems(){
        const res = await GlobaApi.getCartItems(user.id, jwt)
        setCartItems(res)
      }
      getCartItems()
  }
  }, [])


  return (
    <div>
      <h2 className='bg-primary text-white text-center font-bold text-2xl py-6 my-4'>Checkout</h2>   
      <div className='grid md:grid-cols-2 grid-cols-1 gap-20 px-10 py-8'>
        <div className='flex flex-col gap-4 p-4 h-[500px] overflow-auto border'>
            {cartItems.map((item, index)=> (
              <li key={index} className='list-none flex items-center justify-between'>
                <div className='flex gap-6 items-center'>
                  <Image className='border p-2 rounded-lg' src={item.image? item?.image: ''}
                      width={100} height={100} alt={item.name}/>
                      <div>
                          <h2 className='font-bold text-sm'>{item.name}</h2>
                          <h2>{item.quantity}</h2>
                          <h2 className='font-bold text-sm'>${item.amount}</h2>
                      </div>
                </div>
              </li>
            ))}
          <h2 className='text-lg font-bold flex justify-between mt-6'>Subtotal <span>${amount}</span></h2>
        </div>  

        <div className='flex flex-col border'>
          <Elements stripe={stripePromise} options={{
          mode: "payment",
          amount: convertToSubCurrency(amount),
          currency: "usd"  
          }}
            >
              <CheckoutPage amount={amount} cartItems={cartItems}/>
          </Elements>
        </div>
      </div>    
    </div>
    
  );
};