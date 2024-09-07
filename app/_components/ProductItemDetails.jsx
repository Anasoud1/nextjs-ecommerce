'use client';
import React, { useState } from 'react'
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import {LoaderCircle, ShoppingBasket } from 'lucide-react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import GlobaApi from '../_utils/GlobaApi';
import { toast } from '../../components/ui/use-toast';

function ProductItemDetails({item, cartItems, updateLength, setUpdateLength}) {

    const [price, setPrice] = useState(item.attributes.sellingPrice? item.attributes.sellingPrice : item.attributes.mrp)
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const user = getCookie('user')? JSON.parse(getCookie('user')): null;
    const jwt = getCookie('jwt');

    function addQuantity(){
        setQuantity(quantity + 1)
    }
    function removeQuantity(){
        if (quantity > 1){
            setQuantity(quantity - 1)
        }
    }

    function addToCart(){
        setLoading(true)
        if (!jwt){
            router.push('/signin')
            setLoading(false)
            return ;
        }
        const data = {
            data:{
                quantity,
                amount: (quantity * price).toFixed(2),
                products: item.id,
                users_permissions_users: user.id,
                userId: user.id
            }
        }
        GlobaApi.addToCart(data, jwt).then(res =>{
            console.log('res: ', res)
            toast({title: 'Added to art'})
            setUpdateLength(!updateLength)
            setLoading(false)
        }).catch(err => {
            toast({variant: "destructive", title: 'Error while adding into cart'})
            setLoading(false)
        })
        
    }

  return (
    <div className='overflow-auto grid grid-cols-1 md:grid-cols-2 p-7 gap-4'>
        <Image src={item?.attributes?.image?.data[0]?.attributes?.url}
        alt={item?.attributes?.name} width={300} height={300}
        className=' w-[300px] h-full rounded-lg object-contain'/>
        <div className='flex flex-col gap-4 items-baseline'>
            <h1 className='font-bold text-2xl'>{item?.attributes?.name}</h1>
            <h1 className='text-sm text-gray-500'>{item?.attributes?.description}</h1>
            <div className='flex gap-3'>
                    {item.attributes.sellingPrice &&<h2 className='text-center font-bold text-lg'>${item.attributes.sellingPrice}</h2>}
                    {item.attributes.sellingPrice && <h2 className='line-through text-center font-bold text-lg text-gray-500'>${item.attributes.mrp}</h2>}
                    {!item.attributes.sellingPrice &&<h2 className='text-center font-bold text-lg'>${item.attributes.mrp}</h2>}
                </div>
            {/* <h2 className='font-medium text-lg'>Quantity ({item.attributes.itemQuantityType})</h2> */}
            <div className='flex items-center gap-4'>
                <div className='flex border gap-10 items-center p-2'>
                    <button onClick={removeQuantity}>-</button>
                    <p>{quantity}</p>
                    <button onClick={addQuantity}>+</button>
                </div>
                <h1 className='font-bold text-2xl'>= ${(quantity * price).toFixed(2)}</h1   >
            </div>
            <Button className='flex gap-3 hover:bg-green-700' disabled={loading || cartItems.some(obj => obj.name === item.attributes.name)} onClick={addToCart}>
                <ShoppingBasket/>
                {loading? <LoaderCircle className='animate-spin'/> : 'Add to cart'}
            </Button>
            <h2><span className='font-bold'>Category: </span> {item.attributes.categories.data[0].attributes.name}</h2>
        </div>
    </div>
  )
}

export default ProductItemDetails