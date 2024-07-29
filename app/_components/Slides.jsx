import GlobaApi from '../_utils/GlobaApi'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../../components/ui/carousel'
import Image from 'next/image'

async function Slides() {

  const slideList = await GlobaApi.getSlides()


  return (
    <div  className='pt-10'>
        <Carousel>
            <CarouselContent>
                {slideList.map((item, index) => (
                    <CarouselItem key={index}>
                        <Image src={item?.attributes?.image?.data[0]?.attributes?.url}
                        alt='banner' width={2000} height={2000}
                        className='w-full sm:h-[200px] md:h-[400px] object-fill rounded-2xl'/>
                    </CarouselItem>
                ))}
                
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
  )
}

export default Slides