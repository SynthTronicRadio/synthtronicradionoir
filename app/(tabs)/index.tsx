
import { View, Dimensions } from 'react-native';
import { commonStyles } from '../../styles/commonStyles';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NowPlayingScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = Dimensions.get('window');
  
  // Calculate available height for the player (full screen minus safe areas and tab bar)
  const availableHeight = height - insets.top - insets.bottom - 80; // Account for tab bar

  console.log('Now Playing screen rendered with embedded radio player');
  console.log('Screen dimensions:', { width, height, availableHeight });

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
      {/* Embedded Radio Player - Full screen */}
      <View style={[
        commonStyles.card, 
        { 
          margin: 20,
          padding: 0, 
          overflow: 'hidden',
          height: availableHeight - 40, // Account for margins
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
    </View>
  );
}
