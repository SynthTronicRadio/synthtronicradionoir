
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useState } from 'react';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NowPlayingScreen() {
  const [listeners, setListeners] = useState(1247);
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get('window');
  
  // Calculate available height for the player
  const availableHeight = height - insets.top - insets.bottom - 100; // Account for tab bar and padding
  const playerHeight = Math.min(availableHeight * 0.6, 500); // Use 60% of available height, max 500px

  console.log('Now Playing screen rendered with embedded radio player');
  console.log('Screen dimensions:', { width, height, playerHeight });

  // HTML content for the embedded player
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: transparent;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
        }
        .container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .attribution {
          overflow: hidden;
          height: 0px;
          width: 0px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- RCAST.NET - START EMBEDDED PLAYER -->
        <iframe width="100%" height="100%" src="https://players.rcast.net/luna/72721" frameborder="0" scrolling="no" allow="autoplay"></iframe>
        <div class="attribution"><a href="https://www.rcast.net" title="Internet Radio Hosting">RCAST.NET</a></div>
        <!-- RCAST.NET - END EMBEDDED PLAYER -->
      </div>
    </body>
    </html>
  `;

  return (
    <View style={[commonStyles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[commonStyles.section, { marginTop: 20, marginBottom: 20 }]}>
        <Text style={commonStyles.title}>Now Playing</Text>
        <Text style={commonStyles.textSecondary}>
          {listeners.toLocaleString()} listeners • Live
        </Text>
      </View>

      {/* Embedded Radio Player - Takes most of the screen */}
      <View style={[
        commonStyles.card, 
        { 
          marginHorizontal: 20,
          padding: 0, 
          overflow: 'hidden',
          flex: 1,
          maxHeight: playerHeight,
          minHeight: 300,
        }
      ]}>
        <WebView
          source={{ html: htmlContent }}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="compatibility"
          onLoad={() => console.log('Radio player loaded successfully')}
          onError={(error) => console.log('Radio player error:', error)}
          onMessage={(event) => console.log('Radio player message:', event.nativeEvent.data)}
        />
      </View>

      {/* Bottom section with live indicator and station info */}
      <ScrollView 
        style={{ flex: 0, maxHeight: 200 }} 
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Live indicator */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 16,
          marginBottom: 16,
          paddingHorizontal: 16,
          paddingVertical: 8,
          backgroundColor: colors.error,
          borderRadius: 20,
          alignSelf: 'center',
        }}>
          <View style={{
            width: 8,
            height: 8,
            backgroundColor: 'white',
            borderRadius: 4,
            marginRight: 8,
          }} />
          <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
            LIVE RADIO
          </Text>
        </View>

        {/* Compact Station Info */}
        <View style={[commonStyles.card, { padding: 12 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 8, fontSize: 18 }]}>SynthTronic Radio Noir</Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>Quality:</Text>
            <Text style={[commonStyles.text, { fontSize: 12, marginBottom: 0 }]}>High Quality</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>Genre:</Text>
            <Text style={[commonStyles.text, { fontSize: 12, marginBottom: 0 }]}>Electronic / Synthwave</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>Status:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 6,
                height: 6,
                backgroundColor: colors.success,
                borderRadius: 3,
                marginRight: 6,
              }} />
              <Text style={[commonStyles.text, { fontSize: 12, marginBottom: 0 }]}>Live</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
