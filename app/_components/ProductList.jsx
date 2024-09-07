'use client'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "../../components/ui/dialog"
import ProductItemDetails from './ProductItemDetails';
import { getCookie } from 'cookies-next';
import GlobaApi from '../_utils/GlobaApi';
import UpdateCartContext from '../_context/UpdateCartContext';


function ProductList({productList}) {

  const [cartItems, setCartItems] = useState([])
  const {updateLength, setUpdateLength} = useContext(UpdateCartContext);
  const user = getCookie('user')? JSON.parse(getCookie('user')): null;
  const jwt = getCookie('jwt')



  useEffect(()=>{
    if (jwt){
      async function getCartItems(){
        try {
          const res = await GlobaApi.getCartItems(user.id, jwt)
          setCartItems(res)
        } catch (error) {
          setCartItems([])
        }
        
      

      }
      getCartItems()
  }
  }, [updateLength])
 

  return (
    <section className='py-12 '>
      <h2 className='text-green-600 font-bold text-2xl mb-8'>Our Popular Products</h2>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6'>
          {productList.map((item, index) => (
              <div className='py-4 px-6 border rounded-lg flex flex-col justify-center items-center gap-4 hover:scale-105 hover:shadow-lg transition-all ease-in-out cursor-pointer' key={index}>
                  <Image src={item?.attributes?.image?.data[0]?.attributes?.url}
                  alt={item?.attributes?.name} width={200} height={200}
                  className='w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] object-contain'/>
                  <h2 className='text-center font-bold text-lg'>{item?.attributes?.name}</h2>
                  <div className='flex gap-3'>
                      {item.attributes.sellingPrice &&<h2 className='text-center font-bold text-lg'>${item.attributes.sellingPrice}</h2>}
                      {item.attributes.sellingPrice && <h2 className='line-through text-center font-bold text-lg text-gray-500'>${item.attributes.mrp}</h2>}
                      {!item.attributes.sellingPrice &&<h2 className='text-center font-bold text-lg'>${item.attributes.mrp}</h2>}

                  </div>
                  <Dialog className='overflow-auto'>
                    <DialogTrigger asChild>
                      <Button disabled={cartItems? cartItems.some(obj => obj.name === item.attributes.name): null} variant="outline" className='text-primary hover:text-white hover:bg-green-700'>Add to cart</Button>
                    </DialogTrigger>
                    <DialogContent className="overflow-y-scroll max-h-screen">
                      <DialogTitle></DialogTitle>
                      <DialogDescription></DialogDescription>
                      <ProductItemDetails item={item} cartItems={cartItems} updateLength={updateLength} setUpdateLength={setUpdateLength}/>
                    </DialogContent>
                  </Dialog>
              </div>
          ))}
      </div>
    </section>
    
  )
}

export default ProductList