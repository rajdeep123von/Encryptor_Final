import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator'
import CustomSidebarMenu  from './CustomSidebarMenu';

import SettingScreen from '../screens/SettingScreen';


import {Icon} from 'react-native-elements';


export const AppDrawerNavigator = createDrawerNavigator({
    
    Home: {
      screen: AppTabNavigator,
      navigationOptions: {
        drawerIcon: <Icon name="home" type="fontawesome5" />,
      },
    },
   
   
  
    Setting: {
      screen: SettingScreen,
       navigationOptions: {
        drawerIcon: <Icon name="settings" type="fontawesome5" />,
        drawerLabel: 'settings',
      },
    },
  },
  {
    contentComponent: CustomSidebarMenu,
  },
  {
    initialRouteName: 'Home',
  }
);
