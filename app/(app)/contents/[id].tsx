import { Typography } from '@/components/ui/typography'
import { Image, ScrollView } from 'react-native'

export default function Page() {
  return (
    <ScrollView className='flex-1' contentContainerClassName='p-6 pb-14 gap-4'>
      <Image
        source={{ uri: 'https://picsum.photos/304/203' }}
        alt="Fundo ilustrativo"
        className="bg-popover w-full aspect-video rounded-md object-contain"
      />
      <Typography className="text-2xl font-bold">
        Título da publicação
      </Typography>

      <Typography className="text-lg font-medium -mt-2">
        Descrição da publicação
      </Typography>

      <Typography className='text-justify -mt-2'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur aut, reiciendis cumque mollitia, assumenda eius nobis in impedit qui beatae illo nesciunt natus voluptate laboriosam, possimus quod officia dolor atque.
      </Typography>
    </ScrollView>
  )
}