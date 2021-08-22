import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import CredentialDetailsScreen from '../screens/CredentialDetailsScreen';
import CredentialScreen from '../screens/CredentialScreen';





export const AppStackNavigator = createStackNavigator({
    CredentialList : {
    screen : CredentialScreen,
    navigationOptions:{
      headerShown : false
    }
  },
   CredentialDetails : {
    screen : CredentialDetailsScreen,
    navigationOptions:{
      headerShown : false
    }

  }
 },


  {
    initialRouteName: 'CredentialList'
  }
);
