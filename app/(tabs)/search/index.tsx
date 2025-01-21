import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '@/components/Header';
import Background from '@/components/Background';
import { searchMovies, searchMulti, searchTvShows } from '@/services/search.service';
import debounce from 'lodash/debounce';
import { MovieInterface, TvShowInterface } from '@/interfaces/contentInterfaces';
import VerticalSlider from '@/components/VerticalSlider';
import { useSelector } from 'react-redux';
import { orderByPopularity } from '@/utils/utils';
import { getPopulars } from '@/services/getContents.service';
import HorizontalSlider from '@/components/HorizontalSlider';
import { AntDesign, Feather } from '@expo/vector-icons';

interface PopularsRailInterface {
  title: string;
  data: MovieInterface[] | TvShowInterface[];
  contentType?: 'movie' | 'tv';
}

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MovieInterface[] | TvShowInterface[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [popularsRailData, setPopularsRailData] = useState<PopularsRailInterface[]>([]);
  const { activeType } = useSelector((state: any) => state.activeType);

  useEffect(() => {
    const fetchPopularContent = async () => {
      try {
        const [movieResponse, tvResponse] = await Promise.all([
          getPopulars("movie"),
          getPopulars("tv")
        ]);

        setPopularsRailData([
          {
            data: movieResponse?.data?.results,
            title: "Popular Movies",
            contentType: 'movie'
          },
          {
            data: tvResponse?.data?.results,
            title: "Popular TV Shows",
            contentType: 'tv'
          }
        ]);
      } catch (error) {
        console.error('Error fetching popular content:', error);
      }
    };

    fetchPopularContent();

    if (searchValue === '') {
      setSearchResults([]);
    } else {
      handleSearch(searchValue);
    }
  }, [searchValue]);

  const handleSearch = useCallback(debounce((searchValue: string) => {
    setIsTyping(false);
    if (searchValue !== '') {
      setSearchLoading(true);
      searchMulti(searchValue).then(res => {
        setSearchResults(orderByPopularity(res?.data?.results));
        setSearchLoading(false);
      });

    }
  }, 500), []);

  const onChange = (text: string) => {
    setIsTyping(true);
    setSearchLoading(false);
    setSearchResults([]);
    setSearchValue(text);
  };

  const renderResults = () => {
    if (isTyping) {
      return null;
    }
    if (searchValue.length > 0 && searchResults.length > 0) {
      return (
        <View style={styles.searchResultContainer}>
          <Text style={styles.searchResultTitle}>Search Results for {searchValue}</Text>
          <VerticalSlider verticalSliderData={searchResults} type='movie' />
        </View>
      );
    }
    else if (searchValue.length === 0) {
      return (
        <View>
          <HorizontalSlider
            sliderData={popularsRailData}
            isSearchPage={true}
          />
        </View>
      );
    }
    else {
      return (
        <View>
          <Text style={styles.searchResultTitle}>No results found for {searchValue}</Text>
          <HorizontalSlider
            sliderData={popularsRailData}
            isSearchPage={true}
          />
        </View>
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <>
        <Header />
        <View style={styles.container}>
          <View style={styles.searchInputContainer}>
            <Feather name="search" size={24} color="white" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Find your next movie or TV show"
              placeholderTextColor="rgba(255,255,255,0.5)"
              onChangeText={onChange}
              value={searchValue}
            />
            {
              searchValue.length > 0 && (
                <AntDesign
                  name="closecircle"
                  size={24}
                  color="rgba(255,255,255,0.5)"
                  onPress={() => {
                    Keyboard.dismiss()
                    setSearchValue("")
                  }}
                  style={styles.closeIcon}
                />
              )
            }
          </View>
          {searchLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            renderResults()
          )}
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  searchResultContainer: {
    marginTop: 20,
    width: '100%',
    paddingBottom: 100,
    alignItems: "center"
  },
  searchResultTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgb(35,31,36)',
    color: 'white',
    paddingLeft: 50,
    borderRadius: 100,
    marginBottom: 20,
  },
  searchInputContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    top: 27,
    left: 15,
    zIndex: 1,
    transform: [{ translateY: -15 }]
  },
  closeIcon: {
    position: 'absolute',
    top: 27,
    right: 15,
    zIndex: 1,
    transform: [{ translateY: -15 }]
  }
});