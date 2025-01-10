import { StyleSheet, Text, View } from "react-native";
import { RelativePathString, router } from "expo-router";
import Button from "@/components/Button";
import Background from "@/components/Background";
import { useDispatch } from "react-redux";
import { setActiveType } from "@/store/slices/activeType";

const Index = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Background />
      <View>
        <Text style={styles.title}>Watchly</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Movies"
            onPress={() => {
              dispatch(setActiveType("movie"));
              router.push("/movies" as RelativePathString)
            }}
          />
          <Button
            title="TV Shows"
            onPress={() => {
              dispatch(setActiveType("tv"));
              router.push("/tvshows" as RelativePathString)
            }}
          />
        </View>
      </View>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -999,
    filter: "brightness(0.3)",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 50,
    gap: 20,
  },
});

export default Index;