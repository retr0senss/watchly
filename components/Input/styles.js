import { StyleSheet } from "react-native";

export default StyleSheet.create({
  searchContainer: {
    position: "relative"
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
});