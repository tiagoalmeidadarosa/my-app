import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEditorBridge, RichText, Toolbar } from "@10play/tentap-editor";

export default function Note() {
  let note = useLocalSearchParams();

  const isEditing = note?.id !== undefined;
  if (!isEditing) {
    note = { title: "Title default", content: "Your content here" };
  }

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: "Start editing!",
    onChange: () => {
      console.log(editor.getText());
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note?.title}</Text>
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
