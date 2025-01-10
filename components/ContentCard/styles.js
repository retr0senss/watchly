import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    width: 100,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    backdropFilter: "blur(5px)",
    transition: "0.3s",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "stretch",
    borderRadius: 10,
  },
  title: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    paddingBottom: 10,
  },
});