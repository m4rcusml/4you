import { View } from 'react-native'
import { Typography } from '../ui/typography'
import { Button } from '../ui/button'
import { Phone } from '@nandorojo/heroicons/24/outline'

export function HomeContact() {
  return (
    <View className='bg-background flex-row justify-between items-center shadow shadow-foreground/10 p-4 rounded-lg' style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    }}>
      <View className='flex-1 gap-2'>
        <Typography className='text-lg font-bold'>
          Nicole Neves
        </Typography>

        <Typography className='font-bold'>
          Telefone: <Typography className='font-normal'>(11) 99999-9999</Typography>
        </Typography>
      </View>

      <View className='flex-row gap-3'>
        <Button variant='ghost' className='h-14 aspect-square'>
          <Phone width={24} height={24} color="#e53888" />
        </Button>
        <Button variant='ghost' className='h-14 aspect-square'>
          <Phone width={24} height={24} color="#e53888" />
        </Button>
      </View>
    </View>
  )
}