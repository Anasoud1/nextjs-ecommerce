'use client';
import { Button } from '../../components/ui/button';
import { CircleUserRound, LayoutGrid, Search, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { DropdownMenu, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from '../../components/ui/dropdown-menu'
import GlobaApi from '../_utils/GlobaApi';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import UpdateCartContext from '../_context/UpdateCartContext';


import CartList from './CartList';


function Header() {

  const [isLogin, setisLogin] = useState(false);
  const [categoryList, setCategoryList] = useState([])
  const [totalItem, setTotalItem] = useState(0);

  const [itemList, setItemList] = useState([])
  const router = useRouter()
  
  const {updateLength, setUpdateLength} = useContext(UpdateCartContext);

  const user = getCookie('user')? JSON.parse(getCookie('user')): null;
  const jwt = getCookie('jwt')

  // console.log('user:', user);
  useEffect(()=>{
    // const jwt = getCookie('jwt')
    if (jwt) {
      console.log('jwt:', jwt);
      setisLogin(true)
    }
    async function getCategory (){
      const res = await GlobaApi.getCategory()
      setCategoryList(res)
    } 
    
    getCategory()

  },[isLogin])

  useEffect(()=>{
    if (user){
      async function getCartItems(){
        try {
          const res = await GlobaApi.getCartItems(user.id, jwt)
          setTotalItem(res?.length)
          setItemList(res)
        } catch (error) {
          setItemList([])
          setTotalItem(0)
        }
       
      }
      
      getCartItems()
    } 
    
  }, [updateLength])

  function signOut(){
    deleteCookie('user');
    deleteCookie('jwt');
    setisLogin(false)
    setTotalItem(0)
    router.push("/")
  }

  return (
    <div className='flex items-center sm:gap-8  px-2 sm:px-20 py-4 shadow-md justify-between'>
        <div className='flex items-center gap-8'>
            <h1 className='text-lg sm:text-2xl font-black'><Link href={'/'}>GStore</Link></h1>
           
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className='md:flex gap-2 border rounded-full p-2 md:px-6 bg-slate-200 cursor-pointer hidden'>
                    <LayoutGrid/>
                    <h2>Categorie</h2>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categoryList.map((item, index) => (
                    <Link key={index}  href={`/category/${item?.attributes.name}`}>
                      <DropdownMenuItem className='flex gap-4 cursor-pointer'>
                        <Image src={item?.attributes?.icon?.data[0]?.attributes?.url}
                        alt='icon' width={30} height={30}/>
                        <h2 className='text-lg'>{item?.attributes.name}</h2>
                        </DropdownMenuItem>
                    </Link>
                   
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
        </div>
        <div className='flex items-center gap-3'>
            <CartList itemList={itemList} totalItem={totalItem}/>
          
            {/* <CartList itemList={itemList}/> */}

          {!isLogin && (<Button className='rounded-full'><Link href={'/signin'}>Login</Link></Button>)} 
          {isLogin && (
            <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUserRound className='bg-green-100 p-1 rounded-full text-primary h-8 w-8 sm:h-10 sm:w-10 cursor-pointer'/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
              
              <DropdownMenuSeparator />
              <Link href='/myOrders'>
                <DropdownMenuItem>My Orders</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            )} 
        </div>
    </div>
  )
}

export default Header