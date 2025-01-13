import { Text, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import { MovieInterface, TvShowInterface } from '@/interfaces/contentInterfaces';
import styles from './styles';
import { RelativePathString, useRouter } from 'expo-router';

const ImageBaseUrl = process.env.EXPO_PUBLIC_API_IMAGE_URL;

const ContentCard = ({ content }: { content: MovieInterface | TvShowInterface }) => {
  const [imageUri, setImageUri] = useState(`${ImageBaseUrl}${content.poster_path}`);
  const fallbackImage = "https://via.placeholder.com/300x450?text=No+Image";
  const router = useRouter();

  const preparePath = (content: MovieInterface | TvShowInterface) => {
    if ('title' in content) {
      return `/movies/${content.id}`;
    } else {
      return `/tvshows/${content.id}`;
    }
  }

  return (
    <Pressable style={styles.card} onPress={() => router.push(preparePath(content) as RelativePathString)}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        onError={() => setImageUri(fallbackImage)}
      />
      <Text style={styles.title} numberOfLines={2}>
        {'title' in content ? content.title : content.name}
      </Text>
    </Pressable>
  );
};

export default ContentCard;