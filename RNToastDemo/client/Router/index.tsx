import React from 'react'
import {createAppContainer, createStackNavigator} from 'react-navigation'

import HomePage from '../continar/Home'

const AppNavigator = createStackNavigator({
  Home: HomePage


})

export default createAppContainer(AppNavigator)



