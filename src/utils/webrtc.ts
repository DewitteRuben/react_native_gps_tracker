import { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  mediaDevices,
  MediaStreamConstraints,
  MediaStream,
  RTCPeerConnectionConfiguration,
  RTCPeerConnection
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
  if (description) {
    await pc.setRemoteDescription(description);
    if (description.type === "offer") {
      await pc.setLocalDescription(await pc.createAnswer());
      socket.emit("message", { description: pc.localDescription });
    }
  } else if (candidate) {
    await pc.addIceCandidate(candidate);
  }
};

const onnegotiationneeded = (pc: RTCPeerConnection, socket: SocketIOClient.Socket) => async () => {
  try {
    await pc.setLocalDescription(await pc.createOffer());
    socket.emit("message", { description: pc.localDescription });
  } catch (err) {
    console.error(err);
  }
};

const useRTCPeerConnection = (
  connConfig: RTCPeerConnectionConfiguration,
  socket: SocketIOClient.Socket,
  stream: MediaStream
) => {
  const [remoteStream, setRemoteStream] = useState();
  const [pc, setPc] = useState(new RTCPeerConnection(connConfig));
  const [connectionState, setConnectionState] = useState<RTCIceConnectionState>();

  pc.onicecandidate = ({ candidate }) => socket.emit("message", { candidate });
  pc.onaddstream = event => setRemoteStream(event.stream);
  pc.oniceconnectionstatechange = event => setConnectionState(event.target.iceConnectionState);

  useEffect(() => {
    pc.onnegotiationneeded = onnegotiationneeded(pc, socket);
    socket.on("message", handleWebRTCMessage(socket, pc));

    return () => {
      socket.off("message");
    };
  }, [pc, socket, stream, remoteStream]);

  return { pc, remoteStream, connectionState };
};

export { useRTCPeerConnection, useMediaStream, useMediaDevice, useSocket };
