import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: '#fff' },
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  )
}