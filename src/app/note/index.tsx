import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Note() {
  let note = useLocalSearchParams();

  const isEditing = note?.id !== undefined;
  if (!isEditing) {
    note = { title: "Title default", content: "Your content here" };
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note?.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 16,
  },
  title: { fontSize: 32, fontWeight: "bold" },
});
