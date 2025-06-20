import { Tabs } from 'expo-router'

import { Home as HomeOutline } from '@nandorojo/heroicons/24/outline'
import { Home as HomeSolid } from '@nandorojo/heroicons/24/solid'
import { User as UserOutline } from '@nandorojo/heroicons/24/outline'
import { User as UserSolid } from '@nandorojo/heroicons/24/solid'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarIconStyle: { margin: 'auto' },
      tabBarShowLabel: false,
    }}>
      <Tabs.Screen name="home" options={{
        title: 'Home',
        tabBarIcon: ({ focused, color, size }) => focused ? <HomeSolid width={size} height={size} color={color} /> : <HomeOutline width={size} height={size} color={color} />
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({ focused, color, size }) => focused ? <UserSolid width={size} height={size} color={color} /> : <UserOutline width={size} height={size} color={color} />
      }} />
    </Tabs>
  )
}