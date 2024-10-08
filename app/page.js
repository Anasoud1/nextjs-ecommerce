import Image from "next/image";
import Slides from "./_components/Slides";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";
import GlobaApi from "./_utils/GlobaApi";

export const metadata = {
  title: "eStore",
  description: "ecommerce website",
};
export default async function Home() {
  const productList = await GlobaApi.getProducts();

  return (
    <main className="px-14 sm:px-20">
      <Slides/>
      <CategoryList/>
      <ProductList productList={productList}/>
      
      {/* <Image src={'/delivery.png'} alt='banner'
        width={1000} height={100}
        className="w-full object-contain mb-10"/> */}
      <Footer/>
    </main>
  );
}
