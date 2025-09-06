
import { View, Text, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import { useState } from 'react';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

interface ContactMethod {
  id: string;
  type: 'phone' | 'email' | 'website' | 'social';
  label: string;
  value: string;
  icon: string;
  action: () => void;
}

export default function ContactScreen() {
  const [stationInfo] = useState({
    name: 'Your Radio Station',
    frequency: '101.5 FM',
    address: '123 Radio Street, Music City, MC 12345',
    description: 'Your favorite radio station bringing you the best music, news, and entertainment 24/7.',
  });

  const handlePhoneCall = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Phone calls are not supported on this device');
        }
      })
      .catch((err) => {
        console.log('Error opening phone app:', err);
        Alert.alert('Error', 'Unable to open phone app');
      });
  };

  const handleEmail = (email: string) => {
    const url = `mailto:${email}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Email is not supported on this device');
        }
      })
      .catch((err) => {
        console.log('Error opening email app:', err);
        Alert.alert('Error', 'Unable to open email app');
      });
  };

  const handleWebsite = (url: string) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to open website');
        }
      })
      .catch((err) => {
        console.log('Error opening website:', err);
        Alert.alert('Error', 'Unable to open website');
      });
  };

  const contactMethods: ContactMethod[] = [
    {
      id: '1',
      type: 'phone',
      label: 'Call Studio',
      value: '(555) 123-RADIO',
      icon: 'call',
      action: () => handlePhoneCall('5551237234')
    },
    {
      id: '2',
      type: 'phone',
      label: 'Request Line',
      value: '(555) 123-SONG',
      icon: 'call-outline',
      action: () => handlePhoneCall('5551237664')
    },
    {
      id: '3',
      type: 'email',
      label: 'General Info',
      value: 'info@yourstation.com',
      icon: 'mail',
      action: () => handleEmail('info@yourstation.com')
    },
    {
      id: '4',
      type: 'email',
      label: 'Song Requests',
      value: 'requests@yourstation.com',
      icon: 'musical-notes',
      action: () => handleEmail('requests@yourstation.com')
    },
    {
      id: '5',
      type: 'website',
      label: 'Website',
      value: 'www.yourstation.com',
      icon: 'globe',
      action: () => handleWebsite('https://www.yourstation.com')
    }
  ];

  const socialMedia = [
    {
      id: '1',
      platform: 'Facebook',
      handle: '@YourRadioStation',
      icon: 'logo-facebook',
      action: () => handleWebsite('https://facebook.com/yourradiostation')
    },
    {
      id: '2',
      platform: 'Twitter',
      handle: '@YourRadio',
      icon: 'logo-twitter',
      action: () => handleWebsite('https://twitter.com/yourradio')
    },
    {
      id: '3',
      platform: 'Instagram',
      handle: '@yourradiostation',
      icon: 'logo-instagram',
      action: () => handleWebsite('https://instagram.com/yourradiostation')
    }
  ];

  const teamMembers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Morning Show Host',
      time: '6:00 AM - 9:00 AM',
      bio: 'Sarah brings energy and positivity to your morning commute with the latest hits and local news.'
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      role: 'Mid-Morning Host',
      time: '9:00 AM - 12:00 PM',
      bio: 'Mike keeps the music flowing with a perfect mix of classics and new releases.'
    },
    {
      id: '3',
      name: 'Emma Davis',
      role: 'Afternoon Host',
      time: '12:00 PM - 3:00 PM',
      bio: 'Emma powers your lunch break with upbeat music and engaging conversations.'
    },
    {
      id: '4',
      name: 'DJ Marcus',
      role: 'Night Show Host',
      time: '9:00 PM - 12:00 AM',
      bio: 'Marcus brings the night alive with smooth beats and late-night dedications.'
    }
  ];

  console.log('Contact screen rendered');

  return (
    <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={[commonStyles.section, { marginTop: 40 }]}>
          <View style={{
            width: 80,
            height: 80,
            backgroundColor: colors.primary,
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            boxShadow: `0px 4px 16px ${colors.shadow}`,
            elevation: 8,
          }}>
            <Icon name="radio" size={40} color="white" />
          </View>
          <Text style={commonStyles.title}>Contact Us</Text>
          <Text style={commonStyles.textSecondary}>Get in touch with our team</Text>
        </View>

        {/* Station Info */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>
            {stationInfo.name}
          </Text>
          <Text style={[commonStyles.text, { color: colors.primary, marginBottom: 8 }]}>
            {stationInfo.frequency}
          </Text>
          <Text style={[commonStyles.text, { marginBottom: 12 }]}>
            {stationInfo.description}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <Icon name="location" size={16} color={colors.textSecondary} style={{ marginTop: 2, marginRight: 8 }} />
            <Text style={[commonStyles.textSecondary, { flex: 1 }]}>
              {stationInfo.address}
            </Text>
          </View>
        </View>

        {/* Contact Methods */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Contact Methods
          </Text>
          
          {contactMethods.map((method, index) => (
            <TouchableOpacity
              key={method.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: index < contactMethods.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
              onPress={method.action}
              activeOpacity={0.7}
            >
              <View style={{
                width: 40,
                height: 40,
                backgroundColor: colors.backgroundAlt,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <Icon name={method.icon as any} size={20} color={colors.primary} />
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 2 }]}>
                  {method.label}
                </Text>
                <Text style={commonStyles.textSecondary}>
                  {method.value}
                </Text>
              </View>
              
              <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Social Media */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Follow Us
          </Text>
          
          {socialMedia.map((social, index) => (
            <TouchableOpacity
              key={social.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                borderBottomWidth: index < socialMedia.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
              onPress={social.action}
              activeOpacity={0.7}
            >
              <View style={{
                width: 40,
                height: 40,
                backgroundColor: colors.backgroundAlt,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
                <Icon name={social.icon as any} size={20} color={colors.primary} />
              </View>
              
              <View style={{ flex: 1 }}>
                <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 2 }]}>
                  {social.platform}
                </Text>
                <Text style={commonStyles.textSecondary}>
                  {social.handle}
                </Text>
              </View>
              
              <Icon name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Our Team */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Meet Our Team
          </Text>
          
          {teamMembers.map((member, index) => (
            <View
              key={member.id}
              style={{
                paddingVertical: 16,
                borderBottomWidth: index < teamMembers.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{
                  width: 48,
                  height: 48,
                  backgroundColor: colors.primary,
                  borderRadius: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}>
                  <Icon name="person" size={24} color="white" />
                </View>
                
                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.text, { fontWeight: '600', marginBottom: 2 }]}>
                    {member.name}
                  </Text>
                  <Text style={[commonStyles.textSecondary, { fontSize: 14 }]}>
                    {member.role}
                  </Text>
                </View>
                
                <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                  {member.time}
                </Text>
              </View>
              
              <Text style={[commonStyles.text, { fontSize: 14, marginLeft: 60 }]}>
                {member.bio}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Quick Actions
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              text="Call Now"
              onPress={() => handlePhoneCall('5551237234')}
              style={[buttonStyles.primary, { width: '48%' }]}
            />
            <Button
              text="Send Email"
              onPress={() => handleEmail('info@yourstation.com')}
              style={[buttonStyles.secondary, { width: '48%' }]}
            />
          </View>
        </View>

        {/* Emergency Contact */}
        <View style={[commonStyles.card, { backgroundColor: colors.backgroundAlt }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Icon name="warning" size={24} color={colors.warning} />
            <Text style={[commonStyles.subtitle, { marginLeft: 12, marginBottom: 0 }]}>
              Emergency Contact
            </Text>
          </View>
          
          <Text style={[commonStyles.text, { marginBottom: 8 }]}>
            For urgent matters or technical issues:
          </Text>
          
          <TouchableOpacity
            onPress={() => handlePhoneCall('5551239999')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
            }}
          >
            <Icon name="call" size={16} color={colors.warning} />
            <Text style={[commonStyles.text, { marginLeft: 8, color: colors.warning, fontWeight: '600' }]}>
              (555) 123-9999
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
