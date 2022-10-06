import React from 'react'
import Hero from '../Hero'
import Specials from '../Specials'
import Banner from '../Banner'
import Blogs from '../Blogs'
import Footer from '../Footer'
import Products from './Products'

export default function Home() {
  return (
    <>
      <Hero />
      {/* <Collection /> */}
      <Products />
      <Specials />
      <Banner />
      <Blogs />
      <Footer />
    </>
  )
}
