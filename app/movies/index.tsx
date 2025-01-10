//Core
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

//Components
import Header from '@/components/Header';
import Background from '@/components/Background';
import HorizontalSlider from '@/components/HorizontalSlider';

//Interfaces
import { MovieInterface } from '@/interfaces/contentInterfaces';

//Services and Utils
import { getGenres } from '@/services/getGenres.service';
import { getDashboardData } from '@/utils/getDasboardData';
import { useDispatch } from 'react-redux';
import { setMovieGenres } from '@/store/slices/genres';

interface MovieRailInterface {
  title: string;
  data: MovieInterface[];
}

export default function Movies() {
  const [movieRails, setMovieRails] = useState<MovieRailInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genresResponse = await getGenres({ type: 'movie' });
        const genres = genresResponse?.data?.genres;
        dispatch(setMovieGenres(genres));

        const dashboardData = await getDashboardData('movie', genres);
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
      <Background />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <HorizontalSlider sliderData={movieRails} type='movie' />
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
    paddingTop: 20,
  },
});