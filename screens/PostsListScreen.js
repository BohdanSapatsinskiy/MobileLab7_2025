import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, Text, Button, StyleSheet, Alert } from "react-native";
import { fetchPosts, deletePost } from "../api/firebaseDb";
import { AuthContext } from "../contexts/AuthContext";
import PostItem from "../components/PostItem";

export default function PostsListScreen({ navigation }) {
  const { userId, signOut } = useContext(AuthContext);
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchPosts(userId);
      setPosts(data);
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося завантажити пости");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadPosts();
    });
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (postId) => {
    try {
      await deletePost(userId, postId);
      loadPosts();
    } catch {
      Alert.alert("Помилка", "Не вдалося видалити пост");
    }
  };

  const renderItem = ({ item }) => (
    <PostItem
      post={item}
      onEdit={() => navigation.navigate("PostCreateEdit", { post: item })}
      onDelete={() => handleDelete(item.id)}
    />
  );

  const postsArray = Object.entries(posts).map(([id, post]) => ({ id, ...post }));

  return (
    <View style={styles.container}>
      <Button title="Створити новий пост" onPress={() => navigation.navigate("PostCreateEdit")} />
      <FlatList data={postsArray} keyExtractor={(item) => item.id} renderItem={renderItem} refreshing={loading} onRefresh={loadPosts} />
      <Button title="Вийти" onPress={signOut} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
