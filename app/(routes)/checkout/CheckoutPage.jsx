'use client'

import React, { useState, useEffect, useContext} from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import convertToSubCurrency from '../../../lib/convertToSubCurrency';
import UpdateCartContext from "../../_context/UpdateCartContext";
import { getCookie } from "cookies-next";
import GlobaApi from "../../_utils/GlobaApi";
import { toast } from "../../../components/ui/use-toast";

function CheckoutPage({amount, cartItems}) {

  const {updateLength, setUpdateLength} = useContext(UpdateCartContext);
  const user = getCookie('user')? JSON.parse(getCookie('user')): null;
  const jwt = getCookie('jwt')

  // console.log('cartItems: ', cartItems);
  
  
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("")
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      fetch('/api/create-payment-intent', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ amount: convertToSubCurrency(amount)})
      })
      .then(res => res.json()) // pass tha data
      .then(data => setClientSecret(data.clientSecret)) // get the data 
  }, [amount])

  async function deleteCartItems(){
    for (const el of cartItems) {
      await GlobaApi.deleteItemFromCart(el?.id, jwt);
      console.log('remove el.id: ', el.id);
    }
    setUpdateLength(!updateLength)
  }

  console.log('**** : ', cartItems)
  const createOrder = async () => {
    const data = {
      data: {
        email: user.email,
        username: user.username,
        amount,
        userId: user.id,
        orderItemList : cartItems
      }
    }
   
    try {
      const orderResponse = await GlobaApi.createOrder(data, jwt);
     
      toast({title: 'Order placed successfully!'});
      setUpdateLength(!updateLength);
    } catch (err) {
      console.error('Error deleting items from cart: ', err);
      toast({title: 'Error processing order', description: err.message, status: 'error'});
    }
  }


  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    if (!stripe || !elements) return;
  
    const {error: submitError} = await elements.submit();
  
    if (submitError){
      setErrorMessage(submitError.message);
      toast({variant: "destructive", title: submitError.message});
      setLoading(false);
      return;
    }
  
    try {
      await createOrder();
      await deleteCartItems();
    } catch (err) {
      console.error('Error creating order: ', err);
      toast({title: 'Error processing order', description: err.message, status: 'error'});
    }
    
    const {error} = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`
      }
    });
  
    if (error){
      setErrorMessage(error.message);
      toast({variant: "destructive", title: error.message});
      setLoading(false);
      return;
    }
  
    // If payment is confirmed successfully, create the order and delete cart items
   
  
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements){
    return (
      <div className="flex items-center justify-center m-5">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
    )
  }

  

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md my-5 mx-10">
      {clientSecret && <PaymentElement/>}
      {errorMessage && <div>{errorMessage}</div>}
      <button disabled={!stripe || loading} className="w-full bg-black mt-3 p-5 text-white rounded-md font-bold disabled:opacity-50
      disabled:animate-pulse">
        {!loading? `Pay $${amount}`: "Processing..." }
      </button>
    </form>
  )
}

export default CheckoutPage