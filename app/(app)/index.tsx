import { FlatList, View } from 'react-native'
import { Typography } from '@/components/ui/typography'
import { Post } from '@/components/specific/post'
import { Button } from '@/components/ui/button'
import { Plus } from '@nandorojo/heroicons/24/solid'
import { router } from 'expo-router'
import { usePostStore } from '@/stores/postStore'
import { useEffect } from 'react'

export default function Page() {
  const { posts, fetchPosts, isLoading, error } = usePostStore()

  useEffect(() => {
    fetchPosts()
  }, [])

  if (isLoading) return <Typography className="text-lg font-semibold text-ring text-center">Carregando...</Typography>
  if (error) return <Typography className="text-lg font-semibold text-ring text-center">Ocorreu um erro ao carregar os posts</Typography>

  return (
    <View className='relative flex-1'>
      <FlatList
        data={posts}
        className='p-6 pb-12'
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Post data={item} />}
        ListHeaderComponent={
          <Typography className="text-2xl font-bold mb-6">Comunidade</Typography>
        }
        ListEmptyComponent={
          <Typography className="text-lg font-semibold text-ring text-center">Nenhum post encontrado</Typography>
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