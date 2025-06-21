import { Tabs } from 'expo-router'

import Header from '@/components/ui/header'
import TabBar from '@/components/ui/tab-bar'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        sceneStyle: { backgroundColor: 'var(--background)' },
        tabBarIconStyle: { margin: 'auto' },
        tabBarShowLabel: false,
        header: props => <Header {...props} />,
      }}
    >
      <Tabs.Screen name="users" />
      <Tabs.Screen name="index" />
      <Tabs.Screen name="community" />
      <Tabs.Screen name="map" />
      <Tabs.Screen name="settings" />
    </Tabs>
  )
}