import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  carouselContainer: {
    height: 700,
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
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: -2,
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
    height: "30%",
    width: "100%",
    zIndex: -1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    gap: 30,
  },
  textContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  description: {
    color: 'white',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    marginRight: 10,
  },
})

export default styles
