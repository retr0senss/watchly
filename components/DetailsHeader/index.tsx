import React from 'react'
import { View, Text, FlatList, StyleSheet, Pressable, Linking } from 'react-native'
import { MovieDetailsInterface } from '@/interfaces/contentInterfaces'
import AntDesign from '@expo/vector-icons/AntDesign'
import { TvShowDetailsInterface } from '@/interfaces/tvShowsDetailInterface'

const DetailsHeader = ({ contentDetails }: { contentDetails?: MovieDetailsInterface | TvShowDetailsInterface }) => {
  return (
    <View style={styles.detailsHeader}>
      {contentDetails && (
        <Text style={styles.title}>{"title" in contentDetails ? contentDetails.title : contentDetails.name}</Text>
      )}
      {contentDetails && (
        <Text style={styles.tagline}>
          {"release_date" in contentDetails
            ? contentDetails?.release_date.split("-")[0]
            : `${contentDetails?.seasons.length} Seasons / ${"number_of_episodes" in contentDetails ? contentDetails.number_of_episodes : ''} Episodes`}
        </Text>
      )}
      <FlatList
        data={contentDetails?.genres}
        horizontal
        renderItem={({ item }) => <View style={styles.genreCard}>
          <Text style={styles.genreText}>{item.name}</Text>
        </View>}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.voteTrailerContainer}>
        <View style={styles.voteContainer}>
          <AntDesign name="star" size={24} color="yellow" />
          <Text style={styles.voteText}>{contentDetails?.vote_average.toFixed(1)}/10</Text>
          <Text style={styles.voteCountText}>{contentDetails?.vote_count} votes</Text>
        </View>
        {contentDetails?.video &&
          <Pressable
            style={styles.trailerButton}
            onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${contentDetails?.video}`)}>
            <AntDesign name="playcircleo" size={24} color="white" />
            <Text style={styles.trailerButtonText}>
              Play Trailer
            </Text>
          </Pressable>}
      </View>
    </View>
  )
}

export default DetailsHeader

const styles = StyleSheet.create({
  detailsHeader: {
    flexDirection: "column",
    gap: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
    paddingBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  tagline: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  genreCard: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    borderRadius: 10,
  },
  genreText: {
    color: 'rgba(255,255,255,0.7)',
  },
  voteTrailerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  voteText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 5
  },
  voteCountText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    fontWeight: "bold"
  },
  trailerButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 5
  },
  trailerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  flatListContent: {
    gap: 10
  }
})
