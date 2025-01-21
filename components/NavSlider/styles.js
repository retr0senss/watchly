import { StyleSheet } from "react-native";

export default StyleSheet.create({
  buttonContainer: {
    gap: 30,
    height: 70,
    alignItems: 'center',
    marginLeft: 20,
  },
  selectedButton: {
    backgroundColor: 'rgb(62, 84, 199)',
    borderRadius: 100,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
})