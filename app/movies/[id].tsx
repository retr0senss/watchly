import { ImageBackground, Pressable, StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Background from '@/components/Background'
import { useLocalSearchParams } from 'expo-router'
import { getContentDetails } from '@/services/getContentDetails.service'
import { MovieDetailsInterface } from '@/interfaces/contentInterfaces'
import { router, useSegments } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/AntDesign'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import DetailsHeader from '@/components/DetailsHeader'
import CastList from '@/components/CastList'
import SimilarContents from '@/components/SimilarContents'
import { LinearGradient } from 'expo-linear-gradient'



const MovieDetailPage = () => {
  const { id } = useLocalSearchParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetailsInterface>();
  const [isLoaded, setIsLoaded] = useState(false);
  const segments = useSegments();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 800); // Show loader for at least 2 seconds
  }, [])

  useEffect(() => {
    fetchMovieDetails();
  }, [segments]);

  const runtimeHandler = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return (hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`);
  }

  const fetchMovieDetails = async () => {
    try {
      const response = await getContentDetails("movie", id as string);
      if (response?.data) {
        response.data.genres = [
          {
            id: response.data.runtime,
            name: runtimeHandler(response.data.runtime)
          },
          ...response.data.genres
        ];
        response.data.video = response.data.videos.results.find((video: any) => video.type === "Trailer")?.key;
      }
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      setMovieDetails(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar hidden />
      {isLoaded ? (
        <>
          <Background imageUrl={`${movieDetails?.poster_path}`} />
          <View style={styles.container}>
            <View style={styles.contentHeader}>
              <ImageBackground
                source={{ uri: `https://image.tmdb.org/t/p/original${movieDetails?.poster_path}` }}
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
              <DetailsHeader contentDetails={movieDetails} />
              <View style={styles.aboutContainer}>
                <Text style={styles.aboutTitle}>About the movie</Text>
                <Text style={styles.aboutText}>{movieDetails?.overview}</Text>
              </View>
              <CastList cast={movieDetails?.credits.cast} />
              <SimilarContents similar={movieDetails?.similar.results} type="Movies" />
            </ScrollView>
          </View>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Background />
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </SafeAreaProvider>
  )
}

export default MovieDetailPage

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