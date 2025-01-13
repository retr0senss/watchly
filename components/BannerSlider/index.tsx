import React from 'react'
import { Dimensions, View, Text, Image } from 'react-native'
import Carousel from "react-native-reanimated-carousel"
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles'

const BannerSlider = () => {
  const { width } = Dimensions.get("window")

  const data = [
    {
      title: "Title 1",
      image: "https://image.tmdb.org/t/p/original/d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg"
    },
    {
      title: "Title 2",
      image: "https://image.tmdb.org/t/p/original/jbOSUAWMGzGL1L4EaUF8K6zYFo7.jpg"
    },
    {
      title: "Title 3",
      image: "https://image.tmdb.org/t/p/original/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg"
    },
  ]
  return (
    <View style={[styles.carouselContainer, { width }]}>
      <Carousel
        loop
        width={width}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        autoPlayInterval={3000}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {/*             <LinearGradient
              colors={['rgba(0,0,0,1)', 'rgba(0, 0, 0, .4)', 'rgba(0,0,0,.3), rgba(0,0,0,0)']}
              style={styles.gradient}
              start={[0, 1]}
              end={[0, 0]}
              locations={[0, 0.3, 0.8, 1]}
            /> */}
            <Image
              source={{ uri: item.image }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default BannerSlider