
import { View, Text, ScrollView } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useState, useEffect } from 'react';
import Icon from '../../components/Icon';

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  host: string;
  description: string;
  isLive?: boolean;
}

export default function ScheduleScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [schedule] = useState<ScheduleItem[]>([
    {
      id: '1',
      time: '06:00 - 09:00',
      title: 'Morning Drive',
      host: 'Sarah Johnson',
      description: 'Start your day with the best music and news updates',
      isLive: true,
    },
    {
      id: '2',
      time: '09:00 - 12:00',
      title: 'Mid-Morning Mix',
      host: 'Mike Rodriguez',
      description: 'A perfect blend of classic hits and new releases',
    },
    {
      id: '3',
      time: '12:00 - 15:00',
      title: 'Lunch Hour Beats',
      host: 'Emma Davis',
      description: 'Energizing music to power through your afternoon',
    },
    {
      id: '4',
      time: '15:00 - 18:00',
      title: 'Afternoon Groove',
      host: 'Alex Thompson',
      description: 'Smooth tunes and great conversation',
    },
    {
      id: '5',
      time: '18:00 - 21:00',
      title: 'Evening Drive',
      host: 'Lisa Chen',
      description: 'Your companion for the evening commute',
    },
    {
      id: '6',
      time: '21:00 - 00:00',
      title: 'Night Vibes',
      host: 'DJ Marcus',
      description: 'Chill beats and late-night conversations',
    },
    {
      id: '7',
      time: '00:00 - 06:00',
      title: 'Overnight Mix',
      host: 'Auto DJ',
      description: 'Continuous music through the night',
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatCurrentTime = () => {
    return currentTime.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  console.log('Schedule screen rendered with', schedule.length, 'programs');

  return (
    <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={[commonStyles.section, { marginTop: 40 }]}>
          <Text style={commonStyles.title}>Program Schedule</Text>
          <Text style={commonStyles.textSecondary}>
            Current time: {formatCurrentTime()}
          </Text>
        </View>

        {/* Today's Schedule */}
        <View style={commonStyles.card}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <Icon name="calendar-today" size={24} color={colors.primary} />
            <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
              Today's Programs
            </Text>
          </View>
          
          <Text style={commonStyles.textSecondary}>
            All times are in your local timezone
          </Text>
        </View>

        {/* Schedule Items */}
        {schedule.map((item) => (
          <View key={item.id} style={[
            commonStyles.scheduleItem,
            item.isLive && {
              borderColor: colors.primary,
              borderWidth: 2,
              backgroundColor: colors.backgroundAlt,
            }
          ]}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={[
                  commonStyles.text,
                  { fontWeight: '600', color: colors.primary, marginBottom: 0 }
                ]}>
                  {item.time}
                </Text>
                {item.isLive && (
                  <View style={{
                    marginLeft: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    backgroundColor: colors.error,
                    borderRadius: 10,
                  }}>
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                      LIVE
                    </Text>
                  </View>
                )}
              </View>
              
              <Text style={[commonStyles.subtitle, { marginBottom: 4 }]}>
                {item.title}
              </Text>
              
              <Text style={[commonStyles.textSecondary, { marginBottom: 8 }]}>
                with {item.host}
              </Text>
              
              <Text style={[commonStyles.text, { fontSize: 14 }]}>
                {item.description}
              </Text>
            </View>
            
            <View style={{ marginLeft: 16 }}>
              <Icon 
                name={item.isLive ? "radio" : "time"} 
                size={24} 
                color={item.isLive ? colors.primary : colors.textSecondary} 
              />
            </View>
          </View>
        ))}

        {/* Contact Info */}
        <View style={[commonStyles.card, { marginTop: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>
            Request a Song
          </Text>
          <Text style={commonStyles.text}>
            Want to hear your favorite song? Send us a message during live shows!
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <Icon name="call" size={20} color={colors.primary} />
            <Text style={[commonStyles.text, { marginLeft: 8, marginBottom: 0 }]}>
              Call: (555) 123-RADIO
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Icon name="mail" size={20} color={colors.primary} />
            <Text style={[commonStyles.text, { marginLeft: 8, marginBottom: 0 }]}>
              Email: requests@yourstation.com
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
