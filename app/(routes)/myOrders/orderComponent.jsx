'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next';
import GlobaApi from '../../_utils/GlobaApi';
import { Collapsible, CollapsibleContent, CollapsibleTrigger} from "../../../components/ui/collapsible"
import moment from 'moment';
import Image from 'next/image';

function MyOrders() {
  
    const [orderList, setOrderList] = useState([]);
    const router = useRouter();
    const user = getCookie('user')? JSON.parse(getCookie('user')): null;
    const jwt = getCookie('jwt')

    useEffect(()=> {
        if(!jwt){
            return router.replace('/')
        }
        getOrder();
    }, [])

    const getOrder = async () => {
        const order_List = await GlobaApi.getOrders(user.id, jwt);
        setOrderList(order_List);
        console.log('orderList: ', orderList)

    }   

  return (
    <div>
        <h2 className='bg-primary text-white text-center font-bold text-2xl py-6 my-4'>My Orders</h2>  
        <div className='py-8 mx-7 md:mx-20'>
            <h2 className='text-3xl font-bold text-primary'>Order History</h2>
            <div>
                {orderList.map((order, index) => (
                    <Collapsible key={index}>
                        <CollapsibleTrigger className='flex justify-between mt-4 md:w-4/6 sm:w-4/6 border p-2 bg-slate-100'>
                          <h2> <span className='font-bold mr-2'>Order Date: </span>{moment(order?.createdAt).format('DD/MMMM/YYYY, h:mm:ss a')}</h2>
                          <h2> <span className='font-bold mr-2'>Total Amount: </span>${order.totalAmount}</h2>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            {order.orderItemList.map((item, idx) =>(
                                <li key={idx} className='list-none'>
                                    <div className='grid grid-cols-4 gap-x-32 md:w-4/6 sm:w-4/6 mt-3 p-2'>
                                    
                                    <Image src={item?.product?.data[0]?.attributes?.image?.data[0]?.attributes?.url? item?.product?.data[0]?.attributes?.image?.data[0]?.attributes?.url: ''}
                                        width={100} height={100} alt={item.name}/>
                                        <div>
                                            <h2 className='font-bold text-sm'>{item?.product?.data[0]?.attributes?.name}</h2>
                                            <h2 className='font-bold text-sm'>Item Price: ${item?.product?.data[0]?.attributes?.sellingPrice ? item?.product?.data[0]?.attributes?.sellingPrice: item?.product?.data[0]?.attributes?.mrp}</h2>
                                        </div>
                                        <h2><span className='font-bold mr-2'>Quantity: </span>{item.quantity}</h2>
                                        <h2><span className='font-bold mr-2'>Price: </span>${item.amount}</h2>
                                    </div>
                                    <hr className='md:w-4/6 sm:w-4/6 '/>
                              </li>
                            ))}
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </div>
        </div>
        
    </div>
  )
}

export default MyOrders