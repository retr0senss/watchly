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
            <LinearGradient
              colors={['#14171e', 'rgba(20,23,30,0)']}
              style={[styles.gradient, { position: 'absolute', top: 0, height: '20%' }]}
              start={[0, 0]}
              end={[0, 1]}
            />
            <LinearGradient
              colors={['rgba(20,23,30,1)', 'rgba(20,23,30,0)']}
              style={[styles.gradient, { position: 'absolute', bottom: "30%", height: '10%' }]}
              start={[0, 1]}
              end={[0, 0]}
            />
            <LinearGradient
              colors={['#080808', 'rgba(20,23,30,1)']}
              style={[styles.gradient, { position: 'absolute', bottom: 0, height: '30%' }]}
              start={[0, 1]}
              end={[0, 0]}
            />
            <Image
              source={{ uri: `${ImageBaseUrl}${item.poster_path}` }}
              style={styles.image}
            />
          </View>
        )}
      />
    </View>
  )
}

export default BannerSlider