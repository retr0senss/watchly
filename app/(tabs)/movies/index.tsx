//Core
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

//Components
import Header from '@/components/Header';
import Background from '@/components/Background';
import HorizontalSlider from '@/components/HorizontalSlider';
import BannerSlider from '@/components/BannerSlider';

//Interfaces
import { MovieInterface } from '@/interfaces/contentInterfaces';

//Services and Utils
import { getGenres } from '@/services/getGenres.service';
import { getDashboardData } from '@/utils/getDasboardData';
import { useDispatch } from 'react-redux';
import { setMovieGenres } from '@/store/slices/genres';
import { setActiveType } from '@/store/slices/activeType';

interface MovieRailInterface {
  title: string;
  data: MovieInterface[];
}

export default function Movies() {
  const [bannerData, setBannerData] = useState<MovieInterface[]>([]);
  const [movieRails, setMovieRails] = useState<MovieRailInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveType('movie'));
    const fetchData = async () => {
      try {
        const genresResponse = await getGenres({ type: 'movie' });
        const genres = genresResponse?.data?.genres;
        dispatch(setMovieGenres(genres));
        const dashboardData = await getDashboardData('movie', genres);
        const bannerData = dashboardData[0].data.slice(0, 5);
        setBannerData(bannerData);
        setMovieRails(dashboardData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header isHomePage />
      {/* <Background /> */}
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <>
            {/* <BannerSlider bannerData={bannerData} /> */}
            <HorizontalSlider sliderData={movieRails} type='movie' />
          </>
        )}
      </View >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});