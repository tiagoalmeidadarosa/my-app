import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { styles } from "./styles";
import { Note } from "@prisma/client/react-native";

interface CardProps {
  note: Note;
}

export function Card({ note }: CardProps) {
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
      onPress={() =>
        router.push({
          pathname: `/note`,
          params: note,
        })
      }
    >
      <Text style={styles.text}>{note.title}</Text>
    </TouchableOpacity>
  );
}
