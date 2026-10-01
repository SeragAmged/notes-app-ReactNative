import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#242323ff",
        },
      }}
    ></Stack>
  );
};

export default AuthLayout;
