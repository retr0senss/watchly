import React from 'react'
import { View, Text, Pressable, FlatList } from 'react-native'
import { MovieInterface, TvShowInterface } from '@/interfaces/contentInterfaces';
import styles from './styles'

interface PaginationProps {
  page: number;
  listRef: React.RefObject<FlatList>;
  setPage: (page: number) => void;
  genreData: MovieInterface[] | TvShowInterface[];
}

const Pagination: React.FC<PaginationProps> = ({ page, listRef, setPage, genreData }) => {
  return (
    <View style={styles.paginationContainer}>
      <Pressable onPress={() => {
        if (page === 1) return
        listRef.current?.scrollToOffset({ animated: true, offset: 0 })
        setPage(page - 1)
      }} style={styles.paginationButton}>
        <Text >
          Prev
        </Text>
      </Pressable>
      <Text style={styles.paginationButton}>{page}</Text>
      <Pressable style={styles.paginationButton} onPress={() => {
        if (genreData?.length < 20) return
        listRef.current?.scrollToOffset({ animated: true, offset: 0 })
        setPage(page + 1)
      }}>
        <Text>
          Next
        </Text>
      </Pressable>
    </View>
  )
}

export default Pagination