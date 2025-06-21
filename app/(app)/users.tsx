import { View, ScrollView } from 'react-native'
import { BookOpen, ExclamationTriangle, UserGroup } from '@nandorojo/heroicons/24/outline'
import { HomeCard } from '@/components/specific/home-card'
import { HomeItem } from '@/components/specific/home-item'
import { HomeLuma } from '@/components/specific/home-luma'
// @ts-ignore
import Carousel, { Pagination } from 'react-native-x-carousel';
import { HomeContact } from '@/components/specific/home-contact'
import { router, useNavigation } from 'expo-router'

const cards = [
  {
    title: 'Maria da Penha',
    description: 'Sua voz importa! Registre a ocorrência e comece a mudar sua história agora.',
    image: 'https://picsum.photos/304/203',
    buttonLabel: 'Registrar Agora',
  },
  {
    title: 'Teste 2',
    description: 'Sua voz importa! Registre a ocorrência e comece a mudar sua história agora.',
    image: 'https://picsum.photos/304/203',
    buttonLabel: 'Registrar Agora',
  },
  {
    title: 'Teste 3',
    description: 'Sua voz importa! Registre a ocorrência e comece a mudar sua história agora.',
    image: 'https://picsum.photos/304/203',
    buttonLabel: 'Registrar Agora',
  },
]

export default function Home() {
  return (
    <ScrollView className="p-6 pb-14 flex-1" contentContainerStyle={{ gap: 16 }}>
      <View className='w-full items-center'>
        <Carousel
          pagination={Pagination}
          renderItem={(data: any, index: number) => (
            <View key={index} className='w-screen items-center'>
              <HomeCard
                photoURL={data.image}
                title={data.title}
                description={data.description}
                link="/"
                buttonLabel={data.buttonLabel}
              />
            </View>
          )}
          data={cards}
          loop
          autoplay
        />
      </View>

      <View className="flex-row gap-4 justify-between w-full">
        <HomeItem onPress={() => router.push('/emergencial-contacts')} label="Contatos" icon={<UserGroup width={48} height={48} color="#e53888" />} />
        <HomeItem label="Risco" icon={<ExclamationTriangle width={48} height={48} color="#e53888" />} />
        <HomeItem onPress={() => router.push('contents/1')} label="Conteúdos" icon={<BookOpen width={48} height={48} color="#e53888" />} />
      </View>

      <HomeLuma />

      <HomeContact />
    </ScrollView>
  )
}