
import { View, Text, ScrollView } from 'react-native';
import { commonStyles, colors } from '../../styles/commonStyles';
import { useState } from 'react';
import { WebView } from 'react-native-webview';

export default function NowPlayingScreen() {
  const [listeners, setListeners] = useState(1247);

  console.log('Now Playing screen rendered with embedded radio player');

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
        }
        .container {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        iframe {
          width: 100%;
          height: 450px;
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
        <iframe width="100%" height="450" src="https://players.rcast.net/luna/72721" frameborder="0" scrolling="no" allow="autoplay"></iframe>
        <div class="attribution"><a href="https://www.rcast.net" title="Internet Radio Hosting">RCAST.NET</a></div>
        <!-- RCAST.NET - END EMBEDDED PLAYER -->
      </div>
    </body>
    </html>
  `;

  return (
    <ScrollView style={commonStyles.container} showsVerticalScrollIndicator={false}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={[commonStyles.section, { marginTop: 40 }]}>
          <Text style={commonStyles.title}>Now Playing</Text>
          <Text style={commonStyles.textSecondary}>
            {listeners.toLocaleString()} listeners • Live
          </Text>
        </View>

        {/* Embedded Radio Player */}
        <View style={[commonStyles.card, { marginTop: 40, padding: 0, overflow: 'hidden' }]}>
          <WebView
            source={{ html: htmlContent }}
            style={{
              width: '100%',
              height: 450,
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

        {/* Live indicator */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 24,
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

        {/* Station Info */}
        <View style={commonStyles.card}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>SynthTronic Radio Noir</Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={commonStyles.textSecondary}>Quality:</Text>
            <Text style={commonStyles.text}>High Quality</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={commonStyles.textSecondary}>Genre:</Text>
            <Text style={commonStyles.text}>Electronic / Synthwave</Text>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={commonStyles.textSecondary}>Status:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 8,
                height: 8,
                backgroundColor: colors.success,
                borderRadius: 4,
                marginRight: 8,
              }} />
              <Text style={commonStyles.text}>Live</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
