import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  carouselContainer: {
    height: 550,
    marginBottom: 30
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
  },
  imagePlaceholder: {
    position: 'absolute',
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles
