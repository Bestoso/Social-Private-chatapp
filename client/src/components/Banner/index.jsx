import React from 'react'
import bannerImage from '../../assets/images/wp.jpg'

export const Banner = () => {
  return (
    <section className="banner__section"
        style={{
            backgroundImage: `url(${bannerImage})`,
        }}
    >
    </section>
  )
}
