import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import HomePage from '../continar/Home'
import EZSwiperPage from '../continar/EZSwiper'
// import SwiperUsagePage from '../continar/SwipperDemo'

const AppNavigator = createStackNavigator({
  Home: HomePage,
  EZSwiper: EZSwiperPage,
  // SwiperUsage: SwiperUsagePage
},
{
  initialRouteName: 'Home'
})

export default createAppContainer(AppNavigator)



