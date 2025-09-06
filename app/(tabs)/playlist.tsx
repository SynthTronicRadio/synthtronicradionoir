
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
          padding: 10px;
          height: 100vh;
          background-color: black;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .container {
          width: 95%;
          max-width: 600px;
          height: auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          padding-top: 20px;
        }
        .playlist-header {
          color: white;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          text-align: center;
        }
        iframe {
          width: 100%;
          height: 400px;
          border: none;
          border-radius: 8px;
          background-color: #1a1a1a;
        }
        .playlist-info {
          color: #888;
          font-size: 12px;
          margin-top: 10px;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="playlist-header">Recently Played Tracks</div>
        <!-- RCAST.NET - START EMBEDDED PLAYER --> 
        <iframe width="100%" height="400" src="https://players.rcast.net/playlisthistory/69431" frameborder="0" scrolling="yes" allow="autoplay"></iframe> 
        <div style="overflow:hidden; height:0px; width:0px;"><a href="https://www.rcast.net" title="Internet Radio Hosting">RCAST.NET</a></div>
        <!-- RCAST.NET - END EMBEDDED PLAYER -->
        <div class="playlist-info">Last 10 tracks played on air</div>
      </div>
    </body>
    </html>
  `;

  console.log('Playlist screen rendered with smaller list format for 10 recent tracks');

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
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
