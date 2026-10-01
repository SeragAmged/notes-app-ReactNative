import { AuthContextProvider, useAuthContext } from "@/src/auth/authContext";
import { Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
const LogoutButton = () => {
  const { user, logout } = useAuthContext();
  if (!user) {
    return null;
  }
  return (
    <View>
      <TouchableOpacity
        onPress={logout}
        style={{
          backgroundColor: "#e00000ff",
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#de800dff" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: "#242323ff",
          },
          headerTitleAlign: "center",
          // animation: "simple_push",
          // presentation: "transparentModal",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="notes"
          options={{
            headerTitle: "Notes",
            headerRight: () => <LogoutButton />,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="auth"
          options={{
            headerTitle: "Login",
          }}
        ></Stack.Screen>
      </Stack>
    </AuthContextProvider>
  );
};

export default RootLayout;
