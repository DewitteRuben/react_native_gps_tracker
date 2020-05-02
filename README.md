# Gps Tracker 

## Introduction

Read more about this project and its development on my [website](https://www.rubendewitte.com/projects/gpsapp).

## Setup

### Firebase

Firebase's Realtime Database is used to handle the realtime transmission of location data. In order to build this project the `google-services.json` must be included in the correct directory in the build folder (android/app for android). Read more on Firebase for React Native and how it's set up [here](https://rnfirebase.io/).

### WebRTC

#### Socket.IO

[Socket.IO](https://socket.io/) is used to help establish the peer to peer data channel by providing the signaling server with the neccesary information. Read more on WebRTC and signaling [here](https://codelabs.developers.google.com/codelabs/webrtc-web/#0).

Create a .env file with the following key:

```
SIGNALING_SERVER=http://10.0.2.2:80/
```

Replace `http://10.0.2.2:80/` with the port and address of your signaling server.

###  RTCPeerConnection

In order for a WebRTC peer to peer connection be established, STUN and/or TURN servers are used to pass the neccesary information to each peer. By default only Google's development STUN server is used, for a production build it is advised to provide your own STUN and TURN server.

This can be done by including them as keys in your .env variables:

```
STUN=stun:stun.l.google.com:19302
TURN=turn:192.158.29.39:3478
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