import React, { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import Header from "@/components/Header";
import NavSlider from "@/components/NavSlider";
import { MovieInterface, TvShowInterface } from "@/interfaces/contentInterfaces";
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { getPopulars } from "@/services/getContents.service";
import BannerSlider from "@/components/BannerSlider";
import HorizontalSlider from "@/components/HorizontalSlider";

const ImageBaseUrl = process.env.EXPO_PUBLIC_API_IMAGE_URL;

interface RailInterface {
  title: string;
  data: (MovieInterface | TvShowInterface)[];
  type: string;
}

const Index = () => {
  const [bannerData, setBannerData] = useState<(MovieInterface | TvShowInterface)[]>([])
  const [railsData, setRailsData] = useState<RailInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [bannerLoading, setBannerLoading] = useState(true)
  const scrollY = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y
    }
  })

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, 50],
      [0, 1],
      'clamp'
    )
  }))

  const preloadBannerImages = async (bannerItems: (MovieInterface | TvShowInterface)[]) => {
    try {
      const imagePromises = bannerItems.map((item) => {
        return new Promise<void>((resolve, reject) => {
          Image.prefetch(`${ImageBaseUrl}${item.poster_path}`).then(() => resolve()).catch((error) => reject(error))
        })
      })
      await Promise.all(imagePromises)
      setBannerLoading(false);
      setLoading(false);
    } catch (error) {
      console.error('Banner image preload error:', error);
      setBannerLoading(false);
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [popularMovies, popularTvShows] = await Promise.all([
          getPopulars("movie"),
          getPopulars("tv")
        ])
        const bannerItems = [...popularMovies?.data.results.slice(0, 3), ...popularTvShows?.data.results.slice(0, 3)]
        bannerItems.sort(() => Math.random() - 0.5)
        setBannerData(bannerItems)

        const movieRailData = popularMovies?.data.results.slice(3)
        const tvRailData = popularTvShows?.data.results.slice(3)

        setRailsData([
          { title: "Popular Movies", data: movieRailData, type: "movie" },
          { title: "Popular Tv Shows", data: tvRailData, type: "tv" }
        ])
        await preloadBannerImages(bannerItems)
      }
      catch (error) {
        console.error(error);
        setLoading(false);
        setBannerLoading(false);
      }
    }
    fetchData()
  }, [])

  const renderContent = ({ item, index }: { item: RailInterface, index: number }) => {
    if (index === 0) {
      return (
        <>
          <BannerSlider bannerData={bannerData} />
          <View style={styles.sliderContainer}>
            <HorizontalSlider sliderData={[item]} type={item.type} />
          </View>
        </>
      )
    }
    return (
      <View style={styles.sliderContainer}>
        <HorizontalSlider sliderData={[item]} type={item.type} />
      </View>
    )
  }

  return (
    <View>
      <Animated.View style={[styles.headerContainer]}>
        <Animated.View style={[
          StyleSheet.absoluteFillObject,
          styles.headerBackground,
          headerAnimatedStyle
        ]} />
        <Header />
        <NavSlider />
      </Animated.View>
      {loading || bannerLoading ? (
        <View style={styles.bannerLoader}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <Animated.FlatList
          data={railsData.filter(rail => rail.data && rail.data.length > 0)}
          renderItem={renderContent}
          keyExtractor={(item, index) => `rail_${index}`}
          bounces={false}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollViewContent}
        />
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    height: 160,
  },
  headerBackground: {
    backgroundColor: 'black',
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  sliderContainer: {
    paddingHorizontal: 20,
  },
  sliderWrapper: {
    marginBottom: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerLoader: {
    height: 550,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
});

export default Index;