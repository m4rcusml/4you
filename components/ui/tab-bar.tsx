import React from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View, TouchableOpacity, Platform } from 'react-native'
import { router } from 'expo-router'

import { Newspaper } from '@nandorojo/heroicons/24/outline'
import { Users } from '@nandorojo/heroicons/24/outline'
import { Map } from '@nandorojo/heroicons/24/outline'
import { Cog6Tooth } from '@nandorojo/heroicons/24/outline'
import { PuzzlePiece } from '@nandorojo/heroicons/24/outline'
import Logo from '@/assets/images/logo-white.svg'

export default function TabBar({ state }: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets()

  return (
    <View
      className="flex-row items-center justify-around bg-card h-24"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 16,
        elevation: 20,
        paddingBottom: bottom
      }}
    >
      {state.routes.map((route, index) => {
        if (!['index', 'users', 'community', 'map', 'settings'].includes(route.name)) {
          return null
        }

        const isFocused = state.index === index
        const iconColor =
          Platform.OS === 'web'
            ? isFocused ? 'var(--primary)' : 'var(--border)'
            : isFocused ? '#e53888' : '#656c6c'

        let IconComponent
        const size = 28

        switch (route.name) {
          case 'index':
            IconComponent = Newspaper
            break
          case 'users':
            IconComponent = Users
            break
          case 'community':
            IconComponent = PuzzlePiece
            break
          case 'map':
            IconComponent = Map
            break
          case 'settings':
            IconComponent = Cog6Tooth
            break
          default:
            IconComponent = Newspaper
        }

        // Renderização do botão central
        if (route.name === 'community') {
          return (
            <React.Fragment key={route.key}>
              <TouchableOpacity
                onPress={() => router.push(route.name)}
                className="absolute -top-10 bg-primary w-20 h-20 rounded-2xl items-center justify-center rotate-45"
                style={{
                  elevation: 10,
                  left: '50%',
                  marginLeft: Platform.OS !== 'web' ? -35 : -40
                }}
              >
                <View className="-rotate-45">
                  <Logo />
                </View>
              </TouchableOpacity>
              <View className='w-12' />
            </React.Fragment>
          )
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => router.push(route.name === 'index' ? '/' : route.name)}
            className="flex-1 items-center justify-center p-2"
          >
            <IconComponent width={size} height={size} color={iconColor} />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}