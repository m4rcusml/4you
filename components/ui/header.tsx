import { View, TouchableOpacity, Platform } from 'react-native'
import { ArrowLeft, Moon, Bell } from '@nandorojo/heroicons/24/outline'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colorScheme, useColorScheme } from 'nativewind'
import { Typography } from './typography'
import { Link, router } from 'expo-router'

type Props = {
  options: any
  route: any
  navigation: any
}

const cantGoBackRoutes = ['index', 'users', 'community', 'map', 'settings']

export default function Header({ navigation, route }: Props) {
  let canGoBack = false
  const { top } = useSafeAreaInsets()
  const { toggleColorScheme } = useColorScheme()

  if (navigation.canGoBack() && !cantGoBackRoutes.includes(route.name)) {
    canGoBack = true
  }

  return (
    <View
      className="flex-row items-center justify-between px-5 py-4 bg-accent dark:bg-card"
      style={{
        paddingTop: Platform.OS !== 'web' ? top + 4 : undefined,
        shadowColor: colorScheme.get() === 'dark' ? '#fff3' : '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6, // for Android shadow
      }}
    >
      {canGoBack ? (
        <TouchableOpacity className="p-2 -ml-2" onPress={() => router.back()}>
          <ArrowLeft width={24} height={24} strokeWidth={2} color="white" />
        </TouchableOpacity>
      ) : <View />}

      <View className="flex-row items-center">
        <TouchableOpacity onPress={toggleColorScheme} className="p-2">
          <Moon width={24} height={24} strokeWidth={2} color="white" />
        </TouchableOpacity>

        <Link href="/notifications" asChild>
          <TouchableOpacity className="p-2 mr-2">
            <Bell width={24} height={24} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </Link>

        <Link href="/profile" asChild>
          <TouchableOpacity className="w-10 h-10 rounded-full bg-muted items-center justify-center">
            <Typography className="text-muted-foreground text-sm font-bold">CN</Typography>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}