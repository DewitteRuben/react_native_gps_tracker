# Gps Tracker

## !! Disclaimer !!

This project was created in 2020. To run it in 2024, ensure that you are using Node.js version 8 before running `npm install`.

Making this old React Native project run again was an absolute nightmare, but I eventually got it working on Android (iOS not tested). When running the project you can expect dependency and deprecation warnings. :)

## Introduction

Read more about this project and its development on my [website](https://www.rubendewitte.com/projects/gps-app).

## Setup

### Mapbox

The Gps tracker uses [React Native Mapbox](https://github.com/react-native-mapbox-gl/maps) under the hood for its maps.
Mapbox requires you to provide an access token in order to use their APIs. Read more on that [here](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/).

Create an .env.json file and include your Mapbox API key as follows:

```json
{
  "MAPBOX_ACCESS_TOKEN": "pk.eyJ1IjoicnViZW5kZXdpdaRlIpwiYRI6ImNrMHNtcWhjZzAzd24zY3J4NDJwODhxeHoifQ.CsajnMm8yJlFW0kbkP4bpQ"
}
```

### Firebase

Firebase's Realtime Database is used to handle the realtime transmission of location data. In order to build this project the `google-services.json` must be included in the correct directory in the build folder (android/app for android). Read more on Firebase for React Native and how it's set up [here](https://rnfirebase.io/).

### WebRTC

#### Socket.IO

[Socket.IO](https://socket.io/) is used to help establish the peer to peer data channel by providing the signaling server with the neccesary information. Read more on WebRTC and signaling [here](https://codelabs.developers.google.com/codelabs/webrtc-web/#0).

Create an .env.json file with the following key:

```json
{
  "SIGNALING_SERVER": "http://10.0.2.2:80/"
}
```

Replace `http://10.0.2.2:80/` with the port and address of your signaling server.

### RTCPeerConnection

In order for a WebRTC peer to peer connection be established, STUN and/or TURN servers are used to pass the neccesary information to each peer. By default only Google's development STUN server is used, for a production build it is advised to provide your own STUN and TURN server.

This can be done by including them as a key in your .env.json variables:

```json
{
  "ICE_SERVERS": [
    { "url": "stun:stun.l.google.com:19302" },
    {
      "urls": "turn:turnserver.example.org",
      "username": "webrtc",
      "credential": "turnpassword"
    }
  ]
}
```

Replace the values with your STUN and/or TURN server

## Build

For Android:

```
npm install
react-native run-android
```

For IOS:

```
npm install
react-native run-ios
```

Read more on React Native apps and how to run them [here](https://reactnative.dev/docs/getting-started).
