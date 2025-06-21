import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { Stack, useRouter } from 'expo-router'

const PRIMARY = '#EE5FB7' // --primary
const ACCENT = '#e53888'  // --accent

export default function Profile() {
  const router = useRouter()
  const user = {
    nome: 'Emanuelly Silva',
    email: 'emanuelly@email.com',
    nascimento: '20/06/1995',
    telefone: '(11) 91234-5678',
     // foto: 'url-da-foto.jpg', // Adicione a url da foto se tiver
  }

   // Pega as iniciais do nome para o placeholder
  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()

  return (
      <>
      <Stack.Screen options={{ title: 'Perfil' }} />
      <SafeAreaView style={styles.container}>
     <View style={styles.profileBox}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Substitua pela URL da foto do usuário  
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 16 }}
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
          {getInitials(user.nome)}
        </Text>
          <Text style={styles.title}>Perfil do Usuário</Text>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{user.nome}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
          <Text style={styles.label}>Data de Nascimento:</Text>
          <Text style={styles.value}>{user.nascimento}</Text>
          <Text style={styles.label}>Telefone:</Text>
          <Text style={styles.value}>{user.telefone}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: PRIMARY }]}
              onPress={() => {/* lógica para editar */}}
            >
         <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: ACCENT }]}
              onPress={() => router.push('/historico')}
            >
              <Text style={styles.buttonText}>Histórico</Text>
            </TouchableOpacity>
            <TouchableOpacity
  style={[styles.button, { backgroundColor: PRIMARY, marginBottom: 0 }]}
  onPress={() => router.push('/progresso')}
>
  <Text style={styles.buttonText}>Progresso</Text>
</TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profileBox: {
    width: '90%',
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  label: {
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 4,
  },
    buttonContainer: {
    flexDirection: 'column', 
    marginTop: 24,
    width: '100%',
  },
   button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12, // para espaçamento entre botões
  },
   lastButton: {
    marginBottom: 0, // remove o espaçamento do último botão
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

