import { Alert, Image, Pressable } from "react-native";
import { ThemedView } from "../ThemedView";
import { cardStyles } from "./style";
import { ThemedText } from "../ThemedText";

interface CardProps {
  code: number;
  title: string;
}

const Card = ({ code }: CardProps) => {

  const handlePress = () => {
    Alert.alert("Вы выбрали статус", `${code}: ${"title"}`);
  };

  return (
    // <ThemedView style={cardStyles.card}>
    //   {/* <Image style={cardStyles.image} source={{ uri: `https:/http.cat/${code}` }} resizeMode="contain" /> */}
    //   {/* <ThemedText style={cardStyles.codeText}>{code}</ThemedText>
    //   <ThemedText style={cardStyles.titleText}>{title}</ThemedText> */}
    // </ThemedView>
    <Pressable onPress={handlePress}>
      <Image
        style={cardStyles.image}
        source={{ uri: `https:/http.cat/${code}` }}
        resizeMode="contain"
      />
    </Pressable>
  );
};

export default Card;
