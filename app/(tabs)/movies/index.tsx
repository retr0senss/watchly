import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
} from 'react-native-reanimated';

//Components
import Header from '@/components/Header';
import HorizontalSlider from '@/components/HorizontalSlider';
import BannerSlider from '@/components/BannerSlider';
import NavSlider from '@/components/NavSlider';

//Services and Utils
import { getGenres } from '@/services/getGenres.service';
import { getDashboardData } from '@/utils/getDasboardData';
import { useDispatch } from 'react-redux';
import { setMovieGenres } from '@/store/slices/genres';
import { MovieInterface } from '@/interfaces/contentInterfaces';

const ImageBaseUrl = process.env.EXPO_PUBLIC_API_IMAGE_URL;
interface MovieRailInterface {
  title: string;
  data: MovieInterface[];
}

export default function Movies() {
  const [bannerData, setBannerData] = useState<MovieInterface[]>([]);
  const [movieRails, setMovieRails] = useState<MovieRailInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [bannerLoading, setBannerLoading] = useState(true);
  const dispatch = useDispatch();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, 50],
      [0, 1],
      'clamp'
    ),
  }));

  const preloadBannerImages = async (bannerItems: MovieInterface[]) => {
    try {
      const imagePromises = bannerItems.map((item) => {
        return new Promise<void>((resolve, reject) => {
          Image.prefetch(`${ImageBaseUrl}${item.poster_path}`)
            .then(() => resolve())
            .catch(reject);
        });
      });

      await Promise.all(imagePromises);
      setBannerLoading(false);
      setLoading(false);
    } catch (error) {
      console.error('Banner image preload error:', error);
      setBannerLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genresResponse = await getGenres({ type: 'movie' });
        const genres = genresResponse?.data?.genres;
        dispatch(setMovieGenres(genres));
        const dashboardData = await getDashboardData('movie', genres);

        const bannerItems = dashboardData[0].data.slice(0, 5);
        setBannerData(bannerItems);

        const updatedDashboardData = [...dashboardData];
        updatedDashboardData[0] = {
          ...updatedDashboardData[0],
          data: updatedDashboardData[0].data.slice(5)
        };

        setMovieRails(updatedDashboardData);
        await preloadBannerImages(bannerItems);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setBannerLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderContent = ({ item, index }: { item: any; index: number }) => {
    if (index === 0) {
      return (
        <>
          <BannerSlider bannerData={bannerData} />
          <View style={styles.sliderContainer}>
            <HorizontalSlider sliderData={[item]} type='movie' />
          </View>
        </>
      );
    }
    return (
      <View style={styles.sliderContainer}>
        <HorizontalSlider sliderData={[item]} type='movie' />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
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
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <Animated.FlatList
          data={movieRails.filter(rail => rail.data && rail.data.length > 0)}
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
  );
}

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