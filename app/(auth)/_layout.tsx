import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: 'var(--background)' },
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  )
}