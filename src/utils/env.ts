import config from "../../.env.json";

const defaultConfig = {
  SIGNALING_SERVER: "http://10.0.2.2:80/",
  ICE_SERVERS: [{ url: "stun:stun.l.google.com:19302" }]
};

export default { ...defaultConfig, config } || defaultConfig;
