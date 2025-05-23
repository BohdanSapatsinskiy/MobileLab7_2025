import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function PostItem({ post, onEdit, onDelete }) {
  return (
    <View style={styles.post}>
      <Text style={styles.title}>{post.title}</Text>
      <Text>{post.body}</Text>
      <View style={styles.buttons}>
        <Button title="Редагувати" onPress={onEdit} />
        <Button title="Видалити" onPress={onDelete} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#ccc", marginBottom: 10 },
  title: { fontWeight: "bold", fontSize: 16 },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
});
