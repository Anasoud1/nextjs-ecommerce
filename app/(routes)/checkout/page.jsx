import App from "./checkoutComponent";
import { Suspense } from 'react';

export const metadata = {
  title: "Checkout",
};

export default function Page() {

  return (
   <Suspense>
      <App/>
   </Suspense>
  );
};