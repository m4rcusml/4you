import { View, StyleSheet, Platform, ScrollView, Modal, TouchableOpacity, Linking } from 'react-native'
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
  const Marker = Platform.OS !== 'web' ? require('react-native-maps').Marker : null
  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'undetermined'>('undetermined')
  const [institutions, setInstitutions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('') // Add search state
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedInstitution, setSelectedInstitution] = useState<any | null>(null)

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

  // Helper function to calculate distance between two lat/lng points (Haversine formula)
  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRad = (value: number) => (value * Math.PI) / 180
    const R = 6371 // km
    const dLat = toRad(lat2 - lat1)
    const dLon = toRad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Filter institutions by nome_localidade (since that's what is rendered)
  let filteredInstitutions = institutions.filter(item =>
    item.nome_localidade?.toLowerCase().includes(search.toLowerCase())
  )

  // If location is available, sort by proximity
  if (location) {
    filteredInstitutions = filteredInstitutions
      .map(item => {
        if (item.latitude && item.longitude) {
          const distance = getDistance(
            location.coords.latitude,
            location.coords.longitude,
            parseFloat(item.latitude),
            parseFloat(item.longitude)
          )
          return { ...item, _distance: distance }
        }
        return { ...item, _distance: Infinity }
      })
      .sort((a, b) => a._distance - b._distance)
  }

  // Modal content
  const renderModal = () => (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          padding: 24,
          width: '85%',
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 8,
        }}>
          <Typography className="text-lg font-bold mb-1">
            {selectedInstitution?.nome_localidade}
          </Typography>
          <Typography className="text-xm text-muted-foreground mb-2">
            <Typography className="font-bold text-s inline">Foco principal: </Typography>
            {selectedInstitution?.assuntos}
          </Typography>
          <Typography className="mb-1">
            <Typography className="font-bold text-s inline">Endereço: </Typography>
            {selectedInstitution?.endereco_completo}
          </Typography>
          {/* Telefones */}
          {selectedInstitution?.telefones && (
            <Typography className="mb-1">
              <Typography className="font-bold text-s inline">Telefones: </Typography>
              {selectedInstitution.telefones}
            </Typography>
          )}
          {/* Telefone (fallback for single phone) */}
          {selectedInstitution?.telefone && !selectedInstitution?.telefones && (
            <Typography className="mb-1">
              <Typography className="font-bold text-s inline">Telefone: </Typography>
              {selectedInstitution.telefone}
            </Typography>
          )}
          {/* Dias de atendimento */}
          {selectedInstitution?.dias_atendimento && (
            <Typography className="mb-1">
              <Typography className="font-bold text-s inline">Dias de atendimento: </Typography>
              {selectedInstitution.dias_atendimento}
            </Typography>
          )}
          {/* Atendimento (fallback) */}
          {selectedInstitution?.atendimento && !selectedInstitution?.dias_atendimento && (
            <Typography className="mb-1">
              <Typography className="font-bold text-s inline">Atendimento: </Typography>
              {selectedInstitution.atendimento}
            </Typography>
          )}
          {/* Horário de atendimento */}
          {selectedInstitution?.horario_atendimento && (
            <Typography className="mb-1">
              <Typography className="font-bold text-s inline">Horário: </Typography>
              {selectedInstitution.horario_atendimento}
            </Typography>
          )}
          {/* Horário (fallback) */}
          {selectedInstitution?.horario && !selectedInstitution?.horario_atendimento && (
            <Typography className="mb-1">
              <Typography className="font-bold text-s inline">Horário: </Typography>
              {selectedInstitution.horario}
            </Typography>
          )}
          {/* Público alvo */}
          {selectedInstitution?.publico_alvo && (
            <Typography className="mb-4">
              <Typography className="font-bold text-s inline">Público alvo: </Typography>
              {selectedInstitution.publico_alvo}
            </Typography>
          )}
          {/* Públicos (fallback) */}
          {selectedInstitution?.publicos && !selectedInstitution?.publico_alvo && (
            <Typography className="mb-4">
              <Typography className="font-bold text-s inline">Públicos: </Typography>
              {selectedInstitution.publicos}
            </Typography>
          )}
          <Button
            className="w-full mb-2 bg-primary"
            variant="default"
            onPress={() => {
              if (selectedInstitution?.endereco_completo) {
                openInMaps(selectedInstitution.endereco_completo)
              }
            }}
          >
            <Typography className="text-primary-foreground text-xs">Rotas</Typography>
          </Button>
          <Button
            className="w-full border-primary text-primary"
            variant="outline"
            onPress={() => setModalVisible(false)}
          >
            <Typography className="text-primary text-xs">Voltar</Typography>
          </Button>
        </View>
      </View>
    </Modal>
  )

  function openInMaps(address: string) {
    const url = Platform.select({
      ios: `http://maps.apple.com/?daddr=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`,
      default: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    });
    if (url) {
      Linking.openURL(url);
    }
  }

  return (
    <>
      {renderModal()}
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
            >
              {/* Render a marker for each institution */}
              {filteredInstitutions.map(item =>
                item.latitude && item.longitude ? (
                  <Marker
                    key={item.id}
                    coordinate={{
                      latitude: parseFloat(item.latitude),
                      longitude: parseFloat(item.longitude),
                    }}
                    title={item.nome_localidade}
                    description={item.endereco_completo}
                  >
                    {/* Custom pin styled with your primary color */}
                    <View
                      style={{
                        backgroundColor: '#e53888', // matches --primary from global.css
                        padding: 6,
                        borderRadius: 16,
                        borderWidth: 2,
                        borderColor: '#fff',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          backgroundColor: '#e53888',
                          borderWidth: 2,
                          borderColor: '#fff',
                        }}
                      />
                    </View>
                  </Marker>
                ) : null
              )}
            </MapView>
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
                <Button
                  className="flex-1 mr-2 bg-primary"
                  variant="default"
                  onPress={() => {
                    setSelectedInstitution(item)
                    setModalVisible(true)
                  }}
                >
                  <Typography className="text-primary-foreground text-xs">Saber Mais</Typography>
                </Button>
                <Button
                  className="flex-1 ml-2 border-primary text-primary"
                  variant="outline"
                  onPress={() => openInMaps(item.endereco_completo)}
                >
                  <Typography className="text-primary text-xs">Rotas</Typography>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </View>
      </ScrollView>
    </>
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