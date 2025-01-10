import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import { MovieInterface, TvShowInterface } from '@/interfaces/contentInterfaces';
import styles from './styles';

const ImageBaseUrl = process.env.EXPO_PUBLIC_API_IMAGE_URL;

const ContentCard = ({ content }: { content: MovieInterface | TvShowInterface }) => {
  const [imageUri, setImageUri] = useState(`${ImageBaseUrl}${content.poster_path}`);
  const fallbackImage = "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        onError={() => setImageUri(fallbackImage)}
      />
      <Text style={styles.title} numberOfLines={2}>
        {'title' in content ? content.title : content.name}
      </Text>
    </View>
  );
};

export default ContentCard;