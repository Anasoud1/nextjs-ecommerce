import React from 'react'
import GlobaApi from '../_utils/GlobaApi';
import Image from "next/image";
import Link from 'next/link';


async function CategoryList({currentCategory}) {
    const categoryList = await GlobaApi.getCategory();
  return (
    <section className='pt-10'>
        <h2 className='text-green-600 font-bold text-2xl mb-5'>Shop by Category</h2>
        <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-5 justify-center'>
        {categoryList.map((item, index) => (
            <Link href={`/category/${item?.attributes.name}`} key={index} 
            className={`flex flex-col group gap-4 justify-center items-center w-[120px] py-4 border rounded-lg cursor-pointer bg-green-50 hover:bg-green-500 
            ${decodeURIComponent(currentCategory) == item.attributes.name? 'bg-green-500 text-white': ''}`}>
                <Image src={item?.attributes?.icon?.data[0]?.attributes?.url}
                      alt='icon' width={50} height={50}
                      className='group-hover:scale-125 transition-all ease-in-out'/>
                <h2>{item?.attributes.name}</h2>
            </Link>
        ))}
    </div>
    </section>
    
  )
}

export default CategoryList