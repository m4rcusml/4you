import { FlatList, View } from 'react-native'
import { Typography } from '@/components/ui/typography'
import { Post } from '@/components/specific/post'
import { Button } from '@/components/ui/button'
import { Plus } from '@nandorojo/heroicons/24/solid'
import { router } from 'expo-router'

export default function Community() {
  return (
    <View className='relative flex-1'>
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
      <Button onPress={() => router.push('/add-post')} className='absolute bottom-6 right-6 rounded-full w-16 h-16' size='icon' variant='secondary'>
        <Plus width={36} height={36} color="white" />
      </Button>
    </View>
  )
}