import React from 'react';
import { View, Text, FlatList, Keyboard } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import ContentCard from '../ContentCard';
import { RelativePathString, router } from 'expo-router';
import { MovieInterface, TvShowInterface } from '@/interfaces/contentInterfaces';
import { createGenreRoute } from '@/utils/utils';
import styles from './styles';

interface SliderDataInterface {
  title: string;
  data: MovieInterface[] | TvShowInterface[];
}

interface HorizontalSliderProps {
  sliderData: SliderDataInterface[];
  type: string;
}

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({ sliderData, type }) => {
  return (
    type === 'tv' ? (
      <FlatList
        data={sliderData}
        keyExtractor={item => item.title}
        key="horizontal"
        keyboardDismissMode='on-drag'
        onScrollBeginDrag={Keyboard.dismiss}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.railContainer}>
            <View style={styles.railHeader}>
              <Text style={styles.railTitle} onPress={() => router.push(`/tvshows/genres/${createGenreRoute(item.title)}` as RelativePathString)}>{item.title}</Text>
              <Entypo name="chevron-right" size={24} color="white" onPress={() => router.push(`/tvshows/genres/${createGenreRoute(item.title)}` as RelativePathString)} />
            </View>
            <FlatList
              data={item.data as TvShowInterface[]}
              horizontal
              renderItem={({ item }) => <ContentCard content={item} />}
              keyExtractor={item => item.id.toString()}
              keyboardDismissMode='on-drag'
              onScrollBeginDrag={Keyboard.dismiss}
              contentContainerStyle={{ gap: 10 }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}
      />
    ) :
      (
        <FlatList
          data={sliderData}
          keyExtractor={item => item.title}
          key="horizontal"
          keyboardDismissMode='on-drag'
          onScrollBeginDrag={Keyboard.dismiss}
          contentContainerStyle={{ marginTop: 20 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.railContainer}>
              <View style={styles.railHeader}>
                <Text style={styles.railTitle} onPress={() => router.push(`/movies/genres/${createGenreRoute(item.title)}` as RelativePathString)}>{item.title}</Text>
                <Entypo name="chevron-right" size={24} color="white" onPress={() => router.push(`/movies/genres/${createGenreRoute(item.title)}` as RelativePathString)} />
              </View>
              <FlatList
                data={item.data as MovieInterface[]}
                horizontal
                renderItem={({ item }) => <ContentCard content={item} />}
                keyExtractor={item => item.id.toString()}
                keyboardDismissMode='on-drag'
                onScrollBeginDrag={Keyboard.dismiss}
                contentContainerStyle={{ gap: 10 }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
        />
      )
  )
}

export default HorizontalSlider