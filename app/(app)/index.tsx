import { FlatList, View } from 'react-native'
import { Typography } from '@/components/ui/typography'
import { Post } from '@/components/specific/post'

export default function Community() {
  return (
    <FlatList
      data={new Array(10).fill({})}
      className='p-6 pb-12'
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <Post data={item} />}
      ListHeaderComponent={
        <Typography className="text-2xl font-bold mb-6">Comunidade</Typography>
      }
      ItemSeparatorComponent={() => <View className='w-screen h-[1px] bg-gray-200 my-4 -mx-6' />}
      contentContainerStyle={{ gap: 0, flexGrow: 1, paddingBottom: 16 }}
    />
  )
}