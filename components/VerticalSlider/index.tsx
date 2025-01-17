import React from 'react'
import { FlatList, Keyboard } from 'react-native'
import ContentCard from '../ContentCard'
import { MovieInterface, TvShowInterface } from '@/interfaces/contentInterfaces'

interface VerticalSliderProps {
  verticalSliderData: (MovieInterface | TvShowInterface)[]
  type?: string
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({ verticalSliderData, type }) => {
  const renderItem = ({ item }: { item: MovieInterface | TvShowInterface }) => (
    <ContentCard content={item} />
  );

  return (
    <FlatList
      data={verticalSliderData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      keyboardDismissMode='on-drag'
      onScrollBeginDrag={Keyboard.dismiss}
      numColumns={3}
      key="grid"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      columnWrapperStyle={{ gap: 10, marginBottom: 20 }}
      contentContainerStyle={{ marginVertical: 20 }}
    />
  );
}

export default VerticalSlider