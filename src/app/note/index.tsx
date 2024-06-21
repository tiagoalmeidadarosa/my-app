import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { useEditorBridge, RichText, Toolbar } from "@10play/tentap-editor";
import { prismaClient } from "@/services/db";
import { Note } from "@prisma/client";

export default function Details() {
  const { id } = useLocalSearchParams();

  const [note, setNote] = useState<Note>({
    id: 0,
    title: "Title default",
    content: "Your content here...",
  });

  useEffect(() => {
    const getNote = async () => {
      const note = await prismaClient.note.findFirst({
        where: { id: parseInt(String(id)) },
      });

      if (!!note) {
        setNote(note);
      }
    };

    if (!id) return;
    getNote();
  }, []);

  const isEditing = note.id > 0;

  // const handleDeleteNote = async () => {
  //   if (note.id === undefined) return;
  //   //await prismaClient.note.delete({ where: { id: note.id } });
  // };

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: note.content,
    onChange: async () => {
      const text = await editor.getText();
      setNote((prev) => ({ ...prev, content: text }));

      if (isEditing) {
        await prismaClient.note.update({
          where: { id: note.id },
          data: { content: text },
        });
      } else {
        const createdNote = await prismaClient.note.create({
          data: {
            title: note.title,
            content: text,
          },
        });
        setNote((prev) => ({ ...prev, id: createdNote.id }));
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput style={styles.title}>{note?.title}</TextInput>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
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
