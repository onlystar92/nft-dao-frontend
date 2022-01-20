import Link from 'next/link'
import BigNumber from 'bignumber.js'
import styles from 'styles/Home.module.css'
import styled from 'styled-components'
import Header from 'components/Home/Header'
import Slide from 'components/Home/Slide'
import Dop from 'components/Home/Dop'
import Money from 'components/Home/Money'
import HowItWorks from 'components/Home/HowItWorks'
import Partners from 'components/Home/Partners'
import Join from 'components/Home/Join'
import Footer from 'components/Home/Footer/index'
import ScrollAnimation from 'react-animate-on-scroll';

import { useEffect, useState } from 'react'

const Section = styled.div`
  background-color: #030921 !important;
`

export default function Home() {
  return (
    <Section>
      <Header />
      <ScrollAnimation animateIn="fadeIn" animateOnce="true">
        <Slide />
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeIn" animateOnce="true">
        <Dop />
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeIn" animateOnce="true">
        <HowItWorks />
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeIn" animateOnce="true">
        <Money />
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeIn" animateOnce="true">
        <Join />
      </ScrollAnimation>
      <ScrollAnimation animateIn="fadeIn" animateOnce="true">
        <Partners />
      </ScrollAnimation>
      <Footer />
    </Section>
  )
}