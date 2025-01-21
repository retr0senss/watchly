import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 90,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  }
});