const base = "/api/v1";
const domain = "somecompany.com";
const Defaults = {
  appName: "Gpsapp",
  domain,
  defaultLocale: {
    lang: "en"
  },
  app: {
    platforms: ["ios", "android"]
  },
  apis: {
    baseUrl: `https://api.${domain}`,
    public: {
      base: `${base}`,
      backend: `${base}`
    },
    user: {
      base: `${base}`,
      login: `${base}/login`,
      logout: `${base}/logout`
    }
  },
  mapbox: {
    accessToken: "pk.eyJ1IjoicnViZW5kZXdpdHRlIiwiYSI6ImNrMHNtcWhjZzAzd24zY3J4NDJwODhxeHoifQ.YsajnMm8yJlFW0kbkP4bpQ"
  }
};

export default Defaults;
