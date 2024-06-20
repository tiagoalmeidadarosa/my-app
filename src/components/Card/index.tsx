import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface CardProps {
  title: string;
}

export function Card({ title }: CardProps) {
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
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
