import React from 'react'
import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import { PersonInterface } from '@/interfaces/contentInterfaces'

const CastList = ({ cast }: { cast?: PersonInterface[] }) => {
  return (
    <View style={styles.castContainer}>
      <Text style={styles.castTitle}>Cast</Text>
      <FlatList
        data={cast}
        horizontal
        renderItem={({ item }) => <View style={styles.castItem}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/original${item.profile_path}` }}
            style={styles.castImage}
          />
          <Text style={styles.castName}>{item.name}</Text>
          <Text style={styles.characterName}>{item?.character?.split("/")[0]}</Text>
          {
            item?.character?.split("/")[1] &&
            <Text style={styles.characterName}>{item?.character?.split("/")[1]}</Text>
          }
        </View>}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

export default CastList

const styles = StyleSheet.create({
  castContainer: {
    marginTop: 20,
  },
  castTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  castItem: {
    gap: 10,
    width: 120,
  },
  castImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  castName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  flatListContent: {
    gap: 10
  },
  characterName: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    fontWeight: "bold",
  }
})
