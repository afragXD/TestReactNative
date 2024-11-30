import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import {
  Button,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { codes, StatusInterface } from "@/constants/Codes";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [selectedItem, setSelectedItem] = useState<StatusInterface | null>(
    null
  );

  const handleCardPress = (item: StatusInterface) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const handleBackdropPress = (e: any) => {
    if (e.target === e.currentTarget) {
      setSelectedItem(null);
    }
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.header}>Смешные коты</ThemedText>
        <FlatList
          data={codes}
          keyExtractor={(item) => item.code.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleCardPress(item)}>
              <Image
                style={styles.image}
                source={{ uri: `https:/http.cat/${item.code}` }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
        <Modal
          visible={!!selectedItem}
          transparent={true}
          animationType="slide"
        >
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <ThemedView style={styles.modalContainer}>
              <ThemedView style={styles.modalContent}>
                <ThemedText style={styles.modalTitle}>
                  {selectedItem?.code} - {selectedItem?.title}
                </ThemedText>
                <ThemedText style={styles.modalDescription}>
                  {selectedItem?.description}
                </ThemedText>
                <Image
                  source={{ uri: `https://http.cat/${selectedItem?.code}` }}
                  style={styles.modalImage}
                  resizeMode="contain"
                />
                <Button title="Закрыть" onPress={handleCloseModal} />
              </ThemedView>
            </ThemedView>
          </TouchableWithoutFeedback>
        </Modal>
      </ThemedView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#ab4e52",
    paddingTop: 10,
  },
  list: {
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  image: {
    width: "100%",
    aspectRatio: 1.5,
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalImage: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
});
