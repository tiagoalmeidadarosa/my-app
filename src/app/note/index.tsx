import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import { useEditorBridge, RichText, Toolbar } from "@10play/tentap-editor";
import { prismaClient } from "@/services/db";
import { Note } from "@prisma/client";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Details() {
  const params = useLocalSearchParams();

  const [note, setNote] = useState<Note>({
    id: parseInt(String(params.id)),
    title: params.title as string,
    content: params.content as string,
  });

  useEffect(() => {
    const handleInsertOrUpdateDb = async () => {
      if (note.id > 0) {
        await prismaClient.note.update({
          where: { id: note.id },
          data: { title: note.title, content: note.content },
        });
      } else {
        const createdNote = await prismaClient.note.create({
          data: {
            title: note.title,
            content: note.content,
          },
        });
        setNote((prev) => ({ ...prev, id: createdNote.id }));
      }
    };

    handleInsertOrUpdateDb();
  }, [note]);

  const handleOnChangeTitle = async (text: string) => {
    setNote((prev) => ({ ...prev, title: text }));
  };

  const handleOnChangeContent = async () => {
    const text = await editor.getText();
    setNote((prev) => ({ ...prev, content: text }));
  };

  const handleOnDeleteNote = async () => {
    if (note.id <= 0) return;
    await prismaClient.note.delete({ where: { id: note.id } });
    router.back();
  };

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: note.content,
    onChange: handleOnChangeContent,
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <TextInput
          maxLength={40}
          onChangeText={handleOnChangeTitle}
          value={note.title}
          style={styles.title}
        />
        <Pressable onPress={handleOnDeleteNote}>
          <Ionicons name="trash" size={32} color="red" />
        </Pressable>
      </View>
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
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  title: { fontSize: 32, fontWeight: "bold" },
});
