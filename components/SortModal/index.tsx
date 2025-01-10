import { View, Text, Pressable, Modal } from 'react-native'
import React from 'react'
import styles from './styles'

interface SortModalComponentProps {
  modalVisible: boolean,
  setModalVisible: (arg: boolean) => void,
  setPage: (arg: number) => void,
  setGenreData: (arg: any) => void,
  setSortOrder: (arg: 'popularity.desc' | 'vote_average.desc') => void
}


const SortModalComponent = ({
  modalVisible,
  setModalVisible,
  setPage,
  setGenreData,
  setSortOrder
}: SortModalComponentProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Sort By</Text>
          <Pressable
            style={styles.closeButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.closeText}>X</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              setPage(1);
              setGenreData([]);
              setSortOrder('popularity.desc');
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Popularity</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              setPage(1);
              setGenreData([]);
              setSortOrder('vote_average.desc');
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.textStyle}>Rating</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

export default SortModalComponent