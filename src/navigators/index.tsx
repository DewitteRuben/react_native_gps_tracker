import {createAppContainer} from 'react-navigation';
import {appNavigator} from './../navigators/navigation';
import {Provider} from 'react-redux';
import React from 'react';

import store from '../redux/store';
import {Home} from '../views';

const Navigation = createAppContainer(appNavigator);

const app: React.FC = () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);

export default app;
