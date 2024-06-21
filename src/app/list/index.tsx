import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { Card } from "@/components/Card";
import { ActionButton } from "@/components/ActionButton";
import { prismaClient } from "@/services/db";

export default function List() {
  const notes = [
    ...prismaClient.note.useFindMany(),
    { id: 95, title: "Cooking class", content: "Conteúdo da nota 1" },
    { id: 96, title: "Groceries", content: "Conteúdo da nota 2" },
    { id: 97, title: "Learning english", content: "Conteúdo da nota 3" },
    { id: 98, title: "Supermarket", content: "Conteúdo da nota 3" },
    { id: 99, title: "Cooking class", content: "Conteúdo da nota 1" },
  ];

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Notes:</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.listWrapper}>
            {notes.map((note, index) => (
              <Card key={index} data={note} />
            ))}
          </View>
        </ScrollView>
      </View>
      <ActionButton icon="add" onPress={() => router.navigate("note")} />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 32, paddingBottom: 0, gap: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 16, padding: 8 },
  listWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 38,
  },
});
