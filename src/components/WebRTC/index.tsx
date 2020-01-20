import React from "react";
import { View } from "react-native";
import { RTCView } from "react-native-webrtc";
import Button from "../Button";
import { useMediaDevice, useMediaStream, useSocket, useRTCPeerConnection } from "../../utils/webrtc";

const config = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] };

const WebRTC: React.FC = () => {
  const device = useMediaDevice({ facing: "front" });
  const mediaStream = useMediaStream(true, device?.deviceId);

  const socket = useSocket("http://10.0.2.2:80");
  const { pc, remoteStream } = useRTCPeerConnection(config, socket);

  return (
    <View style={{ flex: 1 }}>
      {mediaStream && <RTCView style={{ flex: 1 }} streamURL={mediaStream.toURL()} />}
      {remoteStream && <RTCView style={{ flex: 1 }} streamURL={remoteStream.toURL()} />}
      <Button text="Click" onPress={() => pc.addStream(mediaStream)} />
    </View>
  );
};

export default WebRTC;
