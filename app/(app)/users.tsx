import { View, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, BookOpen } from '@nandorojo/heroicons/24/outline'
import { Typography } from '@/components/ui/typography'
import { HomeCard } from '@/components/specific/home-card'
import { HomeItem } from '@/components/specific/home-item'
import { HomeLuma } from '@/components/specific/home-luma'

const cards = [
  { id: 1, content: <HomeCard /> },
  { id: 2, content: <HomeCard /> },
  { id: 3, content: <HomeCard /> },
]

export default function Profile() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((prev) => (prev === 0 ? cards.length - 1 : prev - 1))
  const next = () => setCurrent((prev) => (prev === cards.length - 1 ? 0 : prev + 1))

  return (
    <View className="m-6 mb-12 flex-1 items-center">
      <View className="flex-row items-center justify-center w-full mb-4">
        <TouchableOpacity onPress={prev}>
          <ChevronLeft width={20} height={20} color="var(--muted-foreground)" />
        </TouchableOpacity>
        <View className="mx-4 flex-1 items-center">
          {cards[current].content}
        </View>
        <TouchableOpacity onPress={next}>
          <ChevronRight width={20} height={20} color="var(--muted-foreground)" />
        </TouchableOpacity>
      </View>
      <View className="flex-row gap-4 justify-between w-full">
        <HomeItem label="Conteúdos" icon={<BookOpen width={48} height={48} color="var(--primary)" />} />
        <HomeItem label="Conteúdos" icon={<BookOpen width={48} height={48} color="var(--primary)" />} />
        <HomeItem label="Conteúdos" icon={<BookOpen width={48} height={48} color="var(--primary)" />} />
      </View>
      <HomeLuma />
    </View>
  )
}