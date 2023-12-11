import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {},
      }}
    >
      <Stack.Screen name="index" options={{ title: "DEVember" }} />
    </Stack>
  );
}
