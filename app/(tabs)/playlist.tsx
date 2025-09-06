
import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

export default function PlaylistScreen() {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          height: 100vh;
          background-color: black;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .container {
          width: 90%;
          max-width: 800px;
          height: 80%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 8px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- RCAST.NET - START EMBEDDED PLAYER --> 
        <iframe width="100%" height="560" src="https://players.rcast.net/playlisthistory/69431" frameborder="0" scrolling="no" allow="autoplay"></iframe> 
        <div style="overflow:hidden; height:0px; width:0px;"><a href="https://www.rcast.net" title="Internet Radio Hosting">RCAST.NET</a></div>
        <!-- RCAST.NET - END EMBEDDED PLAYER -->
      </div>
    </body>
    </html>
  `;

  console.log('Playlist screen rendered with centered embedded RCAST.NET player on black background');

  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  webview: {
    flex: 1,
    backgroundColor: 'black',
  },
});
