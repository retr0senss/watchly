import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { MovieInterface, TvShowInterface } from '@/interfaces/contentInterfaces'
import ContentCard from '@/components/ContentCard'

const SimilarContents = ({ similar, type }: { similar?: MovieInterface[] | TvShowInterface[], type: string }) => {
  return (
    <View style={styles.similarContainer}>
      <Text style={styles.similarTitle}>Similar {type}</Text>
      {
        type === "movie" ?
          <FlatList
            data={similar as MovieInterface[]}
            horizontal
            renderItem={({ item }) => <ContentCard content={item} />}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          /> :
          <FlatList
            data={similar as TvShowInterface[]}
            horizontal
            renderItem={({ item }) => <ContentCard content={item} />}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
      }
    </View>
  )
}

export default SimilarContents

const styles = StyleSheet.create({
  similarContainer: {
    marginVertical: 10,
  },
  similarTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  flatListContent: {
    gap: 10
  }
})
