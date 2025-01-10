import { StyleSheet } from "react-native";

export default StyleSheet.create({
  cardContainer: {
    width: 350,
    height: 200,
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  cardBackground: {
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: -2,
    borderRadius: 10,
  },
  posterImage: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -2,
    width: 120,
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    gap: 10,
    position: "absolute",
    top: 0,
    right: 0,
    width: 220,
  },
  cardTextContent: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: "column",
    gap: 5,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  rating: {
    color: "white",
    fontSize: 16,
  },
  releaseDate: {
    color: "white",
    fontSize: 14,
  },
  genres: {
    color: "white",
    fontSize: 14,
  },
  overview: {
    color: "white",
    fontSize: 12,
  },
});