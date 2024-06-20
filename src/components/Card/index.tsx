import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface CardProps {
  title: string;
}

export function Card({ title }: CardProps) {
  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: generateColor() }]}
      activeOpacity={0.8}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
