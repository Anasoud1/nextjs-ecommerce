'use client';
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "../components/ui/toaster";
import { usePathname } from "next/navigation";
import UpdateCartContext from "./_context/UpdateCartContext";
import { useState } from "react";

const outfit = Outfit({ subsets: ["latin"] });



export default function RootLayout({ children }) {

  const [updateLength, setUpdateLength] = useState(false)
  const path = usePathname()

  const values = {updateLength, setUpdateLength}

  // console.log('path: ', path)
  const displayHeader = ['/signin', '/signup'].includes(path);
  // console.log('displayHeader: ', displayHeader);

  return (
      <UpdateCartContext.Provider value={values}>
        <html lang="en">
          <body className={outfit.className}>
            {!displayHeader && <Header/>}
            {children}
            <Toaster/>
            </body>
        </html>
      </UpdateCartContext.Provider>
  );
}
