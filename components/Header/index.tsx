import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, usePathname } from 'expo-router';
import styles from './styles';
import { Entypo, FontAwesome } from '@expo/vector-icons';

interface HeaderProps {
  gridView?: boolean;
  setGridView?: (value: boolean) => void;
  openModal?: (() => void) | null;
}

const Header: React.FC<HeaderProps> = ({ gridView, setGridView, openModal }) => {
  const pathname = usePathname();

  const renderGenresHeader = () => (
    <View style={styles.container}>
      <Entypo name="chevron-left" size={24} color="white" onPress={() => router.back()} />
      <View style={styles.headerRight}>
        {gridView ? (
          <Entypo name="list" size={24} color="white" onPress={() => setGridView && setGridView(false)} />
        ) : (
          <Entypo name="grid" size={24} color="white" onPress={() => setGridView && setGridView(true)} />
        )}
        {openModal && <FontAwesome name="filter" size={24} color="white" onPress={openModal} />}
      </View>
    </View>
  );

  const renderDefaultHeader = () => (
    <View style={styles.container}>
      <Text style={styles.title}>{pathname === "/search" ? "Search" : "Watchly"}</Text>
    </View>
  );

  return (
    <>
      <StatusBar style="light" />
      {pathname.includes("/genres/") ? renderGenresHeader() : renderDefaultHeader()}
    </>
  );
};

export default Header;
