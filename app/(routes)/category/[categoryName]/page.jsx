import GlobaApi from '/app/_utils/GlobaApi';
import Image from 'next/image';
import CategoryList from '/app/_components/CategoryList';
import Footer from '/app/_components/Footer';
import ProductList from '/app/_components/ProductList';


async function CategoryName({params}) {
    const name = params.categoryName;
    const productListByCategory = await GlobaApi.getProductByCategory(name);

    // console.log('***************************************')
    // console.log('name: ', name)
  return (
    <main>
      <h2 className='bg-primary text-white text-center font-bold text-2xl py-6 my-4'>{decodeURIComponent(name)}</h2>
      <div className='px-20'>
        <CategoryList currentCategory={name}/>
        <ProductList productList={productListByCategory} />
        <Image src={'/bannerDelivery.png'} alt='banner'
        width={1000} height={400}
        className="w-full h-[400px] object-contain mb-10"/>
        <Footer/>
      </div>
    </main>
  )
}

export default CategoryName