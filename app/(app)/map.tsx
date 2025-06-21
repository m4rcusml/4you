import { View, StyleSheet, Platform, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { Typography } from '@/components/ui/typography'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Profile() {
  const MapView = Platform.OS !== 'web' ? require('react-native-maps').default : null
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'undetermined'>('undetermined')
  const [institutions, setInstitutions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('') // Add search state

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'web') return
      let { status } = await Location.requestForegroundPermissionsAsync()
      setPermissionStatus(status)
      if (status === 'granted') {
        let loc = await Location.getCurrentPositionAsync({})
        setLocation(loc)
      }
    })()
  }, [])

  useEffect(() => {
    setLoading(true)
    setError(null)
    supabase
      .from('instituicoes')
      .select('*')
      .then(({ data, error }) => {
        if (error) {
          setError('Erro ao buscar instituições.')
        } else {
          setInstitutions(data || [])
          setLoading(false)
        }
      })
  }, [])

  // Filter institutions by nome_localidade (since that's what is rendered)
  const filteredInstitutions = institutions.filter(item =>
    item.nome_localidade?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <ScrollView className="p-6 mb-0" style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View>
        <Typography className="text-2xl font-bold">Rede de apoio</Typography>
        <Typography className="text-2xm font-medium">Seu caminho, seu controle</Typography>

        <View className='mt-6 mb-6'>
          <Input
            placeholder='Pesquisar...'
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
      {Platform.OS !== 'web' && MapView ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location?.coords.latitude ?? -23.55052,
              longitude: location?.coords.longitude ?? -46.633308,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
          />
        </View>
      ) : (
        <View style={[styles.mapContainer, { alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee' }]}>
          <Typography className="text-center text-muted-foreground">Mapa não disponível na web</Typography>
        </View>
      )}
      {permissionStatus === 'denied' && (
        <Typography className="text-red-500 mt-2">
          Permissão de localização negada. Ative para ver instituições próximas.
        </Typography>
      )}
      <View className='mt-6'>
        <Typography className="text-2xl font-bold">Instituições perto de você</Typography>
        <Typography className="text-2xm font-medium">Encontre apoio bem perto de você.</Typography>
      </View>

      <View className="w-full mt-4">
        {loading && <Typography>Carregando instituições...</Typography>}
        {error && <Typography className="text-red-500">{error}</Typography>}
        {!loading && !error && filteredInstitutions.map(item => (
          <Card
            key={item.id}
            className="w-full mb-4"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
              elevation: 4,
              backgroundColor: '#fff',
              borderRadius: 10,
            }}
          >
            <CardHeader className="pb-2">
              <Typography
                className="text-lg font-semibold"
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ maxWidth: '100%' }}
              >
                {item.nome_localidade}
              </Typography>
              <Typography className="text-xm text-muted-foreground mt-1">
                <Typography className="font-bold text-s inline">Região: </Typography>
                {item.regiao_administrativa}
              </Typography>
              <Typography className="text-xm text-muted-foreground mt-1">
                <Typography className="font-bold text-s inline">Foco principal: </Typography>
                {item.assuntos}
              </Typography>
            </CardHeader>
            <CardContent className="pt-0 pb-2">
              <Typography className="text-xm">
                <Typography className="font-bold text-s inline">Endereço: </Typography>
                {item.endereco_completo}
              </Typography>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="flex-1 mr-2 bg-primary" variant="default">
                <Typography className="text-primary-foreground text-xs">Saber Mais</Typography>
              </Button>
              <Button className="flex-1 ml-2 border-primary text-primary" variant="outline">
                <Typography className="text-primary text-xs">Rotas</Typography>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    maxHeight: 240,
    minHeight: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  map: {
    flex: 1,
  },
})