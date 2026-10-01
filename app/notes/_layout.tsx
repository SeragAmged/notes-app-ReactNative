import { Stack } from "expo-router";

const NoteLayout = () => {
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

export default NoteLayout;
