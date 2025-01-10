import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    height: 110,
    backdropFilter: "blur(4px)",
  },
  searchContainer: {
    justifyContent: "flex-start",
    gap: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  searchButton: {
    marginRight: 20,
  },
  backButton: {
    marginLeft: 20,
  },
  inputContainer: {
    position: "relative",
    flex: 1,
    paddingLeft: 20
  },
  searchInput: {
    backgroundColor: "#0a0c10",
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: "white",
    borderRadius: 16,
  },
  clearButton: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -10 }],
    borderRadius: 50,
    backgroundColor: "hsla(0,0%,100%,.06)",
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  clearText: {
    color: "white",
    fontSize: 12,
  },
  genreButtonsContainer: {
    marginRight: 20,
    flexDirection: "row",
    gap: 10,
  }
});