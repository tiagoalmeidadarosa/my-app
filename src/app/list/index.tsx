import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";
import { Card } from "@/components/Card";
import { ActionButton } from "@/components/ActionButton";
import { prismaClient } from "@/services/db";

export default function List() {
  const notes = prismaClient.note.useFindMany();

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
      <ActionButton
        icon="add"
        onPress={() =>
          router.push({
            pathname: `/note`,
            params: {
              id: 0,
              title: "Default title",
              content: "Content here...",
            },
          })
        }
      />
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
