
import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';

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
          overflow: hidden;
        }
        iframe {
          width: 100%;
          height: 100vh;
          border: none;
        }
      </style>
    </head>
    <body>
      <!-- RCAST.NET - START EMBEDDED PLAYER --> 
      <iframe width="100%" height="560" src="https://players.rcast.net/playlisthistory/69431" frameborder="0" scrolling="no" allow="autoplay"></iframe> 
      <div style="overflow:hidden; height:0px; width:0px;"><a href="https://www.rcast.net" title="Internet Radio Hosting">RCAST.NET</a></div>
      <!-- RCAST.NET - END EMBEDDED PLAYER -->
    </body>
    </html>
  `;

  console.log('Playlist screen rendered with embedded RCAST.NET player');

  return (
    <WebView
      style={styles.webview}
      originWhitelist={['*']}
      source={{ html: htmlContent }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
    />
  );
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});
