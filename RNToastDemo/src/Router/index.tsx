import React from 'react'
import {createAppContainer, createStackNavigator} from 'react-navigation'

import HomePage from '../continar/Home'
import ChildPage from '../continar/Child'

const AppNavigator = createStackNavigator({
  Home: HomePage,
  Child: ChildPage
})

export default createAppContainer(AppNavigator)



