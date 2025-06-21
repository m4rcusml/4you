import { TouchableOpacity, View } from 'react-native'
import { Typography } from '../ui/typography'

import { ChatBubbleOvalLeft as ChatIcon } from '@nandorojo/heroicons/24/outline'
import { Heart as HeartIcon } from '@nandorojo/heroicons/24/outline'
import { Heart as HeartIconSolid } from '@nandorojo/heroicons/24/solid'
import { PostType } from '@/types/post'
import { usePostStore } from '@/stores/postStore'

type Props = {
  data: PostType;
}

export function Post({ data }: Props) {
  const { toggleLike } = usePostStore()

  function handleLike() {
    toggleLike(data.id)
  }
  
  return (
    <View className="gap-4">
      <Typography className="text-lg font-bold">
        {data.username || 'Mulher empoderada'}
      </Typography>

      <Typography>
        {data.content || 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam ipsa, vero at excepturi quasi placeat voluptatum repellat perspiciatis iste sequi! Voluptatem consequuntur quo ipsa qui eius natus unde quos a.'}
      </Typography>

      <View className="flex-row gap-4">
        <View className="flex-row items-center gap-1">
          <ChatIcon width={24} height={24} color="#f7a8c4" />
          <Typography className="text-secondary">
            {data.comments || 0}
          </Typography>
        </View>

        <TouchableOpacity onPress={handleLike} className="flex-row items-center gap-1">
          {data.liked_by_user ? <HeartIconSolid width={24} height={24} color="#e53888" /> : <HeartIcon width={24} height={24}  color="#f7a8c4" />}
          <Typography className="text-secondary">
            {data.likes || 0}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  )
}