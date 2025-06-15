import { Stack } from "expo-router";
import { QueryProvider } from "../src/components/QueryProvider";

export default function Layout() {
  return (
    <QueryProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="property/[id]" />
      </Stack>
    </QueryProvider>
  );
}
