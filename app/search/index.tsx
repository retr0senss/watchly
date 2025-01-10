import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Header from '@/components/Header';
import Background from '@/components/Background';
import { searchMovies, searchMulti, searchTvShows } from '@/services/search.service';
import debounce from 'lodash/debounce';
import { MovieInterface, TvShowInterface } from '@/interfaces/contentInterfaces';
import VerticalSlider from '@/components/VerticalSlider';
import { useSelector } from 'react-redux';
import { orderByPopularity } from '@/utils/utils';

const Search = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MovieInterface[] | TvShowInterface[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const { activeType } = useSelector((state: any) => state.activeType);

  const handleSearch = useCallback(debounce((searchValue: string) => {
    if (searchValue !== '') {
      setSearchLoading(true);
      if (activeType === "tv") {
        searchTvShows(searchValue).then(res => {
          setSearchResults(orderByPopularity(res?.data?.results));
          setSearchLoading(false);
        });
      }
      else if (activeType === "movie") {
        searchMovies(searchValue).then(res => {
          setSearchResults(orderByPopularity(res?.data?.results));
          setSearchLoading(false);
        });
      }
      else {
        searchMulti(searchValue).then(res => {
          setSearchResults(orderByPopularity(res?.data?.results));
          setSearchLoading(false);
        });
      }
    }
  }, 500), [activeType]);

  const onChange = (text: string) => {
    setSearchLoading(false);
    setSearchResults([]);
    setSearchValue(text);
  };

  useEffect(() => {
    if (searchValue === '') {
      setSearchResults([]);
    } else {
      handleSearch(searchValue);
    }
  }, [searchValue]);

  return (
    <>
      <Header isSearchPage value={searchValue} placeHolder="Search for a tv show" onChange={onChange} />
      <Background />
      <View style={styles.container}>
        {searchLoading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : searchValue.length > 0 && searchResults.length > 0 ? (
          <View style={styles.searchResultContainer}>
            <Text style={styles.searchResultTitle}>Search Results for {searchValue}</Text>
            <VerticalSlider verticalSliderData={searchResults} type='movie' />
          </View>
        ) : null}
      </View>
    </>
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
  },
  searchResultTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});