import { Dimensions, StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
  card: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    aspectRatio: 1.5,
    marginBottom: 15,
  },
  codeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
    color: "#333",
  },
  titleText: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginBottom: 10,
  },
});
