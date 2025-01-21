import React from 'react'
import { Dimensions, View, Text, Image } from 'react-native'
import Carousel from "react-native-reanimated-carousel"
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles'
import { MovieInterface, TvShowInterface } from '@/interfaces/contentInterfaces';

const ImageBaseUrl = process.env.EXPO_PUBLIC_API_IMAGE_URL;

const BannerSlider = ({ bannerData }: {
  bannerData: (MovieInterface | TvShowInterface)[]
}) => {
  const { width } = Dimensions.get("window")

  return (
    <View style={[styles.carouselContainer, { width }]}>
      <Carousel
        loop
        width={width}
        autoPlay={true}
        data={bannerData}
        scrollAnimationDuration={1000}
        autoPlayInterval={3000}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={{ uri: `${ImageBaseUrl}${item.poster_path}` }}
              style={styles.image}
            />
            <LinearGradient
              colors={['rgba(0,0,0,1)', 'rgba(0,0,0,.9)', 'rgba(0,0,0,0)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradient}
            />
          </View>
        )}
      />
    </View>
  )
}

export default BannerSlider