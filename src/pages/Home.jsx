import Hero from "../components/Hero"
import BannerSlider from "../components/BannerSlider"
import Categories from "../components/Categories"
import OrderInfo from "../components/OrderInfo"
import Footer from "../components/Footer"

function Home() {
  return (
    <>
      <Hero />
      <BannerSlider />
      <Categories />
      <OrderInfo />
      <Footer />
    </>
  )
}

export default Home