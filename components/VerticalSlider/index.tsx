import React from 'react'
import { FlatList, Keyboard } from 'react-native'
import ContentCard from '../ContentCard'
import { MovieInterface, TvShowInterface } from '@/interfaces/contentInterfaces'

interface VerticalSliderProps {
  verticalSliderData: MovieInterface[] | TvShowInterface[]
  type?: string
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({ verticalSliderData, type }) => {
  return (
    type === 'tv' ? (
      <FlatList
        data={verticalSliderData as TvShowInterface[]}
        renderItem={({ item }) => <ContentCard content={item} />}
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
    ) :
      (
        <FlatList
          data={verticalSliderData as MovieInterface[]}
          renderItem={({ item }) => <ContentCard content={item} />}
          keyExtractor={item => item.id.toString()}
          keyboardDismissMode='on-drag'
          onScrollBeginDrag={Keyboard.dismiss}
          numColumns={3}
          key="grid"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{ gap: 20, marginBottom: 20, alignItems: 'center' }}
          contentContainerStyle={{ marginVertical: 20, marginBottom: 20 }}
        />
      )
  )
}

export default VerticalSlider