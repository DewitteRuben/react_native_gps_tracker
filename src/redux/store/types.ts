interface StoreState {
  settings: SettingsState;
}

interface SettingsState {
  distanceUnit: string;
}

export { StoreState, SettingsState };
