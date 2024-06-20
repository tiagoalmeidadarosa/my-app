import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { router } from "expo-router";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

export default function Home() {
  const notes = [
    { title: "Cooking class", content: "Conteúdo da nota 1" },
    { title: "Groceries", content: "Conteúdo da nota 2" },
    { title: "Learning english", content: "Conteúdo da nota 3" },
    { title: "Supermarket", content: "Conteúdo da nota 3" },
    { title: "Cooking class", content: "Conteúdo da nota 1" },
    { title: "Groceries", content: "Conteúdo da nota 2" },
    { title: "Learning english", content: "Conteúdo da nota 3" },
    { title: "Supermarket", content: "Conteúdo da nota 3" },
  ];

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Notes:</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.listWrapper}>
            {notes.map((note, index) => (
              <Card key={index} id={index} title={note.title} />
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon="logo-google"
          title="Entrar com Google"
          //onPress={() => router.navigate("note")}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 32, gap: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 16, padding: 8 },
  listWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 72,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    padding: 16,
    width: "100%",
  },
});
