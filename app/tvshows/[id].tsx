import { ImageBackground, Pressable, StyleSheet, Text, View, ScrollView, ActivityIndicator, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Background from '@/components/Background'
import { useLocalSearchParams, useSegments } from 'expo-router'
import { getContentDetails } from '@/services/getContentDetails.service'
import { router } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/AntDesign'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import DetailsHeader from '@/components/DetailsHeader'
import CastList from '@/components/CastList'
import SimilarContents from '@/components/SimilarContents'
import { TvShowDetailsInterface } from '@/interfaces/tvShowsDetailInterface'
import { LinearGradient } from 'expo-linear-gradient'

const TvShowsDetail = () => {
  const { id } = useLocalSearchParams();
  const [tvShowDetails, setTvShowDetails] = useState<TvShowDetailsInterface>();
  const [isLoaded, setIsLoaded] = useState(false);
  const segments = useSegments();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchTvShowDetails = async () => {
      try {
        const response = await getContentDetails("tv", id as string);
        if (response?.data) {
          response.data.video = response.data.videos.results.find((video: any) => video.type === "Trailer")?.key;
          response.data.seasons = checkNotAiredSeasons(response.data.seasons);
          response.data.number_of_episodes = response.data.seasons.reduce((acc: number, season: any) => acc + season.episode_count, 0);
        }
        scrollRef.current?.scrollTo({ y: 0, animated: true });
        setTvShowDetails(response?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTvShowDetails();
  }, [segments]);

  const checkNotAiredSeasons = (seasons: any) => {
    return seasons.filter((season: any) => new Date(season.air_date) < new Date());
  }

  return (
    <SafeAreaProvider>
      <StatusBar hidden />
      <Background setIsLoaded={setIsLoaded} imageUrl={`https://image.tmdb.org/t/p/original${tvShowDetails?.poster_path}`} />
      {
        isLoaded ? (
          <>
            <View style={styles.container}>
              <View style={styles.contentHeader}>
                <ImageBackground
                  source={{ uri: `https://image.tmdb.org/t/p/original${tvShowDetails?.poster_path}` }}
                  style={styles.backgroundContainer}
                  imageStyle={styles.imageBackground}
                />
                <Pressable
                  onPress={() => router.back()}
                  style={({ pressed }) => [
                    styles.backButton,
                    { backgroundColor: pressed ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.5)" }
                  ]}>
                  <Entypo name="chevron-left" size={24} color="white" />
                </Pressable>
                <AntDesign style={styles.starIcon} name="staro" size={24} color="yellow" />
                <LinearGradient
                  colors={['rgba(0,0,0,.9)', 'rgba(0, 0, 0, .7)', 'rgba(0, 0, 0, .3)', 'rgba(0, 0, 0, .2)', 'rgba(0,0,0,.1)']}
                  start={[0, 1]}
                  end={[0, 0]}
                  locations={[0, 0.2, 0.35, 0.8, 1]}
                  style={styles.gradient}
                />
              </View>
              <ScrollView style={styles.detailsContainer} ref={scrollRef}>
                <DetailsHeader contentDetails={tvShowDetails} />
                <View style={styles.aboutContainer}>
                  <Text style={styles.aboutTitle}>About the TV Show</Text>
                  <Text style={styles.aboutText}>{tvShowDetails?.overview}</Text>
                </View>
                <CastList cast={tvShowDetails?.credits.cast} />
                <SimilarContents similar={tvShowDetails?.similar.results} type="TV Shows" />
              </ScrollView>
            </View>
          </>
        ) : (
          <>
            <View style={styles.loadingContainer}>
              <ImageBackground
                source={require("@/assets/images/homeBG.jpg")}
                style={styles.loadingBackground}
              >
                <ActivityIndicator size="large" color="white" />
              </ImageBackground>
            </View>
          </>
        )
      }
    </SafeAreaProvider>
  )
}

export default TvShowsDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentHeader: {
    width: "100%",
    flexDirection: "row",
    height: 350,
    backdropFilter: "blur(4px)",
    borderRadius: 10,
    position: "sticky",
    zIndex: 1
  },
  backgroundContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -2,
  },
  imageBackground: {
    borderRadius: 20,
    objectFit: "fill",
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 32,
    height: 32,
    marginRight: "auto",
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  starIcon: {
    marginLeft: "auto",
    marginRight: 20,
    marginTop: 30
  },
  gradient: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 10,
    zIndex: -1
  },
  detailsContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  aboutContainer: {
    marginTop: 20,
  },
  aboutTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
})
