import React, { useState, useContext, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { createPost, updatePost } from "../api/firebaseDb";

export default function PostCreateEditScreen({ route, navigation }) {
  const { userId } = useContext(AuthContext);
  const post = route.params?.post;
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) {
      Alert.alert("Помилка", "Всі поля мають бути заповнені");
      return;
    }
    try {
      if (isEdit) {
        await updatePost(userId, post.id, { title, body });
      } else {
        await createPost(userId, { title, body });
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Помилка", `Не вдалося зберегти пост`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Заголовок" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Текст поста" style={[styles.input, { height: 100 }]} multiline value={body} onChangeText={setBody} />
      <Button title={isEdit ? "Зберегти зміни" : "Створити пост"} onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 4, padding: 8, marginBottom: 12 },
});
