import React, { useMemo, memo, useEffect, useState, useCallback } from "react";
import whyDidYouRender from "@welldone-software/why-did-you-render";
import { View } from "react-native";
import { RTCView } from "react-native-webrtc";
import Button from "../Button";
import { useMediaDevice, useMediaStream, useSocket, useRTCPeerConnection } from "../../utils/webrtc";
import { GLOBAL } from "../../styles/global";
import { Modal } from "..";
import { getModalButtons } from "../../utils/modal";

whyDidYouRender(React, {
  logOnDifferentValues: true,
  titleColor: "green",
  diffNameColor: "darkturquoise"
});

const config = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] };

interface Props {
  userId: string;
}

const deviceSelector = { facing: "front" };
const WebRTC: React.FC<Props> = ({ userId }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [callAccepted, setAccepted] = useState(false);

  const device = useMediaDevice(deviceSelector);
  const mediaStream = useMediaStream(true, device?.deviceId);
  const socket = useSocket("http://10.0.2.2:80");
  const { remoteStream, pc } = useRTCPeerConnection(config, socket, mediaStream);

  const onModalClose = useCallback(() => {
    setModalVisibility(false);
  }, []);

  const onCallAccept = useCallback(() => {
    if (pc.getLocalStreams().length) {
      pc.removeStream(mediaStream);
    }
    pc.addStream(mediaStream);
    setAccepted(true);
    setModalVisibility(false);
  }, [pc, mediaStream]);

  const modalButtons = useMemo(
    () =>
      getModalButtons(
        { label: "No", callback: onModalClose },
        {
          label: "Yes",
          callback: onCallAccept
        }
      ),
    [onModalClose, onCallAccept]
  );

  useEffect(() => {
    socket.emit("auth", userId);
  }, [socket, userId]);

  useEffect(() => {
    socket.on("establish", () => {
      setModalVisibility(true);
      setAccepted(false);
    });

    return () => {
      socket.off("establish");
    };
  }, [socket]);

  return (
    <>
      <View style={GLOBAL.LAYOUT.container}>
        {mediaStream && <RTCView style={{ flex: 1 }} streamURL={mediaStream.toURL()} />}
        {remoteStream && callAccepted && <RTCView style={GLOBAL.LAYOUT.container} streamURL={remoteStream.toURL()} />}
      </View>
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={onModalClose}
        swipeDirection="up"
        onBackdropPress={onModalClose}
        text="A call is being requested, do you wish to establish a connection?"
        buttons={modalButtons}
      />
    </>
  );
};

WebRTC.whyDidYouRender = true;

export default WebRTC;
