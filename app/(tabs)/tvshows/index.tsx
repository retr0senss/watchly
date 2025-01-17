//Core
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

//Components
import Header from '@/components/Header';
import Background from '@/components/Background';
import HorizontalSlider from '@/components/HorizontalSlider';

//Interfaces
import { TvShowInterface } from '@/interfaces/contentInterfaces';

//Services and Utils
import { getGenres } from '@/services/getGenres.service';
import { getDashboardData } from '@/utils/getDasboardData';
import { useDispatch } from 'react-redux';
import { setTvGenres } from '@/store/slices/genres';
import NavSlider from '@/components/NavSlider';

interface TvShowRailInterface {
  title: string;
  data: TvShowInterface[];
}

export default function TvShows() {
  const [tvShowsRails, setTvShowsRails] = useState<TvShowRailInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const genresResponse = await getGenres({ type: 'tv' });
        const genres = genresResponse?.data?.genres;
        dispatch(setTvGenres(genres));

        const dashboardData = await getDashboardData('tv', genres);
        setTvShowsRails(dashboardData);
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Header isHomePage />
      {/* <Background /> */}
      <View style={styles.container}>
        {
          loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <>
              <NavSlider />
              <HorizontalSlider sliderData={tvShowsRails} type='tv' />
            </>
          )
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    gap: 15,
    width: "100%",
  },
  railContainer: {
    height: 300,
    gap: 20,
  },
  railHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  railTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchResultContainer: {
    marginTop: 20,
    width: '100%',
    paddingBottom: 100,
  },
  searchResultTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});