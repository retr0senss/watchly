import { View, FlatList, Keyboard, StyleSheet, ActivityIndicator, Text, Modal, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import Background from '@/components/Background';
import Header from '@/components/Header';
import { useLocalSearchParams } from 'expo-router';
import { getPopulars, getPopularsOfGenreList, getTopRated } from '@/services/getContents.service';
import { MovieInterface } from '@/interfaces/contentInterfaces';
import ContentCard from '@/components/ContentCard';
import { createGenreRoute } from '@/utils/utils';
import { useSelector } from 'react-redux';
import SortModalComponent from '@/components/SortModal';

const GenrePage = () => {
  const { name } = useLocalSearchParams();
  const genreTitle = typeof name === 'string' ? name.replaceAll("-", " ").toUpperCase() : '';
  const [page, setPage] = useState<number>(1);
  const [genreData, setGenreData] = useState<MovieInterface[]>([]);
  const [gridView, setGridView] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState<'popularity.desc' | 'vote_average.desc'>('popularity.desc');
  const { movieGenres } = useSelector((state: any) => state.genres);

  useEffect(() => {
    fetchGenreData();
  }, [sortOrder]);

  const fetchGenreData = async () => {
    try {
      let data;
      if (name === "top-rated") {
        const response = await getTopRated("movie", page);
        data = response?.data?.results;
      } else if (name === "popular") {
        const response = await getPopulars("movie", page);
        data = response?.data?.results;
      } else {
        const genreArray = movieGenres.filter((genre: { name: string }) => createGenreRoute(genre.name) === name);
        const response = await getPopularsOfGenreList("movie", genreArray, page, sortOrder);
        data = response?.[0]?.data;
      }
      setGenreData([...genreData, ...data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header title={genreTitle} isGenrePage gridView={gridView} setGridView={setGridView} openModal={(name === "top-rated" || name === "popular") ? undefined : setModalVisible} />
      <Background />
      <View style={styles.container}>
        <SortModalComponent
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setPage={setPage}
          setGenreData={setGenreData}
          setSortOrder={setSortOrder}
        />
        <Text style={styles.title}>{`${genreTitle} MOVIES`}</Text>
        <FlatList
          data={genreData}
          keyExtractor={(item) => `${item.id}-${item.popularity}-${item.vote_average}`}
          renderItem={({ item }) => <ContentCard content={item} />}
          keyboardDismissMode='on-drag'
          onScrollBeginDrag={Keyboard.dismiss}
          numColumns={gridView ? 3 : 1}
          key={gridView ? "grid" : "list"}
          columnWrapperStyle={gridView ? { gap: 10, marginBottom: 20 } : undefined}
          contentContainerStyle={{ marginVertical: 20 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          onEndReached={() => {
            setPage(page + 1);
            fetchGenreData();
          }}
          onEndReachedThreshold={0.8}
          ListFooterComponent={<ActivityIndicator size="large" color="#fff" />}
        />
      </View>
    </>
  );
};

export default GenrePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .8)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    backgroundColor: "black",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
    width: 200,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 50,
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  }
});