import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";

interface CardProps {
  id: number;
  title: string;
}

export function Card({ id, title }: CardProps) {
  const getRandomColor = () => {
    var color = "#";
    var letters = "0123456789ABCDEF";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: getRandomColor() }]}
      activeOpacity={0.8}
      onPress={() => router.push({ pathname: `/note/${id}`, params: { title } })}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
