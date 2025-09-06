
import { View, Text, ScrollView, Image } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useState, useEffect } from 'react';
import Icon from '../../components/Icon';

interface CurrentSong {
  title: string;
  artist: string;
  album?: string;
}

export default function HomeScreen() {
  const [currentSong, setCurrentSong] = useState<CurrentSong>({
    title: "Summer Vibes",
    artist: "Radio Station Mix",
    album: "Live Session"
  });

  const [listeners, setListeners] = useState(1247);

  useEffect(() => {
    // Simulate live listener count updates
    const interval = setInterval(() => {
      setListeners(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  console.log('Home screen rendered with current song:', currentSong.title);

  return (
    <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
      <View style={commonStyles.content}>
        {/* Station Header */}
        <View style={[commonStyles.section, { marginTop: 40 }]}>
          <View style={{
            width: 120,
            height: 120,
            backgroundColor: colors.primary,
            borderRadius: 60,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
            boxShadow: `0px 4px 16px ${colors.shadow}`,
            elevation: 8,
          }}>
            <Icon name="radio" size={60} color="white" />
          </View>
          <Text style={commonStyles.title}>Your Radio Station</Text>
          <Text style={commonStyles.textSecondary}>Broadcasting live 24/7</Text>
        </View>

        {/* Now Playing Card */}
        <View style={commonStyles.nowPlayingCard}>
          <Text style={[commonStyles.textSecondary, { marginBottom: 12 }]}>NOW PLAYING</Text>
          <Text style={[commonStyles.subtitle, { color: colors.primary, marginBottom: 4 }]}>
            {currentSong.title}
          </Text>
          <Text style={[commonStyles.text, { marginBottom: 8 }]}>
            by {currentSong.artist}
          </Text>
          {currentSong.album && (
            <Text style={commonStyles.textSecondary}>
              from "{currentSong.album}"
            </Text>
          )}
          
          {/* Live indicator */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 16,
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: colors.error,
            borderRadius: 20,
          }}>
            <View style={{
              width: 8,
              height: 8,
              backgroundColor: 'white',
              borderRadius: 4,
              marginRight: 8,
            }} />
            <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
              LIVE
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={[commonStyles.card, { flexDirection: 'row', justifyContent: 'space-around' }]}>
          <View style={{ alignItems: 'center' }}>
            <Icon name="people" size={24} color={colors.primary} />
            <Text style={[commonStyles.text, { marginTop: 8, marginBottom: 0 }]}>
              {listeners.toLocaleString()}
            </Text>
            <Text style={commonStyles.textSecondary}>Listeners</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Icon name="musical-notes" size={24} color={colors.primary} />
            <Text style={[commonStyles.text, { marginTop: 8, marginBottom: 0 }]}>
              24/7
            </Text>
            <Text style={commonStyles.textSecondary}>Music</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Icon name="globe" size={24} color={colors.primary} />
            <Text style={[commonStyles.text, { marginTop: 8, marginBottom: 0 }]}>
              HD
            </Text>
            <Text style={commonStyles.textSecondary}>Quality</Text>
          </View>
        </View>

        {/* Quick Info */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>About Our Station</Text>
          <Text style={commonStyles.text}>
            Welcome to your favorite radio station! We bring you the best music, 
            news, and entertainment 24 hours a day, 7 days a week.
          </Text>
          <Text style={[commonStyles.text, { marginTop: 12 }]}>
            Tune in for the latest hits, classic favorites, and exclusive live sessions 
            from your favorite artists.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
