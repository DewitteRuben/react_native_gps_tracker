import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import {
  mediaDevices,
  MediaStreamConstraints,
  MediaStream,
  RTCPeerConnectionConfiguration,
  RTCPeerConnection,
  RTCSignalingState,
  RTCIceConnectionState
} from "react-native-webrtc";

export interface MediaDevice {
  kind: string;
  label: string;
  groupId: string;
  deviceId: string;
  facing: string;
}

const matchesKeysAndValues = (pObject: object) => {
  return (item: object) =>
    Object.keys(pObject)
      .map(key => !!item[key] && item[key] === pObject[key])
      .reduce((acc, prev) => acc && prev);
};

const useSocket = (ip: string) => {
  const [socket, setSocket] = useState(io(ip));
  return socket;
};

const getMediaDeviceConfig = (front?: boolean, deviceId?: string) =>
  ({
    audio: true,
    video: {
      mandatory: {
        minWidth: 500, // Provide your own width, height and frame rate here
        minHeight: 300,
        minFrameRate: 30
      },
      facingMode: front ? "user" : "environment",
      optional: deviceId ? [{ sourceId: deviceId }] : []
    }
  } as MediaStreamConstraints);

const useMediaDevice = (pObject: Partial<MediaDevice>) => {
  const [mediaDevice, setDevice] = useState();

  useEffect(() => {
    const asyncGetDevices = async () => {
      try {
        const deviceSources = await mediaDevices.enumerateDevices();
        setDevice(deviceSources.filter(matchesKeysAndValues(pObject))[0]);
      } catch (error) {
        console.log(error);
      }
    };

    asyncGetDevices();
  }, [pObject]);

  return mediaDevice;
};

const useMediaStream = (front?: boolean, deviceId?: string) => {
  const [deviceStream, setDeviceStream] = useState<MediaStream>();

  useEffect(() => {
    let didCancel = false;
    const getDeviceStream = async () => {
      try {
        if (!didCancel && front && deviceId) {
          const stream = await mediaDevices.getUserMedia(getMediaDeviceConfig(front, deviceId));
          setDeviceStream(stream);
        }
      } catch (error) {
        setDeviceStream(undefined);
      }
    };

    getDeviceStream();

    return () => {
      didCancel = true;
    };
  }, [front, deviceId]);

  return deviceStream;
};

const handleWebRTCMessage = (socket: SocketIOClient.Socket, pc: RTCPeerConnection) => async ({
  description,
  candidate
}) => {
  try {
    if (description) {
      if (description.type === "offer") {
        await pc.setLocalDescription(await pc.createAnswer());
        socket.emit("message", { description: pc.localDescription });
      } else if (description.type === "answer") {
        if (pc.signalingState !== "stable") {
          await pc.setRemoteDescription(description);
        }
      }
    } else if (candidate && candidate.candidate && candidate.candidate.length > 0) {
      await pc.addIceCandidate(candidate);
    }
  } catch (error) {
    console.error(error);
  }
};

export interface RTCConnectionData {
  signalState: RTCSignalingState;
  iceConnectionState: RTCIceConnectionState;
}

const initialConnectionState: RTCConnectionData = { iceConnectionState: "new", signalState: "stable" };

const useRTCPeerConnection = (
  connConfig: RTCPeerConnectionConfiguration,
  socket: SocketIOClient.Socket,
  stream?: MediaStream
) => {
  const [remoteStream, setRemoteStream] = useState();
  const [pc, setPc] = useState<RTCPeerConnection>();
  const [connectionData, setConnectionData] = useState<RTCConnectionData>(initialConnectionState);

  const createPeerConnection = useCallback(() => {
    if (pc) return; // only create pc if it doesn't exist

    const peerConnection = new RTCPeerConnection(connConfig);
    peerConnection.onicecandidate = ({ candidate }) => socket.emit("message", { candidate });

    if (stream) {
      peerConnection.addStream(stream);
    }

    peerConnection.onaddstream = event => setRemoteStream(event.stream);

    setPc(peerConnection);
  }, [stream, socket, connConfig, pc]);

  const createOffer = useCallback(async () => {
    if (!pc) {
      return;
    }
    await pc.setLocalDescription(await pc.createOffer());
    socket.emit("message", { description: pc.localDescription });
  }, [pc, socket]);

  const close = useCallback(
    (remote?: boolean) => {
      if (!pc) {
        return;
      }
      pc.close();

      if (!remote) {
        socket.emit("peer", { action: "clear" });
      }

      setRemoteStream(undefined);
      setPc(undefined);
    },
    [pc, socket]
  );

  useEffect(() => {
    if (pc && socket) {
      socket.on("message", handleWebRTCMessage(socket, pc));
      socket.on("clear", () => {
        close(true);
      });

      pc.onsignalingstatechange = () => {
        setConnectionData(prevState => ({ ...prevState, signalState: pc.signalingState }));
      };

      pc.oniceconnectionstatechange = event => {
        const { iceConnectionState } = event.target;
        if (iceConnectionState === "disconnected" || iceConnectionState === "failed") {
          close();
        }

        setConnectionData(prevState => ({ ...prevState, iceConnectionState }));
      };

      pc.onnegotiationneeded = () => {
        createOffer();
      };
    }

    return () => {
      socket.off("message");
      socket.off("clear");
    };
  }, [pc, socket, close, createOffer]);

  return { createOffer, close, remoteStream, connectionData, createPeerConnection, pc };
};

export { useRTCPeerConnection, useMediaStream, useMediaDevice, useSocket };
