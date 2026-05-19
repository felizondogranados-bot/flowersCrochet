import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"

import "swiper/css"

function BannerSlider() {

  const banners = [

    {
      titulo: "Colección Sanrio 🌸",
      imagen:
        "https://i.pinimg.com/736x/0d/88/47/0d88471975efc60f38c4bcb3f62ef5dd.jpg",
    },

    {
      titulo: "Flores Crochet 💖",
      imagen:
        "https://i.pinimg.com/736x/63/71/39/637139dc4d6d0b3a6033e4f1f6c26e61.jpg",
    },

    {
      titulo: "Accesorios Cute 🎀",
      imagen:
        "https://i.pinimg.com/736x/9e/14/6d/9e146d5c6815fc39e01cfe1a4f9f4fcb.jpg",
    },

  ]

  return (

    <section className="px-8 py-10">

      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
        }}
        loop={true}
      >

        {banners.map((banner, index) => (

          <SwiperSlide key={index}>

            <div className="relative rounded-3xl overflow-hidden h-[500px]">

              <img
                src={banner.imagen}
                alt={banner.titulo}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">

                <h1 className="text-white text-5xl font-bold text-center">
                  {banner.titulo}
                </h1>

              </div>

            </div>

          </SwiperSlide>

        ))}

      </Swiper>

    </section>
  )
}

export default BannerSlider