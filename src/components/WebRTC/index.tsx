import React, { useMemo, memo, useEffect, useState, useCallback } from "react";
import { View } from "react-native";
import { RTCView } from "react-native-webrtc";
import { connect } from "react-redux";
import { useMediaDevice, useMediaStream, useSocket, useRTCPeerConnection } from "../../utils/webrtc";
import { GLOBAL } from "../../styles/global";
import { Modal } from "..";
import { getModalButtons } from "../../utils/modal";
import { StoreState } from "../../redux/store/types";
import styles from "./styles";

const config = { iceServers: [{ url: "stun:stun.l.google.com:19302" }] };

interface Props {
  trackingId: string;
}

const deviceSelector = { facing: "front" };
const WebRTC: React.FC<Props> = ({ trackingId }) => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const [callAccepted, setAccepted] = useState(false);

  const device = useMediaDevice(deviceSelector);
  const mediaStream = useMediaStream(true, device?.deviceId);
  const socket = useSocket("https://gpsapp-server.herokuapp.com/");
  const { remoteStream, pc } = useRTCPeerConnection(config, socket);

  const onModalClose = useCallback(() => {
    setModalVisibility(false);
  }, []);

  const onCallAccept = useCallback(() => {
    socket.emit("peer", { action: "established" });
    setAccepted(true);
    setModalVisibility(false);
  }, [socket]);

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
    socket.emit("peer", { action: "join", data: trackingId });
  }, [socket, trackingId]);

  useEffect(() => {
    socket.on("establish", () => {
      setModalVisibility(true);
      setAccepted(false);
    });

    return () => {
      socket.off("establish");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("established", () => {
      if (pc.getLocalStreams().length) {
        pc.removeStream(mediaStream);
      }
      pc.addStream(mediaStream);
    });

    return () => {
      socket.off("established");
    };
  }, [socket, pc, mediaStream]);

  return (
    <>
      <View style={styles.localStream}>
        {mediaStream && <RTCView style={GLOBAL.LAYOUT.container} streamURL={mediaStream.toURL()} />}
      </View>
      <View style={styles.remoteStream}>
        {remoteStream && callAccepted && <RTCView style={GLOBAL.LAYOUT.container} streamURL={remoteStream.toURL()} />}
      </View>
      <Modal
        isVisible={isModalVisible}
        onSwipeComplete={onModalClose}
        onBackdropPress={onModalClose}
        text="A call is being requested, do you wish to establish a connection?"
        buttons={modalButtons}
      />
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  trackingId: state.settings.trackingId
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WebRTC);
