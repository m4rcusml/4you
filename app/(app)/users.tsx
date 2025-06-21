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
    title: 'Card de teste',
    description: 'Aqui podem ser expostas informações importantes sobre o app',
    image: 'https://forbes.com.br/wp-content/uploads/2023/10/mulher-brasil-rio-de-janeiro-getty.jpg',
    buttonLabel: 'Luma',
  },
  {
    title: 'Aconteceu algo?',
    description: 'Sua voz importa! Registre a ocorrência e comece a mudar sua história agora.',
    image: 'https://imagens.ebc.com.br/qXcstcTesuxqpKBT38smuV6eexw=/1170x700/smart/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/whatsapp-image-2021-01-07-at-16.33.12-1200x797.jpeg?itok=EUW9zkKa',
    buttonLabel: 'Registrar Agora',
    link: 'https://www.pcdf.df.gov.br/servicos/delegacia-eletronica',
  },
  {
    title: 'Card de Teste 2',
    description: 'Ou, por exemplo, links para conteúdos externos ;)',
    image: 'https://spbancarios.com.br/sites/default/files/styles/max_1300x1300/public/destaques/2024-11/site-violencia-mulheres.png?itok=SFotL1Xb',
    buttonLabel: 'Fazer a diferença',
  },
]

export default function Home() {
  return (
    <ScrollView className="p-6 pb-14 flex-1" contentContainerStyle={{ gap: 16 }}>
      <View className='w-full items-center'>
        <Carousel
          pagination={Pagination}
          autoplayInterval={5000} // Slower autoplay (5 seconds)
          renderItem={(data: any, index: number) => (
            <View
              key={index}
              className='w-screen items-center'
              style={{ marginVertical: 4 }} // Increase vertical margin for cards
            >
              <HomeCard
                photoURL={data.image}
                title={data.title}
                description={data.description}
                link={data.link} // <-- Use the link from the data!
                buttonLabel={data.buttonLabel}
              />
            </View>
          )}
          data={cards}
          loop
          autoplay
          paginationStyle={{ marginTop: 24, marginBottom: 8 }} // More margin for pagination
        />
      </View>

      <View className="flex-row gap-4 justify-between w-full">
        <HomeItem onPress={() => router.push('emergencial-contacts')} label="Contatos" icon={<UserGroup width={48} height={48} color="#e53888" />} />
        <HomeItem onPress={() => router.push('risk-form')} label="Risco" icon={<ExclamationTriangle width={48} height={48} color="#e53888" />} />
        <HomeItem onPress={() => router.push('contents/1')} label="Conteúdos" icon={<BookOpen width={48} height={48} color="#e53888" />} />
      </View>

      <HomeLuma />

      <HomeContact />
    </ScrollView>
  )
}