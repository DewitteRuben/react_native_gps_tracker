import { Navigation } from 'react-native-navigation';

import { SCREENS } from '../constants/screen';

import * as Home from './home';

const registerComponentWithRedux = (redux: any) => (
  name: string,
  component: any,
) => {
  Navigation.registerComponentWithRedux(
    name,
    () => component,
    redux.Provider,
    redux.store,
  );
};

export function registerScreens(redux: any) {
  registerComponentWithRedux(redux)(SCREENS.Home, Home.default);
}
