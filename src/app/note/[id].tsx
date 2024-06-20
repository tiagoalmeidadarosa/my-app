import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Note() {
  const item = useLocalSearchParams();
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Olá, {item.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  text: { fontSize: 18, fontWeight: "bold" },
});
