import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import { Background } from '../../components/Background';
import { GameParams } from '../../@types/navigation';

import logoImg from '../../assets/logo-nlw-esports.png'

import { THEME } from '../../theme';
import { styles } from './styles';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const [ads, setAds] = useState<DuoCardProps[]>([]);
  const route = useRoute();
  const game = route.params as GameParams;
  const [discordDouSelected, setDiscordDouSelected] = useState('');
  
  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack()
  }

  async function getDiscordByUser(adsId: string) {
    fetch(`http://192.168.30.108:1337/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => setDiscordDouSelected(data.discord));
  }

  useEffect(() => {
    fetch(`http://192.168.30.108:1337/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setAds(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header} >
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />
          <View style={styles.right}/>

        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />
        <FlatList
          data={ads}
          keyExtractor={ item => item.id}
          renderItem={({ item }) => (
            <DuoCard 
              data={item}
              onConnect={() => getDiscordByUser(item.id)}
            />
          )}
          horizontal
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
        />
        <DuoMatch 
          visible={discordDouSelected.length > 0 }
          discord={discordDouSelected}
          onClose={() => {setDiscordDouSelected('')}}
        />

      </SafeAreaView>
    </Background>
  );
}