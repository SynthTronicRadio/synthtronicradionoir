
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useState, useEffect } from 'react';
import Icon from '../../components/Icon';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  isPlaying?: boolean;
  playedAt?: string;
}

export default function PlaylistScreen() {
  const [recentlyPlayed, setRecentlyPlayed] = useState<Song[]>([
    {
      id: '1',
      title: 'Summer Vibes',
      artist: 'Radio Station Mix',
      duration: '3:45',
      isPlaying: true,
      playedAt: 'Now Playing'
    },
    {
      id: '2',
      title: 'Midnight Dreams',
      artist: 'The Velvet Sound',
      duration: '4:12',
      playedAt: '2 minutes ago'
    },
    {
      id: '3',
      title: 'Electric Nights',
      artist: 'Neon Pulse',
      duration: '3:28',
      playedAt: '6 minutes ago'
    },
    {
      id: '4',
      title: 'Ocean Waves',
      artist: 'Coastal Breeze',
      duration: '5:03',
      playedAt: '10 minutes ago'
    },
    {
      id: '5',
      title: 'City Lights',
      artist: 'Urban Echo',
      duration: '3:56',
      playedAt: '14 minutes ago'
    },
    {
      id: '6',
      title: 'Golden Hour',
      artist: 'Sunset Boulevard',
      duration: '4:21',
      playedAt: '18 minutes ago'
    },
    {
      id: '7',
      title: 'Starlight Serenade',
      artist: 'Moonbeam Orchestra',
      duration: '4:45',
      playedAt: '22 minutes ago'
    },
    {
      id: '8',
      title: 'Dancing Shadows',
      artist: 'Rhythm & Soul',
      duration: '3:33',
      playedAt: '26 minutes ago'
    }
  ]);

  const [upcomingShows, setUpcomingShows] = useState([
    {
      id: '1',
      time: '15:00',
      title: 'Afternoon Groove',
      host: 'Alex Thompson',
      description: 'Smooth tunes and great conversation'
    },
    {
      id: '2',
      time: '18:00',
      title: 'Evening Drive',
      host: 'Lisa Chen',
      description: 'Your companion for the evening commute'
    },
    {
      id: '3',
      time: '21:00',
      title: 'Night Vibes',
      host: 'DJ Marcus',
      description: 'Chill beats and late-night conversations'
    }
  ]);

  useEffect(() => {
    // Simulate playlist updates
    const interval = setInterval(() => {
      console.log('Playlist updated');
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleSongPress = (song: Song) => {
    console.log('Song pressed:', song.title);
    // In a real app, this might request the song or show more details
  };

  console.log('Playlist screen rendered with', recentlyPlayed.length, 'recent songs');

  return (
    <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={[commonStyles.section, { marginTop: 40 }]}>
          <Text style={commonStyles.title}>Playlist</Text>
          <Text style={commonStyles.textSecondary}>Recently played and upcoming</Text>
        </View>

        {/* Now Playing Section */}
        <View style={commonStyles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Icon name="musical-notes" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
              Currently Playing
            </Text>
          </View>
          
          {recentlyPlayed.filter(song => song.isPlaying).map((song) => (
            <TouchableOpacity
              key={song.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 16,
                backgroundColor: colors.backgroundAlt,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: colors.primary,
              }}
              onPress={() => handleSongPress(song)}
            >
              <View style={{
                width: 48,
                height: 48,
                backgroundColor: colors.primary,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <Icon name="play" size={20} color="white" />
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 4 }]}>
                  {song.title}
                </Text>
                <Text style={commonStyles.textSecondary}>
                  {song.artist}
                </Text>
              </View>
              
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                  {song.duration}
                </Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 4,
                }}>
                  <View style={{
                    width: 6,
                    height: 6,
                    backgroundColor: colors.error,
                    borderRadius: 3,
                    marginRight: 6,
                  }} />
                  <Text style={[commonStyles.textSecondary, { fontSize: 10, color: colors.error }]}>
                    LIVE
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recently Played */}
        <View style={commonStyles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Icon name="time" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
              Recently Played
            </Text>
          </View>
          
          {recentlyPlayed.filter(song => !song.isPlaying).map((song, index) => (
            <TouchableOpacity
              key={song.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: index < recentlyPlayed.filter(s => !s.isPlaying).length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
              onPress={() => handleSongPress(song)}
            >
              <View style={{
                width: 40,
                height: 40,
                backgroundColor: colors.backgroundAlt,
                borderRadius: 6,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}>
                <Icon name="musical-note" size={16} color={colors.textSecondary} />
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { marginBottom: 2 }]}>
                  {song.title}
                </Text>
                <Text style={[commonStyles.textSecondary, { fontSize: 14 }]}>
                  {song.artist}
                </Text>
              </View>
              
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                  {song.duration}
                </Text>
                <Text style={[commonStyles.textSecondary, { fontSize: 10, marginTop: 2 }]}>
                  {song.playedAt}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Shows */}
        <View style={commonStyles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Icon name="calendar" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
              Upcoming Shows
            </Text>
          </View>
          
          {upcomingShows.map((show, index) => (
            <View
              key={show.id}
              style={{
                paddingVertical: 12,
                borderBottomWidth: index < upcomingShows.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', color: colors.primary }]}>
                  {show.time}
                </Text>
                <Text style={[commonStyles.text, { marginLeft: 12, fontWeight: '600' }]}>
                  {show.title}
                </Text>
              </View>
              <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
                with {show.host}
              </Text>
              <Text style={[commonStyles.text, { fontSize: 14 }]}>
                {show.description}
              </Text>
            </View>
          ))}
        </View>

        {/* Song Request Info */}
        <View style={commonStyles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Icon name="heart" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
              Request a Song
            </Text>
          </View>
          
          <Text style={[commonStyles.text, { marginBottom: 12 }]}>
            Want to hear your favorite song on air? Send us your requests!
          </Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Icon name="call" size={16} color={colors.primary} />
            <Text style={[commonStyles.text, { marginLeft: 8, marginBottom: 0 }]}>
              Call: (555) 123-RADIO
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="mail" size={16} color={colors.primary} />
            <Text style={[commonStyles.text, { marginLeft: 8, marginBottom: 0 }]}>
              Email: requests@yourstation.com
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
