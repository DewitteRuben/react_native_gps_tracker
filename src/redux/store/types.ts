interface StoreState {
  settings: SettingsState;
}

interface SettingsState {
  distanceUnit: string;
  trackingId: string;
}

export { StoreState, SettingsState };
