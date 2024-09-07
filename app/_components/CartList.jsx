'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { ShoppingCart, TrashIcon } from 'lucide-react'
import GlobaApi from '../_utils/GlobaApi';
import { getCookie } from 'cookies-next';
import UpdateCartContext from '../_context/UpdateCartContext';
import { toast } from '../../components/ui/use-toast';
import { Button } from '../../components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet"
import { useRouter } from 'next/navigation'

function CartList({itemList, totalItem}) {

//   let totalPrice = 0;
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const jwt = getCookie('jwt');

  const {updateLength, setUpdateLength} = useContext(UpdateCartContext);

useEffect(()=>{
    let total = 0
    itemList.forEach(item => {
        total += item.amount;
    });
    setTotalPrice(total);
}, [updateLength, itemList])
  
//   console.log('totalPrice: ', totalPrice);
// console.log('***********************************************')
// console.log(itemList);
  const deleteItemFromCart = (id) =>{
    GlobaApi.deleteItemFromCart(id, jwt).then(res => {
        toast({title: 'Item removed'})
        setUpdateLength(!updateLength)

    })
  }

  const handleCheckout = () => {
    if (!jwt){
        router.push('/signin')
        return;
    }
    if (totalPrice === 0) {
      toast({title: 'Amount must greater than 0'})
      return;
    }
    router.push(`/checkout?amount=${totalPrice.toFixed(2)}`)
  }
  return (
     <Sheet>
        <SheetTrigger> 
            <div className='flex gap-1'>
                <ShoppingCart/>
                <h2>({totalItem})</h2>
          </div>
        </SheetTrigger>
        <SheetContent>
            <SheetHeader>
            <SheetTitle className='bg-green-600 mt-4 py-2 text-white text-lg font-bold text-center rounded-md'>My Cart</SheetTitle>
            <SheetDescription></SheetDescription>
                
              <div className='flex flex-col gap-4 mt-3 mb-20 h-[500px] overflow-auto'>
                  {itemList.map((item, index)=> (
                    <li key={index} className='list-none flex items-center justify-between'>
                      <div className='flex gap-3 '>
                        <Image className='border p-2 rounded-lg' src={item.image? item?.image: ''}
                            width={80} height={80} alt={item.name}/>
                            <div className='flex flex-col items-start'>
                                <h2 className='font-bold text-sm'>{item.name}</h2>
                                <h2 className='text-sm'>Quantity: {item.quantity}</h2>
                                <h2 className='font-bold text-sm'>${item.amount}</h2>
                            </div>
                      </div>
                        <TrashIcon className='cursor-pointer mx-2' onClick={() => {deleteItemFromCart(item.id)}}/>
                    </li>
                  ))}
              </div>   

              <div className='absolute w-[90%] bottom-6 flex flex-col gap-2'>
                  <h2 className='text-lg font-bold flex justify-between'>Subtotal <span>${totalPrice.toFixed(2)}</span></h2>
                  <SheetClose asChild>
                    <Button onClick={handleCheckout}>Checkout</Button>
                  </SheetClose>
                  
              </div>
                  
            </SheetHeader>
        </SheetContent>
    </Sheet>
  )
}

export default CartList