import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { GenreInterface, MovieInterface, TvShowInterface } from '@/interfaces/contentInterfaces';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import styles from './styles';
import { router } from 'expo-router';

const ImageBaseUrl = process.env.EXPO_PUBLIC_API_IMAGE_URL;

const roundToHalf = (num: number) => {
  return Math.round(num * 2) / 2;
};

const DetailedContentCard = ({ content, genres }: { content: MovieInterface | TvShowInterface, genres: GenreInterface[] }) => {
  const getGenreNames = (genreIds: number[]) => {
    return genreIds.map(id => genres.find(genre => genre.id === id)?.name).filter(Boolean).join(", ");
  };
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={() => { router.push(`/movies/${content.id}`) }}>
      <ImageBackground
        style={styles.cardBackground}
        source={{ uri: `${ImageBaseUrl}${content.backdrop_path}` }}
      />
      <Image
        source={{ uri: `${ImageBaseUrl}${content.poster_path}` }}
        style={styles.posterImage}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0.8)', 'rgba(0,0,0,.7)']}
        style={styles.cardBackground}
        start={[0, 0]}
        end={[1, 0]}
        locations={[0, 0.2, 0.35, 0.8, 1]}
      />
      <View style={styles.cardContent}>
        <View style={styles.cardTextContent}>
          <Text style={styles.title} numberOfLines={1}>
            {'title' in content ? content.title : content.name}
          </Text>
          <StarRatingDisplay
            rating={roundToHalf(content.vote_average / 2)}
            starSize={16}
            starStyle={{ marginRight: -4 }}
          />
          {'release_date' in content && <Text style={styles.releaseDate}>
            {content.release_date.split("-")[0]}
          </Text>}
          <Text style={styles.genres} numberOfLines={1}>
            {getGenreNames(content.genre_ids)}
          </Text>
          <Text style={styles.overview} numberOfLines={5}>
            {content.overview}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DetailedContentCard;
