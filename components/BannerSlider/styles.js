import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  carouselContainer: {
    height: 500,
    zIndex: 1,
    position: 'relative',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gradient: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 1,
  }
})

export default styles
