import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { View, Text, TouchableOpacity } from 'react-native'
import { Pencil, Trash } from '@nandorojo/heroicons/24/solid'
import { Typography } from '@/components/ui/typography'

const shadowStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
};

export default function Contacts() {
    return (
        <View className='m-6 mb-12'>
            <Typography className="text-2xl font-bold">Contatos emergenciais</Typography>
            <Typography className="text-2xm font-medium">Adicione aqui suas pessoas de confiança</Typography>
            <Card className="w-full max-w mt-6" style={shadowStyle}>
                <CardHeader className="flex-row items-center justify-between pb-2">
                    <View className="flex-row items-center space-x-3 gap-2">
                        <View className="w-10 h-10 rounded-full bg-muted items-center justify-center">
                            <Text className="text-lg font-semibold text-card-foreground">NV</Text>
                        </View>
                        <View>
                            <CardTitle className="text-base">Nicole Neves</CardTitle>
                            <Text className="text-sm font-semibold text-muted-foreground">
                                Telefone: <Text className="font-normal text-card-foreground">(11) 999999999</Text>
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row space-x-2 gap-2">
                        <TouchableOpacity>
                            <Pencil width={18} height={18} color="gray" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Trash width={18} height={18} color="gray" />
                        </TouchableOpacity>
                    </View>
                </CardHeader>
                <CardContent className="flex-row space-x-3 pt-2 gap-2">
                    <TouchableOpacity className="flex-1 border border-primary rounded-lg py-2 items-center">
                        <Text className="text-primary font-medium">Ligar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 border border-primary rounded-lg py-2 items-center">
                        <Text className="text-primary font-medium">Mensagem</Text>
                    </TouchableOpacity>
                </CardContent>
            </Card>
        </View>
    )
}