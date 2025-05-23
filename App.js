import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PostsListScreen from "./screens/PostsListScreen";
import PostCreateEditScreen from "./screens/PostCreateEditScreen";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { idToken, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {idToken ? (
          <>
            <Stack.Screen name="PostsList" component={PostsListScreen} options={{ title: "Пости" }} />
            <Stack.Screen name="PostCreateEdit" component={PostCreateEditScreen} options={{ title: "Створити / Редагувати пост" }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Вхід" }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Реєстрація" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
