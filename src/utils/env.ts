import { ConfigurationParamWithUrls, ConfigurationParamWithUrl } from "react-native-webrtc";
import config from "../../.env.json";

interface IEnvConfig {
  SIGNALING_SERVER: string;
  ICE_SERVERS: ConfigurationParamWithUrls[] | ConfigurationParamWithUrl[];
  MAPBOX_ACCESS_TOKEN?: string;
}

const defaultConfig: IEnvConfig = {
  SIGNALING_SERVER: "http://10.0.2.2:80/",
  ICE_SERVERS: [{ url: "stun:stun.l.google.com:19302" }]
};

export default { ...defaultConfig, ...config } || defaultConfig;
